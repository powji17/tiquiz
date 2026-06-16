import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      {children}
    </div>
  );
}