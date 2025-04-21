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
  const { data } = await supabase
    .from('profiles')
    .select('full_name, links(title, url)')
    .eq('username', params.username)
    .single()

  if (!data) {
    notFound()
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">{data.full_name}</h1>
      <div className="space-y-4">
        {data.links.map((link: any) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border p-4 rounded hover:bg-gray-100 transition"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  )
}
