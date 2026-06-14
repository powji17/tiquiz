import Navbar from "@/app/components/Navbar";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-1" />
        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
      </header>
      <main className="p-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
              <div className="h-7 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
          ))}
        </div>
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-28 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}