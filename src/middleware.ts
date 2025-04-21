import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  console.log('🧠 Middleware is running')
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    console.log('❌ Supabase getUser error:', error.message)
  }

  console.log('👤 User:', user)
  console.log('📍 Path:', req.nextUrl.pathname)

  if (!user && req.nextUrl.pathname !== '/') {
    console.log('🔁 Redirecting to /')
    return NextResponse.redirect(new URL('/', req.url))
  }

  console.log('✅ Middleware passed')
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
