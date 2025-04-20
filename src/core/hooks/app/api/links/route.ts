import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ links: [] }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Fetch error:', error)
    return NextResponse.json({ links: [] }, { status: 500 })
  }

  return NextResponse.json({ links: data }, { status: 200 })
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { title, url } = await req.json()

  const { error } = await supabase
    .from('links')
    .insert([{ user_id: user.id, title, url }])

  if (error) {
    console.error('Insert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
