import { NextResponse } from 'next/server'

export async function POST() {
  // Midlertidig dummy: accepterer alle og gør ingenting
  return NextResponse.json({ success: true }, { status: 200 })
}
