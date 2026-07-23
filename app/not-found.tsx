import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-[#0A1628]/10 mb-4">404</p>
      <h1 className="text-2xl font-bold text-[#0A1628] mb-2">Page Not Found</h1>
      <p className="text-gray-400 text-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#0A1628] hover:bg-[#15A7DC] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Back to Home
      </Link>
    </main>
  )
}
