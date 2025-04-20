import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ alreadyOnboarded: false }, { status: 200 })
  }

  const { data, error } = await supabase
    .from('onboarding_state')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Check error:', error)
    return NextResponse.json({ alreadyOnboarded: false }, { status: 200 })
  }

  return NextResponse.json({ alreadyOnboarded: !!data }, { status: 200 })
}
