import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import HistoryClient from "./history-client";

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

  const attemptsData = attempts.map((attempt) => ({
    id: attempt.id,
    quizId: attempt.quiz.id,
    quizName: attempt.quiz.name,
    topicName: attempt.quiz.topic.name,
    topicId: attempt.quiz.topic.id,
    score: attempt.score,
    total: attempt.total,
    percentage: Math.round((attempt.score / attempt.total) * 100),
    createdAt: attempt.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <HistoryClient attempts={attemptsData} />
    </div>
  );
}