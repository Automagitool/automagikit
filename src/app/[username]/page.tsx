// ✅ src/app/[username]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string }
}) {
  const supabase = createServerComponentClient({ cookies })

  // Hent brugerdata fra "users" i stedet for "profiles"
  const { data, error } = await supabase
    .from('users')
    .select('full_name, links(title, url)')
    .eq('username', params.username)
    .single()

  // Hvis ingen data eller fejl, vis 404
  if (!data || error) {
    console.error('User not found or error:', error)
    notFound()
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{data.full_name}</h1>

      <div className="space-y-4">
        {data.links?.length > 0 ? (
          data.links.map((link: any) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border p-4 rounded hover:bg-gray-100 transition"
            >
              {link.title}
            </a>
          ))
        ) : (
          <p className="text-muted-foreground">No links added yet.</p>
        )}
      </div>
    </div>
  )
}
