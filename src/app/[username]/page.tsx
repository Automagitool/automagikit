import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const supabase = createServerComponentClient({ cookies })

  // Fetch user by username
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, avatar_url')
    .eq('username', params.username)
    .single()

  if (!profile) {
    return notFound()
  }

  // Fetch public links
  const { data: links } = await supabase
    .from('links')
    .select('id, title, url')
    .eq('user_id', profile.id)

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <img
        src={profile.avatar_url || '/default-avatar.png'}
        alt={profile.name}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>

      <div className="space-y-4 mt-6">
        {links?.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            className="block p-4 border rounded-lg hover:bg-gray-100 transition"
          >
            {link.title}
          </a>
        ))}

        {(!links || links.length === 0) && (
          <p className="text-muted-foreground">No links added yet.</p>
        )}
      </div>
    </div>
  )
}
