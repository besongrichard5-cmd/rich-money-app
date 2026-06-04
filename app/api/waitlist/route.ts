import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import Resend from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = body?.email

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    await sql`CREATE TABLE IF NOT EXISTS waitlist (
      id serial PRIMARY KEY,
      email text UNIQUE,
      created_at timestamp DEFAULT now()
    )`

    const insertResult: any = await sql`
      INSERT INTO waitlist (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `

    const inserted = (insertResult?.rowCount ?? insertResult?.rows?.length) > 0

    if (inserted) {
      await resend.emails.send({
        from: 'Rich Money <onboarding@resend.dev>',
        to: email,
        subject: 'You are on the waitlist! 🚀',
        html: `<p>Thanks for joining the Rich Money waitlist — we&rsquo;ll be in touch soon!</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json({ error: error?.message ?? 'Internal server error' }, { status: 500 })
  }
}
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
