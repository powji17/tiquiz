import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/app/components/Navbar";
import TopicClient from "./topic-client";

export default async function TopicPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  const topicId = parseInt(id);
  const userId = parseInt(session.user.id);

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
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
  });

  if (!topic) redirect("/dashboard");

  const quizzesWithStats = topic.quizzes.map((quiz, index) => {
    const best = quiz.attempts[0];
    const status = !best ? "empty" : best.score === best.total ? "perfect" : "partial";

    return {
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      index: String(index + 1).padStart(2, "0"),
      questionCount: quiz._count.questions,
      status,
      bestScore: best ? best.score : null,
      bestTotal: best ? best.total : null,
    };
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <TopicClient topic={{ id: topic.id, name: topic.name, description: topic.description }} quizzes={quizzesWithStats} />
    </div>
  );
}