import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import ProfileClient from "./profile-client";

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

  const topicStats = topics.map((topic, index) => {
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
    const progressPercent =
      totalQuizzes > 0 ? Math.round((completedCount / totalQuizzes) * 100) : 0;

    const quizStatuses = topic.quizzes.map((q) => {
      const best = q.attempts[0];
      if (!best) return "empty";
      if (best.score === best.total) return "perfect";
      return "partial";
    });

    return {
      id: topic.id,
      name: topic.name,
      index: String(index + 1).padStart(2, "0"),
      totalQuizzes,
      completedCount,
      perfectCount,
      notPerfectCount,
      avgPercentage,
      isTopicPerfect,
      progressPercent,
      quizStatuses,
    };
  });

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
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <ProfileClient
        user={{ name: session.user.name, email: session.user.email }}
        topicStats={topicStats}
        summary={{ totalQuizzesAll, completedAll, perfectAll, perfectTopicsCount, overallAvg, totalTopics: topicStats.length }}
      />
    </div>
  );
}