import Navbar from "@/app/components/Navbar";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <div className="mb-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}