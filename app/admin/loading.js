export default function AdminDashboardLoading() {
  return (
    <main className="px-6 py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="h-7 w-40 rounded-lg mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
        <div className="h-4 w-72 rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4 text-center" style={{ border: "1px solid var(--color-line)" }}>
            <div className="h-7 w-12 rounded mx-auto mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
            <div className="h-3 w-16 rounded mx-auto animate-pulse" style={{ background: "var(--color-line)" }} />
          </div>
        ))}
      </div>

      <div className="h-5 w-32 rounded mb-4 animate-pulse" style={{ background: "var(--color-line)" }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex bg-white rounded-2xl overflow-hidden" style={{ height: "84px", border: "1px solid var(--color-line)" }}>
            <div className="w-1 flex-shrink-0 animate-pulse" style={{ background: "var(--color-line)" }} />
            <div className="p-5 flex-1 flex flex-col justify-center gap-2">
              <div className="h-4 w-36 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-3 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}