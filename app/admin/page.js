import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./admin-dashboard-client";

export default async function AdminDashboard() {
  const [topicCount, quizCount, questionCount, userCount] = await Promise.all([
    prisma.topic.count(),
    prisma.quiz.count(),
    prisma.question.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { label: "Topik", value: topicCount, color: "var(--color-primary)" },
    { label: "Kuis", value: quizCount, color: "var(--color-success)" },
    { label: "Soal", value: questionCount, color: "#0EA5C9" },
    { label: "Pengguna", value: userCount, color: "#8B5CF6" },
  ];

  return <AdminDashboardClient stats={stats} />;
}