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
  const topicId = parseInt(id);

  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Nama topik wajib diisi." }, { status: 400 });
    }

    const existing = await prisma.topic.findFirst({
      where: { name, NOT: { id: topicId } },
    });
    if (existing) {
      return NextResponse.json({ error: "Nama topik sudah digunakan." }, { status: 400 });
    }

    const topic = await prisma.topic.update({
      where: { id: topicId },
      data: { name, description },
    });

    return NextResponse.json(topic);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal memperbarui topik." }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const topicId = parseInt(id);

  try {
    await prisma.topic.delete({ where: { id: topicId } });
    return NextResponse.json({ message: "Topik berhasil dihapus." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menghapus topik. Pastikan tidak ada kuis yang terkait." }, { status: 500 });
  }
}