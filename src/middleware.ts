import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  console.log('📍 Middleware start')

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError) {
    console.error('❌ Error getting user:', userError)
  }

  console.log('👤 User:', user)

  const currentPath = req.nextUrl.pathname
  console.log('📍 Current path:', currentPath)

  if (!user && currentPath !== '/') {
    console.log('🔁 Redirect: Not logged in → /')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 🔕 Onboarding bypassed midlertidigt
  console.log('⚠️ Onboarding check midlertidigt deaktiveret')

  console.log('✅ Middleware end → continue')
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
