import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const topics = await prisma.topic.findMany({
    include: {
      _count: { select: { quizzes: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Halo, {session.user.name}! 👋</h2>
          <p className="text-sm text-gray-500">Pilih topik untuk mulai belajar.</p>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pilih Topik</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition block"
            >
              <h3 className="font-semibold text-gray-800 mb-1">{topic.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{topic.description}</p>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {topic._count.quizzes} kuis
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}