import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Липсват задължителни полета.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Невалиден имейл адрес.' }, { status: 400 });
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.RESEND_FROM;

    if (!resend || !to || !from) {
      console.error('Contact API: missing RESEND_API_KEY, CONTACT_TO, or RESEND_FROM');
      return NextResponse.json(
        { error: 'Имейл услугата не е настроена. Свържете се директно по телефон или имейл.' },
        { status: 503 }
      );
    }

    const text = [
      `Име: ${name}`,
      `Имейл: ${email}`,
      company ? `Фирма: ${company}` : null,
      '',
      'Съобщение:',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Запитване от traionis.com — ${name}`,
      text,
      html: `
        <h2>Ново запитване от сайта</h2>
        <p><strong>Име:</strong> ${escapeHtml(name)}</p>
        <p><strong>Имейл:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${company ? `<p><strong>Фирма:</strong> ${escapeHtml(company)}</p>` : ''}
        <p><strong>Съобщение:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Неуспешно изпращане. Опитайте отново.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Невалидна заявка.' }, { status: 400 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
