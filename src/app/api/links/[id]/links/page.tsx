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
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch('/api/links')
      const data = await res.json()
      setLinks(data.links)
    }

    fetchLinks()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
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

  const handleUpdate = async (id: number, newTitle: string, newUrl: string) => {
    const res = await fetch(`/api/links/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, url: newUrl }),
    })

    if (res.ok) {
      setLinks((prev) =>
        prev.map((link) => (link.id === id ? { ...link, title: newTitle, url: newUrl } : link))
      )
      setEditingId(null)
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
      <p className="text-muted-foreground mb-6">Add, edit, and delete your profile links.</p>

      <form onSubmit={handleAdd} className="space-y-4 mb-8">
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
        {links.map((link) =>
          editingId === link.id ? (
            <EditableLink
              key={link.id}
              link={link}
              onSave={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div key={link.id} className="p-4 border rounded-lg shadow-sm">
              <p className="font-medium">{link.title}</p>
              <p className="text-sm text-muted-foreground">{link.url}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditingId(link.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function EditableLink({
  link,
  onSave,
  onCancel,
}: {
  link: Link
  onSave: (id: number, title: string, url: string) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(link.title)
  const [url, setUrl] = useState(link.url)

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onSave(link.id, title, url)}
          className="text-sm text-green-600 hover:underline"
        >
          Save
        </button>
        <button onClick={onCancel} className="text-sm text-gray-600 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  )
}
