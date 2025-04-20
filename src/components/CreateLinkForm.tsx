'use client'

import { useState } from 'react'

export default function CreateLinkForm({ onLinkCreated }: { onLinkCreated: () => void }) {
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
      setTitle('')
      setUrl('')
      onLinkCreated()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        placeholder="Link title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        placeholder="Link URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" disabled={loading} className="w-full bg-black text-white p-2 rounded">
        {loading ? 'Adding...' : 'Add Link'}
      </button>
    </form>
  )
}
