'use client'

import { useEffect, useState } from 'react'

type Link = {
  id: number
  title: string
  url: string
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch('/api/links')
      const data = await res.json()
      setLinks(data.links)
    }

    fetchLinks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url }),
    })

    if (res.ok) {
      const newLink = await res.json()
      setLinks((prev) => [...prev, newLink])
      setTitle('')
      setUrl('')
    }
  }

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/links/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setLinks((prev) => prev.filter((link) => link.id !== id))
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Smart Links</h1>
      <p className="text-muted-foreground mb-6">Add and manage your profile links.</p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          placeholder="Link title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="https://yourlink.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Add Link
        </button>
      </form>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-medium">{link.title}</p>
              <p className="text-sm text-muted-foreground">{link.url}</p>
            </div>
            <button
              onClick={() => handleDelete(link.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
