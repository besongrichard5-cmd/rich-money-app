import { NextResponse } from 'next/server';
import { neon } from '@neondb/serverless';
import { Resend } from 'resend';

const sql = neon(process.env.DATABASE_URL);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();
    console.log('Email received:', email);

    if (!email ||!email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM waitlist WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already on waitlist' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO waitlist (email)
      VALUES (${email})
      RETURNING id, created_at
    `;

    const userId = result[0].id;
    const position = userId;
    const referralCode = userId.toString(36).toUpperCase();
    const referralLink = `https://rich-money-app.vercel.app?ref=${referralCode}`;

    console.log('Sending email to:', email, 'Position:', position);

    // Send email with test sender
    const { data, error } = await resend.emails.send({
      from: 'Rich Money <onboarding@resend.dev>',
      to: email,
      subject: `You're #${position} on the Rich Money waitlist 🚀`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a0a0a;color:#fff"><h1 style="color:#FFD700;text-align:center">Rich Money</h1><div style="background:#1a1a1a;padding:30px;border-radius:12px;border:1px solid #FFD700"><h2 style="color:#FFD700">You're in! 🎉</h2><p style="font-size:18px">Your position: <strong style="color:#FFD700;font-size:32px">#${position}</strong></p><p>Skip the line: <a href="${referralLink}" style="color:#FFD700">${referralLink}</a></p></div></div>`
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Email sent:', data.id);
    return NextResponse.json({ success: true, position, referralLink });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}