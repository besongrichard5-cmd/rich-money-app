import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS waitlist (
      id serial PRIMARY KEY,
      email text UNIQUE,
      created_at timestamp DEFAULT now()
    )`

    const result: any = await sql`SELECT COUNT(*) AS count FROM waitlist`
    const count = Number(result?.rows?.[0]?.count ?? 0)

    return NextResponse.json({ count })
  } catch (error: any) {
    console.error('Waitlist API Error:', error)
    return NextResponse.json({ error: error?.message ?? 'Internal server error' }, { status: 500 })
  }
}
