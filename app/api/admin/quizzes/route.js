import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

export async function POST(req) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { topicId, name, description } = await req.json();

    if (!topicId || !name) {
      return NextResponse.json({ error: "Topik dan nama kuis wajib diisi." }, { status: 400 });
    }

    const quiz = await prisma.quiz.create({
      data: { topicId: parseInt(topicId), name, description },
      include: { _count: { select: { questions: true } } },
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menambahkan kuis." }, { status: 500 });
  }
}