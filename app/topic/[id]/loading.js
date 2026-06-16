import Navbar from "@/app/components/Navbar";

export default function TopicLoading() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <main className="px-6 py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="h-4 w-40 rounded mb-4 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-7 w-48 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-4 w-72 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex bg-white rounded-2xl overflow-hidden" style={{ height: "140px", border: "1px solid var(--color-line)" }}>
              <div className="w-1 flex-shrink-0 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="h-5 w-10 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                  <div className="h-5 w-16 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                </div>
                <div className="h-5 w-40 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="h-3 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="h-1 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}