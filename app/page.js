import { prisma } from "@/lib/prisma";
import LandingClient from "./landing-client";

export default async function HomePage() {
  const topics = await prisma.topic.findMany({
    include: { _count: { select: { quizzes: true } } },
    orderBy: { name: "asc" },
    take: 6,
  });

  const totalQuestions = await prisma.question.count();

  return <LandingClient topics={topics} totalQuestions={totalQuestions} />;
}