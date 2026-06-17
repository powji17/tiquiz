export default function AdminQuestionsLoading() {
  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-4 w-28 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-6 w-36 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
        <div className="h-9 w-28 rounded-xl animate-pulse" style={{ background: "var(--color-line)" }} />
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4" style={{ border: "1px solid var(--color-line)" }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="h-4 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="flex gap-2 shrink-0">
                <div className="h-3 w-8 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="h-3 w-10 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-7 rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}