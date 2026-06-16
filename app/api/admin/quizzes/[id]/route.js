import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

export async function PUT(req, { params }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const quizId = parseInt(id);

  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Nama kuis wajib diisi." }, { status: 400 });
    }

    const quiz = await prisma.quiz.update({
      where: { id: quizId },
      data: { name, description },
    });

    return NextResponse.json(quiz);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal memperbarui kuis." }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const quizId = parseInt(id);

  try {
    const questionCount = await prisma.question.count({ where: { quizId } });
    if (questionCount > 0) {
      return NextResponse.json(
        { error: "Hapus semua soal di kuis ini terlebih dahulu." },
        { status: 400 }
      );
    }

    await prisma.quiz.delete({ where: { id: quizId } });
    return NextResponse.json({ message: "Kuis berhasil dihapus." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menghapus kuis." }, { status: 500 });
  }
}