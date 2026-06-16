import Navbar from "@/app/components/Navbar";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <main className="px-6 py-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-13 h-13 rounded-2xl animate-pulse" style={{ width: "52px", height: "52px", background: "var(--color-line)" }} />
          <div>
            <div className="h-5 w-36 rounded mb-1.5 animate-pulse" style={{ background: "var(--color-line)" }} />
            <div className="h-4 w-48 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 text-center" style={{ border: "1px solid var(--color-line)" }}>
              <div className="h-7 w-16 rounded mx-auto mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-3 w-20 rounded mx-auto animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
          ))}
        </div>
        <div className="h-5 w-36 rounded mb-4 animate-pulse" style={{ background: "var(--color-line)" }} />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex bg-white rounded-2xl overflow-hidden" style={{ height: "80px", border: "1px solid var(--color-line)" }}>
              <div className="w-1 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="h-4 w-40 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                  <div className="h-4 w-8 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                </div>
                <div className="h-1 w-full rounded animate-pulse" style={{ background: "var(--color-line)" }} />
                <div className="h-3 w-24 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}