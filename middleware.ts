// ✅ src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  console.log('🧠 Middleware is running') // Til debug i logs

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const currentPath = req.nextUrl.pathname
  console.log('📍 Path:', currentPath)

  // 👉 Hvis ikke logget ind og prøver at tilgå andet end forsiden, redirect til /
  if (!user && currentPath !== '/') {
    console.log('🔁 Redirecting to /')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // ⚠️ Vi slår al onboarding-logik fra her
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
