export default function RegisterLoading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-6 w-9 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-5 w-20 rounded animate-pulse" style={{ background: "var(--color-line)" }} />
        </div>

        <div className="bg-white p-8 rounded-2xl" style={{ border: "1px solid var(--color-line)" }}>
          <div className="h-7 w-48 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
          <div className="h-4 w-56 rounded mb-6 animate-pulse" style={{ background: "var(--color-line)" }} />

          <div className="space-y-4">
            <div>
              <div className="h-3 w-10 rounded mb-1.5 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-10 w-full rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
            <div>
              <div className="h-3 w-12 rounded mb-1.5 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-10 w-full rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
            <div>
              <div className="h-3 w-16 rounded mb-1.5 animate-pulse" style={{ background: "var(--color-line)" }} />
              <div className="h-10 w-full rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
            </div>
            <div className="h-10 w-full rounded-lg animate-pulse" style={{ background: "var(--color-line)" }} />
          </div>
        </div>

        <div className="h-4 w-48 rounded mx-auto mt-4 animate-pulse" style={{ background: "var(--color-line)" }} />
      </div>
    </div>
  );
}