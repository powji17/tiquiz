export default function AdminQuizzesLoading() {
  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-4 w-24 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-6 w-40 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
        <div className="h-9 w-28 rounded-xl animate-pulse" style={{ background: "var(--color-line)" }} />
      </div>

      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
            style={{ border: "1px solid var(--color-line)" }}
          >
            <div className="flex-1">
              <div className="h-4 w-44 rounded mb-1.5 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-3 w-60 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
            <div className="flex gap-3">
              <div className="h-3 w-16 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-3 w-10 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-3 w-10 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}