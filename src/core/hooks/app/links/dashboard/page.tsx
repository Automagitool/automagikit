import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your dashboard</h1>
      <p className="text-muted-foreground mb-6">What would you like to do?</p>

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
