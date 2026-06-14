import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = parseInt(session.user.id);

  const topics = await prisma.topic.findMany({
    include: {
      quizzes: {
        include: {
          _count: { select: { questions: true } },
          attempts: {
            where: { userId },
            orderBy: { score: "desc" },
            take: 1,
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  // Hitung statistik per topik
  const topicStats = topics.map((topic) => {
    const totalQuizzes = topic.quizzes.length;
    const attempted = topic.quizzes.filter((q) => q.attempts.length > 0);
    const completedCount = attempted.length;
    const perfectCount = attempted.filter(
      (q) => q.attempts[0].score === q.attempts[0].total
    ).length;
    const notPerfectCount = completedCount - perfectCount;

    const avgPercentage =
      attempted.length > 0
        ? Math.round(
            attempted.reduce(
              (sum, q) => sum + (q.attempts[0].score / q.attempts[0].total) * 100,
              0
            ) / attempted.length
          )
        : null;

    const isTopicPerfect = totalQuizzes > 0 && perfectCount === totalQuizzes;

    return {
      id: topic.id,
      name: topic.name,
      totalQuizzes,
      completedCount,
      perfectCount,
      notPerfectCount,
      avgPercentage,
      isTopicPerfect,
    };
  });

  // Statistik keseluruhan
  const totalQuizzesAll = topicStats.reduce((sum, t) => sum + t.totalQuizzes, 0);
  const completedAll = topicStats.reduce((sum, t) => sum + t.completedCount, 0);
  const perfectAll = topicStats.reduce((sum, t) => sum + t.perfectCount, 0);
  const perfectTopicsCount = topicStats.filter((t) => t.isTopicPerfect).length;
  const topicsWithScore = topicStats.filter((t) => t.avgPercentage !== null);
  const overallAvg =
    topicsWithScore.length > 0
      ? Math.round(
          topicsWithScore.reduce((sum, t) => sum + t.avgPercentage, 0) /
            topicsWithScore.length
        )
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:underline">
          ← Kembali ke Dashboard
        </Link>
        <h1 className="text-lg font-bold text-gray-800 mt-1">Profil & Statistik</h1>
        <p className="text-sm text-gray-500">
          {session.user.name} · {session.user.email}
        </p>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        {/* Statistik keseluruhan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {completedAll}/{totalQuizzesAll}
            </p>
            <p className="text-sm text-gray-500 mt-1">Kuis Dikerjakan</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
            <p className="text-2xl font-bold text-green-600">{perfectAll}</p>
            <p className="text-sm text-gray-500 mt-1">Kuis Sempurna (100%)</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
            <p className="text-2xl font-bold text-teal-600">
              {perfectTopicsCount}/{topicStats.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Topik Tuntas 100%</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {overallAvg !== null ? `${overallAvg}%` : "-"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Rata-rata Skor</p>
          </div>
        </div>

        {/* Progress per topik */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Progress per Topik</h2>

        <div className="space-y-4">
          {topicStats.map((topic) => {
            const progressPercent =
              topic.totalQuizzes > 0
                ? Math.round((topic.completedCount / topic.totalQuizzes) * 100)
                : 0;

            return (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 block hover:border-blue-300 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                  <span className="text-sm text-gray-500">
                    {topic.completedCount}/{topic.totalQuizzes} kuis
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {topic.perfectCount > 0 && (
                    <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                      ✅ {topic.perfectCount} sempurna
                    </span>
                  )}
                  {topic.notPerfectCount > 0 && (
                    <span className="text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-1 rounded-full">
                      ⚠ {topic.notPerfectCount} belum sempurna
                    </span>
                  )}
                  {topic.avgPercentage !== null && (
                    <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-1 rounded-full">
                      Rata-rata: {topic.avgPercentage}%
                    </span>
                  )}
                  {topic.completedCount === 0 && (
                    <span className="text-xs text-gray-400">Belum dikerjakan</span>
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