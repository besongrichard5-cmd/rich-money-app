import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM || 'no-reply@richmoney.app';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'Rich Money';

export async function GET() {
  try {
    const { rows } = await sql`SELECT COUNT(*)::int AS count FROM waitlist`;
    const count = rows?.[0]?.count ?? 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Count API error:', error);
    return NextResponse.json({ error: 'Unable to load waitlist count' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log('Email received:', email);

    if (!email ||!email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const { rows: existing } = await sql`SELECT id FROM waitlist WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already on waitlist' }, { status: 400 });
    }

    const { rows: insertRows } = await sql`
      INSERT INTO waitlist (email)
      VALUES (${email})
      RETURNING id
    `;

    const userId = insertRows[0].id;
    const position = userId;
    const referralCode = userId.toString(36).toUpperCase();
    const referralLink = `https://rich-money-app.vercel.app?ref=${referralCode}`;

    console.log('Sending email to:', email, 'Position:', position);

    const emailResult = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: email,
      subject: `You're #${position} on the Rich Money waitlist 🚀`,
      text: `You're #${position} on the Rich Money waitlist! Visit: ${referralLink}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a0a0a;color:#fff;">
          <h1 style="color:#FFD700;text-align:center">Rich Money</h1>
          <div style="background:#1a1a1a;padding:30px;border-radius:12px;border:1px solid #FFD700;">
            <h2 style="color:#FFD700">You're in! 🎉</h2>
            <p style="font-size:18px">Your position: <strong style="color:#FFD700;font-size:32px">#${position}</strong></p>
            <p style="font-size:16px;line-height:1.6;">Skip the line: <a href="${referralLink}" style="color:#FFD700">${referralLink}</a></p>
          </div>
        </div>
      `,
    });

    if (!emailResult?.id) {
      console.error('Resend send result missing id:', emailResult);
      return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 });
    }

    console.log('Email sent:', emailResult.id);
    return NextResponse.json({ success: true, position, referralLink });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}