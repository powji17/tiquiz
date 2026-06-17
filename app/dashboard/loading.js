import Navbar from "@/app/components/Navbar";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <main className="px-6 py-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="h-7 w-52 rounded-lg mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-4 w-64 rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center" style={{ border: "1px solid var(--color-line)" }}>
              <div className="h-6 w-12 rounded mx-auto mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-3 w-16 rounded mx-auto animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5" style={{ border: "1px solid var(--color-line)", height: "110px" }}>
              <div className="h-3 w-24 rounded mb-3 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-4 w-36 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-3 w-28 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
          ))}
        </div>

        <div className="h-5 w-32 rounded animate-pulse mb-4" style={{ background: "var(--color-line)" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex bg-white rounded-2xl overflow-hidden h-36" style={{ border: "1px solid var(--color-line)" }}>
              <div className="w-1 flex-shrink-0 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="h-5 w-10 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                  <div className="h-5 w-12 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                </div>
                <div className="h-5 w-32 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="h-3 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="flex gap-1.5 items-end h-5">
                  {[1, 2].map((j) => (
                    <div key={j} className="w-2 h-3/4 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}