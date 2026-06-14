import Navbar from "@/app/components/Navbar";

export default function HistoryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-1" />
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
      </header>
      <main className="p-6 max-w-3xl mx-auto">
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
              <div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}