import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Resend } from 'resend';

// Make sure you have these environment variables set in your .env.local file:
// RESEND_API_KEY=your_resend_api_key
// POSTGRES_URL=your_vercel_postgres_connection_string

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Save email to Vercel Postgres
    // Make sure your table exists. Run this once:
    // CREATE TABLE IF NOT EXISTS waitlist (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    await sql`
      INSERT INTO waitlist (email) 
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING;
    `;

    // Send notification email to admin using Resend
    await resend.emails.send({
      from: 'Waitlist <onboarding@resend.dev>', // Use Resend testing domain or your configured domain
      to: 'admin@richmoney.app',
      subject: 'New Waitlist Signup: RICH MONEY',
      html: `<p>A new user joined the waitlist!</p><p><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
