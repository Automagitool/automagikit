'use client'

import { useEffect } from 'react'

export default function TestPage() {
  useEffect(() => {
    console.log('✅ DU ER PÅ /test SIDEN')
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>Test Page virker!</h1>
      <p style={{ marginTop: 20 }}>Hvis du ser det her, er der INGEN redirect.</p>
    </div>
  )
}
