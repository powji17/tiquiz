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
  const { quizId, text, optionA, optionB, optionC, optionD, correctAnswer } = payload;

  if (!quizId || !text || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
    return "Semua field wajib diisi kecuali pembahasan.";
  }

  if (!["A", "B", "C", "D"].includes(correctAnswer)) {
    return "Jawaban benar harus salah satu dari A, B, C, atau D.";
  }

  return null;
}

export async function POST(req) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = await req.json();
    const errorMsg = validatePayload(payload);
    if (errorMsg) return NextResponse.json({ error: errorMsg }, { status: 400 });

    const { quizId, text, optionA, optionB, optionC, optionD, correctAnswer, explanation } = payload;

    const question = await prisma.question.create({
      data: {
        quizId: parseInt(quizId),
        text,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        explanation,
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menambahkan soal." }, { status: 500 });
  }
}