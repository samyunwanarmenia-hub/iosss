import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';
import { NotifyVisitBody } from '@/types/global';

type ParsedVisitBody = {
  pagePath: string;
  lat?: number;
  lon?: number;
  screenWidth?: number;
  screenHeight?: number;
  deviceVendor?: string;
  deviceModel?: string;
  cpuArchitecture?: string;
  clientTimezone?: string;
  isQrScan?: boolean;
};

const sanitizeText = (input?: string | null, fallback = 'N/A') => {
  if (!input || typeof input !== 'string') return fallback;
  return input.replace(/[^\x20-\x7E\u0400-\u052F]/g, '').slice(0, 500) || fallback;
};

const safeNumber = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : undefined);

const parseRequestBody = (raw: unknown): ParsedVisitBody => {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid request payload');
  }
  const body = raw as Partial<NotifyVisitBody>;

  const parsed: ParsedVisitBody = {
    pagePath: sanitizeText(body.pagePath, '/'),
    lat: safeNumber(body.lat),
    lon: safeNumber(body.lon),
    screenWidth: safeNumber(body.screenWidth),
    screenHeight: safeNumber(body.screenHeight),
    deviceVendor: sanitizeText(body.deviceVendor),
    deviceModel: sanitizeText(body.deviceModel),
    cpuArchitecture: sanitizeText(body.cpuArchitecture),
    clientTimezone: sanitizeText(body.clientTimezone),
    isQrScan: Boolean(body.isQrScan),
  };

  return parsed;
};

type GeoData = { city?: string; country_name?: string };

const GEO_CACHE_TTL_MS = 5 * 60 * 1000;
const GEO_TIMEOUT_MS = 3000;
const geoCache = new Map<string, { data: GeoData; expires: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitStore = new Map<string, { count: number; expires: number }>();

const checkRateLimit = (key: string) => {
  const now = Date.now();
  const bucket = rateLimitStore.get(key);
  if (!bucket || bucket.expires < now) {
    rateLimitStore.set(key, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  return true;
};

const fetchGeoData = async (ip: string): Promise<GeoData> => {
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    return { city: 'localhost', country_name: 'localhost' };
  }

  const cached = geoCache.get(ip);
  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);
  try {
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, { signal: controller.signal });
    if (geoResponse.ok) {
      const responseJson = await geoResponse.json();
      const data: GeoData = {
        city: sanitizeText(responseJson.city, 'unknown'),
        country_name: sanitizeText(responseJson.country_name, 'unknown'),
      };
      geoCache.set(ip, { data, expires: Date.now() + GEO_CACHE_TTL_MS });
      return data;
    }
    console.warn(`Geo API (ipapi.co) returned error for IP ${ip}:`, geoResponse.status, await geoResponse.text());
  } catch (geoError: unknown) {
    const reason = geoError instanceof Error ? geoError.message : geoError;
    console.error(`Geo API (ipapi.co) error for IP ${ip}:`, reason);
  } finally {
    clearTimeout(timer);
  }

  return { city: 'unknown', country_name: 'unknown' };
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing Telegram credentials for notifyVisit.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const headersList = headers();
    const { searchParams } = new URL(request.url);
    const rawBody = await request.json().catch(() => null);
    const body = parseRequestBody(rawBody);

    // 1️⃣ Get IP
    const ipHeader = headersList.get('x-forwarded-for') || '';
    const ip = ipHeader.split(',')[0].trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 2️⃣ GeoIP via ipapi.co
    const geoData = await fetchGeoData(ip);

    // 3️⃣ Read UTM parameters from query string
    let utmParams = '';
    if (searchParams.get('utm_source') || searchParams.get('utm_medium') || searchParams.get('utm_campaign')) {
      utmParams = `<b>UTM:</b> Source=${sanitizeText(searchParams.get('utm_source'), 'N/A')}, Medium=${sanitizeText(searchParams.get('utm_medium'), 'N/A')}, Campaign=${sanitizeText(searchParams.get('utm_campaign'), 'N/A')}`;
    }

    // 4️⃣ Geolocation and screen resolution from request body
    let preciseLocation = '';
    if (body.lat && body.lon) {
      preciseLocation = `<b>Precise Position:</b> ${body.lat.toFixed(5)}, ${body.lon.toFixed(5)}`;
    }
    const screenResolution = `<b>Screen Resolution:</b> ${body.screenWidth || 'N/A'}x${body.screenHeight || 'N/A'}`;

    // 5️⃣ Parse User-Agent
    const ua = new UAParser(headersList.get('user-agent') || '').getResult();
    const deviceType = ua.device.type || 'unknown';
    const osName = ua.os.name || 'unknown';
    const osVersion = ua.os.version || 'N/A';
    const browserName = ua.browser.name || 'unknown';
    const browserVersion = ua.browser.version || 'N/A';

    // New device details from body or UA
    const deviceVendor = body.deviceVendor || sanitizeText(ua.device.vendor || undefined);
    const deviceModel = body.deviceModel || sanitizeText(ua.device.model || undefined);
    const cpuArchitecture = body.cpuArchitecture || sanitizeText(ua.cpu.architecture || undefined);
    const clientTimezone = body.clientTimezone || 'N/A';
    const browserLang = headersList.get('accept-language') || 'N/A';
    const referrer = headersList.get('referer') || 'N/A';

    // 6️⃣ Format message
    const messageTitle = body.isQrScan ? '<b>🚨 New QR Scan Verification!</b>' : '<b>🚀 New Visit!</b>';

    const message = `${messageTitle}

<b>🗓️ Time:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yerevan' })}
<b>🌍 Client Timezone:</b> ${clientTimezone}
<b>🔗 Path:</b> ${body.pagePath}

<b>📍 Location:</b>
  IP: ${ip}
  City: ${geoData.city}
  Country: ${geoData.country_name}
  ${preciseLocation ? `${preciseLocation}\n` : ''}

<b>📱 Device Info:</b>
  Type: ${deviceType}
  Vendor: ${deviceVendor}
  Model: ${deviceModel}
  OS: ${osName} ${osVersion}
  CPU Arch: ${cpuArchitecture}
  ${screenResolution}

<b>🌐 Browser Info:</b>
  Name: ${browserName} ${browserVersion}
  Language: ${browserLang}
  Referrer: ${referrer}

${utmParams ? `<b>📊 ${utmParams}</b>\n` : ''}
`;

    // 7️⃣ Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ success: true, data, message });
    } else {
      return NextResponse.json({ success: false, data }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error('Error in notifyVisit function:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}
