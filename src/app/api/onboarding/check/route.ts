import { NextResponse } from 'next/server'

export async function GET() {
  // Midlertidig løsning: alle er "onboarded"
  return NextResponse.json({ alreadyOnboarded: true })
}
