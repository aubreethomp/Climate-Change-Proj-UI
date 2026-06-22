export default function DetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-4 w-28 bg-border rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-6">
          <div className="h-48 bg-card border border-border rounded-card" />
          <div className="h-16 bg-card border border-border rounded-card" />
          <div className="h-32 bg-card border border-border rounded-card" />
          <div className="h-32 bg-card border border-border rounded-card" />
        </div>
        <div className="space-y-4">
          <div className="h-64 bg-card border border-border rounded-card" />
          <div className="h-48 bg-card border border-border rounded-card" />
        </div>
      </div>
    </div>
  )
}
