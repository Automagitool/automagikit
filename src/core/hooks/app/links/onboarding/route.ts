import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()
  const user = await supabase.auth.getUser()

  if (!user.data.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await req.json()
  const { name, industry, goal } = body

  const { error } = await supabase
    .from('projects')
    .insert({
      user_id: user.data.user.id,
      name,
      industry,
      goal,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
