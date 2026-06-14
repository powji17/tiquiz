import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { quizId, answers } = await req.json();

    const questions = await prisma.question.findMany({
      where: { quizId: parseInt(quizId) },
      select: {
        id: true,
        text: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        correctAnswer: true,
        explanation: true,
      },
    });

    let score = 0;
    const results = questions.map((q) => {
      const userAnswer = answers[q.id] || null;
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) score++;

      return {
        questionId: q.id,
        text: q.text,
        options: {
          A: q.optionA,
          B: q.optionB,
          C: q.optionC,
          D: q.optionD,
        },
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    await prisma.quizAttempt.create({
      data: {
        userId: parseInt(session.user.id),
        quizId: parseInt(quizId),
        score,
        total: questions.length,
      },
    });

    return NextResponse.json({ score, total: questions.length, results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menyimpan hasil kuis." }, { status: 500 });
  }
}