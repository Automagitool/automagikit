'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // 💥 Tving redirect til dashboard (og ignorér onboarding!)
    router.replace('/dashboard')
  }, [router])

  return <p>Redirecting...</p>
}
