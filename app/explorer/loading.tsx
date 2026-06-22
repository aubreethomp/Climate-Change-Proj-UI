export default function ExplorerLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="mb-10">
        <div className="h-3 w-32 bg-border rounded mb-4" />
        <div className="h-10 w-72 bg-border rounded mb-3" />
        <div className="h-4 w-96 bg-surface rounded mb-1" />
        <div className="h-4 w-80 bg-surface rounded" />
      </div>
      <div className="h-px bg-divider mb-8" />
      <div className="flex gap-3 mb-6">
        <div className="h-10 w-64 bg-card border border-border rounded-card" />
        <div className="h-10 w-24 bg-card border border-border rounded-card" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-52 bg-card border border-border rounded-card" style={{ opacity: 1 - i * 0.05 }} />
        ))}
      </div>
    </div>
  )
}
