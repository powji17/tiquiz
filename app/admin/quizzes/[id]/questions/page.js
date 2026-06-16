import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import QuestionsAdminClient from "./questions-admin-client";

export default async function AdminQuestionsPage({ params }) {
  const { id } = await params;
  const quizId = parseInt(id);

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      topic: { select: { id: true, name: true } },
      questions: { orderBy: { id: "asc" } },
    },
  });

  if (!quiz) redirect("/admin/topics");

  return (
    <QuestionsAdminClient
      quiz={{ id: quiz.id, name: quiz.name, topicId: quiz.topic.id, topicName: quiz.topic.name }}
      initialQuestions={quiz.questions}
    />
  );
}