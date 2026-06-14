import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import QuizClient from "./quiz-client";

export default async function QuizPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  const quizId = parseInt(id);

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      topic: { select: { id: true, name: true } },
      questions: {
        select: {
          id: true,
          text: true,
          optionA: true,
          optionB: true,
          optionC: true,
          optionD: true,
        },
      },
    },
  });

  if (!quiz) redirect("/dashboard");

  return <QuizClient quiz={quiz} />;
}