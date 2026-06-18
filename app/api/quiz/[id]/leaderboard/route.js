import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const quizId = parseInt(id);
  const currentUserId = parseInt(session.user.id);

  try {
    // Ambil semua attempt pertama untuk kuis ini, dari user dengan role USER saja (bukan ADMIN)
    const attempts = await prisma.quizAttempt.findMany({
      where: {
        quizId,
        isFirstAttempt: true,
        user: { role: "USER" },
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    // Urutkan: skor tertinggi dulu, lalu durasi tercepat sebagai tie-breaker
    // Attempt tanpa durasi (data lama) ditempatkan di akhir antar skor yang sama
    const sorted = attempts.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      if (a.durationSeconds === null && b.durationSeconds === null) return 0;
      if (a.durationSeconds === null) return 1;
      if (b.durationSeconds === null) return -1;

      return a.durationSeconds - b.durationSeconds;
    });

    const ranked = sorted.map((attempt, index) => ({
      rank: index + 1,
      userId: attempt.user.id,
      name: attempt.user.name,
      score: attempt.score,
      total: attempt.total,
      durationSeconds: attempt.durationSeconds,
      isCurrentUser: attempt.user.id === currentUserId,
    }));

    const top10 = ranked.slice(0, 10);
    const currentUserEntry = ranked.find((r) => r.userId === currentUserId);
    const currentUserInTop10 = top10.some((r) => r.userId === currentUserId);

    return NextResponse.json({
      top10,
      currentUserEntry: currentUserInTop10 ? null : currentUserEntry || null,
      totalParticipants: ranked.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal memuat leaderboard." }, { status: 500 });
  }
}