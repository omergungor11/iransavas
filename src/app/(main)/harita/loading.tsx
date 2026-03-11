export default function HaritaLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="hidden lg:block w-80 border-r border-zinc-800 p-4">
        <div className="h-6 w-24 animate-pulse rounded bg-muted mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </div>
      <div className="flex-1 animate-pulse bg-zinc-900" />
    </div>
  );
}
