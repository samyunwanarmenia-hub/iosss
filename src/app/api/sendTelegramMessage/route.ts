import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const sanitizeMessage = (text?: string | null) => {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  return trimmed.length > 2000 ? `${trimmed.slice(0, 1997)}...` : trimmed;
};

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
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

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const ipHeader = headersList.get('x-forwarded-for') || '';
    const ip = ipHeader.split(',')[0].trim() || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { message } = await request.json().catch(() => ({ message: '' }));
    const cleanMessage = sanitizeMessage(message);

    if (!cleanMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: 'Telegram credentials not set' }, { status: 500 });
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: cleanMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, data }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('Error in sendTelegramMessage function:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}
