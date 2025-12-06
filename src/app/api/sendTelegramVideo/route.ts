import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables.');
    return NextResponse.json({ error: 'Server configuration error: Telegram credentials not set.' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const videoBlob = formData.get('video') as Blob | null;
    const caption = formData.get('caption') as string | null;
    const filename = formData.get('filename') as string | null;

    if (!videoBlob || !caption || !filename) {
      return NextResponse.json({ error: 'Missing video, caption, or filename in request body.' }, { status: 400 });
    }

    const telegramFormData = new FormData();
    telegramFormData.append('chat_id', TELEGRAM_CHAT_ID);
    telegramFormData.append('video', videoBlob, filename);
    telegramFormData.append('caption', caption);
    telegramFormData.append('parse_mode', 'HTML');

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`, {
      method: 'POST',
      body: telegramFormData,
    });

    const data = await telegramResponse.json();

    if (data.ok) {
      console.log("Telegram video sent successfully:", data);
      return NextResponse.json({ success: true, data });
    } else {
      console.error("Failed to send Telegram video:", data);
      return NextResponse.json({ success: false, data }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error('Error in sendTelegramVideo function:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}