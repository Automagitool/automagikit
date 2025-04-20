import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return res

  const { data, error } = await supabase
    .from('onboarding_state')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!data && req.nextUrl.pathname !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
