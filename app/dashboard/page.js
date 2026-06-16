import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
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

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <DashboardClient topics={topicsWithStats} userName={session.user.name} />
    </div>
  );
}