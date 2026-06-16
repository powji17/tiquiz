import { prisma } from "@/lib/prisma";
import TopicsAdminClient from "./topics-admin-client";

export default async function AdminTopicsPage() {
  const topics = await prisma.topic.findMany({
    include: { _count: { select: { quizzes: true } } },
    orderBy: { name: "asc" },
  });

  return <TopicsAdminClient initialTopics={topics} />;
}