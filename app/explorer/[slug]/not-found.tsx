import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <h1 className="font-heading text-2xl font-semibold text-text mb-3">Tipping point not found</h1>
      <p className="text-subtle mb-8 max-w-md mx-auto font-body">
        This slug does not match any tipping point in the database.
      </p>
      <Link href="/explorer" className="inline-flex items-center gap-2 bg-olive/10 border border-olive/30 hover:bg-olive/20 transition-colors rounded-pill px-5 py-2.5 text-sm font-ui text-olive">
        Back to Explorer
      </Link>
    </div>
  )
}
