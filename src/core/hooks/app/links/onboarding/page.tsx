'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function OnboardingPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(true)

  // ✅ Check if user has already onboarded
  useEffect(() => {
    const checkOnboarding = async () => {
      const res = await fetch('/api/onboarding/check')
      const data = await res.json()
      if (data.alreadyOnboarded) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }

    checkOnboarding()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/onboarding', {
      method: 'POST',
      body: JSON.stringify({ name, industry, goal }),
    })

    if (res.ok) {
      router.push('/dashboard')
    }
  }

  if (loading) {
    return <p className="text-center p-6">Loading...</p>
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Complete your profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="Your industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="Your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Save and Continue
        </button>
      </form>
    </div>
  )
}
