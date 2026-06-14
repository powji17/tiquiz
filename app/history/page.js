import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = parseInt(session.user.id);

  const attempts = await prisma.quizAttempt.findMany({
    where: { userId },
    include: {
      quiz: {
        include: {
          topic: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-lg font-bold text-gray-800 mt-1">Riwayat Pengerjaan Kuis</h1>
        <p className="text-sm text-gray-500">Semua percobaan kuis yang pernah kamu kerjakan</p>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        {attempts.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-10">
            Belum ada riwayat pengerjaan kuis.
          </p>
        ) : (
          <div className="space-y-3">
            {attempts.map((attempt) => {
              const percentage = Math.round((attempt.score / attempt.total) * 100);
              const isPerfect = attempt.score === attempt.total;

              const date = new Date(attempt.createdAt).toLocaleString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              let badgeStyle = "text-yellow-700 bg-yellow-50";
              if (isPerfect) badgeStyle = "text-green-700 bg-green-50";
              else if (percentage < 50) badgeStyle = "text-red-700 bg-red-50";

              return (
                <Link
                  key={attempt.id}
                  href={`/quiz/${attempt.quiz.id}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:border-blue-300 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{attempt.quiz.name}</p>
                    <p className="text-xs text-gray-500">
                      {attempt.quiz.topic.name} · {date}
                    </p>
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap ${badgeStyle}`}>
                    {attempt.score}/{attempt.total} ({percentage}%)
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}