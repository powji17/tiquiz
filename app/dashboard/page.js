import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">TIQuiz</h1>
          <p className="text-sm text-gray-500">Halo, {session.user.name}!</p>
        </div>
        <LogoutButton />
      </header>

      <main className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Pilih Topik</h2>
        <p className="text-gray-500 text-sm">Belum ada topik kuis. Akan kita tambahkan selanjutnya!</p>
      </main>
    </div>
  );
}