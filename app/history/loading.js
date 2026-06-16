import Navbar from "@/app/components/Navbar";

export default function HistoryLoading() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <main className="px-6 py-8 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="h-7 w-52 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-4 w-72 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3.5" style={{ border: "1px solid var(--color-line)" }}>
              <div>
                <div className="h-4 w-44 rounded mb-1.5 animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="h-3 w-32 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              </div>
              <div className="h-6 w-14 rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}