'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TestPage() {
  const router = useRouter()

  useEffect(() => {
    console.log('✅ DU ER PÅ /test SIDEN')
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>Test Page</h1>
      <p style={{ marginTop: 20 }}>Hvis du ser det her, er der ingen redirect!</p>
    </div>
  )
}
