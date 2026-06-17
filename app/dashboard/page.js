import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = parseInt(session.user.id);

  const topics = await prisma.topic.findMany({
    include: {
      quizzes: {
        include: {
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

  // Hitung status per topik untuk stack-bar
  const topicsWithStats = topics.map((topic, index) => {
    const quizStatuses = topic.quizzes.map((quiz) => {
      const best = quiz.attempts[0];
      if (!best) return "empty";
      if (best.score === best.total) return "perfect";
      return "partial";
    });

    const perfectCount = quizStatuses.filter((s) => s === "perfect").length;
    const isTopicComplete = perfectCount === topic.quizzes.length && topic.quizzes.length > 0;

    return {
      id: topic.id,
      name: topic.name,
      description: topic.description,
      index: String(index + 1).padStart(2, "0"),
      quizStatuses,
      totalQuizzes: topic.quizzes.length,
      perfectCount,
      isTopicComplete,
    };
  });

  // Ringkasan progress keseluruhan
  const allQuizzes = topics.flatMap((t) => t.quizzes);
  const totalQuizzesAll = allQuizzes.length;
  const attemptedQuizzes = allQuizzes.filter((q) => q.attempts.length > 0);
  const completedAll = attemptedQuizzes.length;
  const perfectAll = attemptedQuizzes.filter((q) => q.attempts[0].score === q.attempts[0].total).length;
  const overallAvg =
    attemptedQuizzes.length > 0
      ? Math.round(
          attemptedQuizzes.reduce((sum, q) => sum + (q.attempts[0].score / q.attempts[0].total) * 100, 0) /
            attemptedQuizzes.length
        )
      : null;

  const perfectTopicsCount = topicsWithStats.filter((t) => t.isTopicComplete).length;

  // "Lanjutkan Belajar": kuis yang sudah dikerjakan tapi belum 100%
  const continueQuiz = topics
    .flatMap((topic) =>
      topic.quizzes
        .filter((q) => q.attempts.length > 0 && q.attempts[0].score !== q.attempts[0].total)
        .map((q) => ({
          id: q.id,
          name: q.name,
          topicName: topic.name,
          bestScore: q.attempts[0].score,
          bestTotal: q.attempts[0].total,
        }))
    )
    .sort((a, b) => b.bestScore / b.bestTotal - a.bestScore / a.bestTotal)[0] || null;

  // Aktivitas terakhir: 3 attempt paling baru
  const recentAttempts = await prisma.quizAttempt.findMany({
    where: { userId },
    include: { quiz: { include: { topic: { select: { name: true } } } } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const recentActivity = recentAttempts.map((a) => ({
    id: a.id,
    quizId: a.quiz.id,
    quizName: a.quiz.name,
    topicName: a.quiz.topic.name,
    score: a.score,
    total: a.total,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <DashboardClient
        topics={topicsWithStats}
        userName={session.user.name}
        summary={{ totalQuizzesAll, completedAll, perfectAll, overallAvg, perfectTopicsCount, totalTopics: topicsWithStats.length }}
        continueQuiz={continueQuiz}
        recentActivity={recentActivity}
      />
    </div>
  );
}