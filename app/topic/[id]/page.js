import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TopicPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  const topicId = parseInt(id);

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: {
      quizzes: {
        include: {
          _count: { select: { questions: true } },
          attempts: {
            where: { userId: parseInt(session.user.id) },
            orderBy: { score: "desc" },
            take: 1,
          },
        },
      },
    },
  });

  if (!topic) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-lg font-bold text-gray-800 mt-1">{topic.name}</h1>
        <p className="text-sm text-gray-500">{topic.description}</p>
      </header>

      <main className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Kuis</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topic.quizzes.map((quiz) => {
            const bestAttempt = quiz.attempts[0];
            const isPerfect = bestAttempt && bestAttempt.score === bestAttempt.total;

            let borderStyle = "border-gray-200 hover:border-blue-300";
            if (bestAttempt) {
              borderStyle = isPerfect
                ? "border-green-400 hover:border-green-500"
                : "border-yellow-400 hover:border-yellow-500";
            }

            return (
              <Link
                key={quiz.id}
                href={`/quiz/${quiz.id}`}
                className={`bg-white rounded-2xl shadow-sm border p-5 transition block relative ${borderStyle}`}
              >
                {isPerfect && (
                  <span className="absolute top-3 right-3 text-green-500 text-lg">✅</span>
                )}

                <h3 className="font-semibold text-gray-800 mb-1 pr-6">{quiz.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{quiz.description}</p>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {quiz._count.questions} soal
                  </span>

                  {bestAttempt && (
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        isPerfect
                          ? "text-green-700 bg-green-50"
                          : "text-yellow-700 bg-yellow-50"
                      }`}
                    >
                      Skor terbaik: {bestAttempt.score}/{bestAttempt.total}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}