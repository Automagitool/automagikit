'use client'

import { useEffect, useState } from 'react'

type Link = {
  id: number
  title: string
  url: string
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch('/api/links')
      const data = await res.json()
      setLinks(data.links)
    }

    fetchLinks()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Smart Links</h1>
      <p className="text-muted-foreground mb-6">Here you can manage your profile links.</p>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="p-4 border rounded-lg shadow-sm">
            <p className="font-medium">{link.title}</p>
            <p className="text-sm text-muted-foreground">{link.url}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
