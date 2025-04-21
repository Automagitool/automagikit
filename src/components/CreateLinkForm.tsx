// ✅ src/components/CreateLinkForm.tsx
'use client'

import { useState } from 'react'

type Props = {
  onLinkCreated: (link: { id: number; title: string; url: string }) => void
}

export default function CreateLinkForm({ onLinkCreated }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, url }),
    })

    if (res.ok) {
      const newLink = await res.json()
      onLinkCreated(newLink)
      setTitle('')
      setUrl('')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        placeholder="Link title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        placeholder="https://yourlink.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Link'}
      </button>
    </form>
  )
}
