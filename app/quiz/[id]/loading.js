export default function QuizLoading() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      <header className="bg-white px-4 sm:px-6 py-4" style={{ borderBottom: "1px solid var(--color-line)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div className="h-4 w-40 rounded animate-pulse mb-1.5" style={{ background: "var(--color-line)" }} />
            <div className="h-3 w-10 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
          </div>
          <div className="h-4 w-16 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
        <div className="max-w-2xl mx-auto mt-3 rounded-full h-0.5 animate-pulse" style={{ background: "var(--color-line)" }} />
      </header>

      <main className="flex-1 px-4 sm:px-6 py-6 flex flex-col items-center">
        <div className="w-full max-w-2xl flex gap-2 mb-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl" style={{ border: "1px solid var(--color-line)" }}>
          <div className="h-5 w-full rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-5 w-3/4 rounded mb-6 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="space-y-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: "var(--color-line)" }} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}