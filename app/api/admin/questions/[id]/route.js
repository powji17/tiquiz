import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

function validatePayload(payload) {
  const { text, optionA, optionB, optionC, optionD, correctAnswer } = payload;

  if (!text || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
    return "Semua field wajib diisi kecuali pembahasan.";
  }

  if (!["A", "B", "C", "D"].includes(correctAnswer)) {
    return "Jawaban benar harus salah satu dari A, B, C, atau D.";
  }

  return null;
}

export async function PUT(req, { params }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const questionId = parseInt(id);

  try {
    const payload = await req.json();
    const errorMsg = validatePayload(payload);
    if (errorMsg) return NextResponse.json({ error: errorMsg }, { status: 400 });

    const { text, optionA, optionB, optionC, optionD, correctAnswer, explanation } = payload;

    const question = await prisma.question.update({
      where: { id: questionId },
      data: { text, optionA, optionB, optionC, optionD, correctAnswer, explanation },
    });

    await prisma.quizAttempt.deleteMany({
      where: { quizId: question.quizId },
    });

    return NextResponse.json(question);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal memperbarui soal." }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const questionId = parseInt(id);

  try {
    // Ambil quizId dulu sebelum soal dihapus
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { quizId: true },
    });

    if (!question) {
      return NextResponse.json({ error: "Soal tidak ditemukan." }, { status: 404 });
    }

    await prisma.question.delete({ where: { id: questionId } });

    // Reset semua attempt di kuis ini karena konten soal berubah
    await prisma.quizAttempt.deleteMany({
      where: { quizId: question.quizId },
    });

    return NextResponse.json({ message: "Soal berhasil dihapus." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menghapus soal." }, { status: 500 });
  }
}