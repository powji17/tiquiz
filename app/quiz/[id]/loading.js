export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
      </header>

      <main className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 w-full max-w-2xl">
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}