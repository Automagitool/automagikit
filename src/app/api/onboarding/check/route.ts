import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ alreadyOnboarded: false }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('onboarding_state')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ alreadyOnboarded: false })
  }

  return NextResponse.json({ alreadyOnboarded: true })
}
