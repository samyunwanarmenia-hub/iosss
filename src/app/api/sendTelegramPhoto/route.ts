import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables.');
    return NextResponse.json({ error: 'Server configuration error: Telegram credentials not set.' }, { status: 500 });
  }

  try {
    const { photoBase64, caption } = await request.json();

    if (!photoBase64 || !caption) {
      return NextResponse.json({ error: 'Missing photoBase64 or caption in request body.' }, { status: 400 });
    }

    // Decode base64 image
    const base64Data = photoBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const formData = new FormData();
    formData.append('chat_id', TELEGRAM_CHAT_ID);
    formData.append('photo', new Blob([imageBuffer], { type: 'image/png' }), 'qr_scan_photo.png');
    formData.append('caption', caption);
    formData.append('parse_mode', 'HTML');

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: formData,
    });

    const data = await telegramResponse.json();

    if (data.ok) {
      console.log("Telegram photo sent successfully:", data);
      return NextResponse.json({ success: true, data });
    } else {
      console.error("Failed to send Telegram photo:", data);
      return NextResponse.json({ success: false, data }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error('Error in sendTelegramPhoto function:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}