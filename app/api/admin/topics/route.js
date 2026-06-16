import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const topics = await prisma.topic.findMany({
    include: { _count: { select: { quizzes: true } } },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(topics);
}

export async function POST(req) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Nama topik wajib diisi." }, { status: 400 });
    }

    const existing = await prisma.topic.findUnique({ where: { name } });
    if (existing) {
      return NextResponse.json({ error: "Nama topik sudah digunakan." }, { status: 400 });
    }

    const topic = await prisma.topic.create({ data: { name, description } });
    return NextResponse.json(topic, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menambahkan topik." }, { status: 500 });
  }
}