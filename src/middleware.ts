import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  console.log('🧠 Middleware is running') // 👈 Log der tjekker om middleware kører

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const currentPath = req.nextUrl.pathname

  // 👮 Hvis IKKE logget ind og prøver at tilgå andet end /, redirect til forsiden
  if (!user && currentPath !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 🚫 Onboarding-tjek er fjernet
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
