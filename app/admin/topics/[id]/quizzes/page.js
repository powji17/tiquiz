import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import QuizzesAdminClient from "./quizzes-admin-client";

export default async function AdminQuizzesPage({ params }) {
  const { id } = await params;
  const topicId = parseInt(id);

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: {
      quizzes: {
        include: { _count: { select: { questions: true } } },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!topic) redirect("/admin/topics");

  return (
    <QuizzesAdminClient
      topic={{ id: topic.id, name: topic.name }}
      initialQuizzes={topic.quizzes}
    />
  );
}