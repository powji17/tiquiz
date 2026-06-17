export default function LandingLoading() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Nav skeleton */}
      <nav style={{ borderBottom: "1px solid var(--color-line)" }} className="bg-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="h-6 w-24 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-9 w-24 rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
      </nav>

      {/* Hero skeleton */}
      <section className="px-6 pt-16 pb-20 max-w-3xl mx-auto flex flex-col items-center">
        <div className="h-5 w-56 rounded-full mb-5 animate-pulse" style={{ background: "var(--color-line)" }} />
        <div className="h-9 w-72 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
        <div className="h-9 w-60 rounded mb-4 animate-pulse" style={{ background: "var(--color-line)" }} />
        <div className="h-4 w-full max-w-md rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
        <div className="h-4 w-3/4 max-w-md rounded mb-8 animate-pulse" style={{ background: "var(--color-line)" }} />
        <div className="flex gap-3">
          <div className="h-11 w-40 rounded-xl animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-11 w-36 rounded-xl animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
      </section>

      {/* Fitur skeleton */}
      <section className="px-6 py-16" style={{ background: "white", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="h-6 w-72 rounded mx-auto mb-10 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex bg-white rounded-2xl overflow-hidden" style={{ height: "92px", border: "1px solid var(--color-line)" }}>
                <div className="w-1 flex-shrink-0 animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="p-5 flex-1">
                  <div className="h-4 w-32 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
                  <div className="h-3 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview topik skeleton */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="h-6 w-56 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-4 w-40 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex bg-white rounded-2xl overflow-hidden" style={{ height: "110px", border: "1px solid var(--color-line)" }}>
              <div className="w-1 flex-shrink-0 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="p-5 flex-1">
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-8 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                  <div className="h-4 w-12 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                </div>
                <div className="h-4 w-28 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="h-3 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}