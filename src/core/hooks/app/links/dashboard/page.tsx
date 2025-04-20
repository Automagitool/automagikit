// src/app/dashboard/page.tsx
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('onboarding_state')
    .select('name, industry, goal')
    .eq('user_id', user.id)
    .maybeSingle()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your dashboard</h1>
      <p className="text-muted-foreground mb-6">What would you like to do?</p>

      {profile && (
        <div className="mb-6 p-4 border rounded shadow-sm bg-gray-50">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Industry:</strong> {profile.industry}</p>
          <p><strong>Goal:</strong> {profile.goal}</p>
        </div>
      )}

      <div className="space-y-4">
        <Link
          href="/links"
          className="block bg-black text-white p-4 rounded text-center font-medium hover:bg-gray-800 transition"
        >
          Manage your Smart Links
        </Link>
        <Link
          href="/video"
          className="block bg-black text-white p-4 rounded text-center font-medium hover:bg-gray-800 transition"
        >
          Build a Viral Video
        </Link>
      </div>
    </div>
  )
}
