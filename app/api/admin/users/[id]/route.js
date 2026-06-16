import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

export async function PUT(req, { params }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const userId = parseInt(id);

  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Nama, email, dan role wajib diisi." }, { status: 400 });
    }

    // Cegah admin downgrade role dirinya sendiri
    if (userId === parseInt(session.user.id) && role !== "ADMIN") {
      return NextResponse.json(
        { error: "Tidak bisa mengubah role akunmu sendiri menjadi USER." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findFirst({
      where: { email, NOT: { id: userId } },
    });
    if (existing) {
      return NextResponse.json({ error: "Email sudah digunakan pengguna lain." }, { status: 400 });
    }

    if (password && password.length > 0 && password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter." }, { status: 400 });
    }

    const data = { name, email, role };
    if (password && password.length > 0) {
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal memperbarui pengguna." }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const userId = parseInt(id);

  if (userId === parseInt(session.user.id)) {
    return NextResponse.json({ error: "Tidak bisa menghapus akunmu sendiri." }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ message: "Pengguna dan seluruh riwayat kuisnya berhasil dihapus." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menghapus pengguna." }, { status: 500 });
  }
}