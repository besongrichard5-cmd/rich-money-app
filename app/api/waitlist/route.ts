import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function POST(request: Request) {
  try {
    let email: string | undefined

    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const body = await request.json()
      email = body?.email
    } else {
      const form = await request.formData()
      email = String(form.get('email') ?? '')
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Ensure table exists (best practice: run migrations separately in production)
    try {
      await sql`CREATE TABLE IF NOT EXISTS waitlist (
        id serial PRIMARY KEY,
        email text UNIQUE,
        created_at timestamp DEFAULT now()
      )`
    } catch (tableErr: any) {
      console.error('Waitlist table create error:', tableErr)
      // If creating the table fails due to DB not being available, return a clear error
      if (tableErr?.name === 'VercelPostgresError' || tableErr?.code) {
        return NextResponse.json({ error: 'Database unavailable. Check Vercel Postgres provisioning and DATABASE_URL.' }, { status: 503 })
      }
    }

    const insertResult: any = await sql`
      INSERT INTO waitlist (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `

    const inserted = (insertResult?.rowCount ?? insertResult?.rows?.length ?? 0) > 0

    // Try to send welcome email, but do not fail the whole request if email sending errors.
    if (inserted) {
      try {
        await resend.emails.send({
          from: 'Rich Money <onboarding@resend.dev>',
          to: email,
          subject: 'You are on the waitlist! 🚀',
          html: `<p>Thanks for joining the Rich Money waitlist — we&rsquo;ll be in touch soon!</p>`,
        })
      } catch (sendError: any) {
        console.error('Waitlist email send error:', sendError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    // Log extended error information for easier debugging in Vercel logs
    try {
      console.error('Waitlist API Error:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        stack: error?.stack,
      })
    } catch (logErr) {
      console.error('Waitlist API Error (logging failed):', error)
    }

    // If this is a Vercel Postgres error, return a 503 and a helpful message
    if (error?.name === 'VercelPostgresError' || error?.code) {
      return NextResponse.json({ error: 'Database unavailable. Check Vercel Postgres provisioning and DATABASE_URL.' }, { status: 503 })
    }

    return NextResponse.json({ error: error?.message ?? 'Internal server error' }, { status: 500 })
  }
}
