import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import Resend from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
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

    const inserted = (insertResult?.rows ?? []).length > 0

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
