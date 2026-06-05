import { NextResponse } from 'next/server';
import { neon } from '@neondb/serverless';
import { Resend } from 'resend';

const sql = neon(process.env.DATABASE_URL);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email ||!email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Check if email exists
    const existing = await sql`SELECT id FROM waitlist WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already on waitlist' }, { status: 400 });
    }

    // Insert and get id + created_at
    const result = await sql`
      INSERT INTO waitlist (email) 
      VALUES (${email}) 
      RETURNING id, created_at
    `;
    
    const userId = result[0].id;
    const position = userId; // Since id is SERIAL, it's the position
    const referralCode = userId.toString(36).toUpperCase();
    const referralLink = `https://richmoney.vercel.app?ref=${referralCode}`;

    // Send branded HTML email
    await resend.emails.send({
      from: 'Rich Money <waitlist@richmoney.app>',
      to: email,
      subject: `You're #${position} on the Rich Money waitlist 🚀`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a0a0a;color:#fff">
          <h1 style="color:#FFD700;text-align:center">Rich Money</h1>
          <div style="background:#1a1a1a;padding:30px;border-radius:12px;border:1px solid #FFD700">
            <h2 style="color:#FFD700">You're in! 🎉</h2>
            <p style="font-size:18px">Your position: <strong style="color:#FFD700;font-size:32px">#${position}</strong></p>
            <p>We're building the future of money in Nigeria. You'll be first to know when we launch.</p>
            <div style="margin:30px 0;padding:20px;background:#0a0a0a;border-radius:8px">
              <p style="margin:0 0 10px 0">Skip the line - share your referral link:</p>
              <a href="${referralLink}" style="color:#FFD700;word-break:break-all">${referralLink}</a>
            </div>
            <p style="font-size:12px;color:#666">Every friend who joins moves you up the waitlist 🚀</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true, position, referralLink });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
