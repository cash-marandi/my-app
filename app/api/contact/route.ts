import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK;

    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK environment variable is not set.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const webhookData = {
      firstName,
      lastName,
      email,
      subject,
      message,
    };

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Message sent successfully via webhook' }, { status: 200 });
    } else {
      console.error('N8N Webhook responded with an error:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to send message via webhook.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
