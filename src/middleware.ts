import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const currentPath = req.nextUrl.pathname

  // 👉 Hvis ikke logget ind og prøver at tilgå andet end forsiden, redirect til /
  if (!user && currentPath !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 🚫 Vi fjerner al onboarding-redirect her

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
