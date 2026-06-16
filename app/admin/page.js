import { prisma } from "@/lib/prisma";
import Link from "next/link";

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

  return (
    <main className="px-6 py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
          Panel Admin
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Kelola konten dan pantau ringkasan data TIQuiz.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-4 text-center"
            style={{ border: "1px solid var(--color-line)" }}
          >
            <p
              className="font-bold mb-1"
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "22px",
                color: stat.color,
              }}
            >
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Menu kelola */}
      <h2 className="text-base font-bold mb-4" style={{ color: "var(--color-foreground)" }}>
        Kelola Konten
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/topics"
          className="flex bg-white rounded-2xl overflow-hidden block"
          style={{ border: "1px solid var(--color-line)" }}
        >
          <div style={{ width: "4px", flexShrink: 0, background: "var(--color-primary)" }} />
          <div className="p-5">
            <h3 className="font-bold mb-1" style={{ fontSize: "15px", color: "var(--color-foreground)" }}>
              Kelola Topik, Kuis dan Soal
            </h3>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              Tambah, ubah, atau hapus topik, kuis, dan soal.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}