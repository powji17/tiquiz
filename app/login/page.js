"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Email atau password salah.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              background: "var(--color-primary-tint)",
              color: "var(--color-primary)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            TQ
          </span>
          <span className="text-base font-bold" style={{ color: "var(--color-foreground)" }}>
            TIQuiz
          </span>
        </div>

        <div
          className="bg-white p-8 rounded-2xl"
          style={{ border: "1px solid var(--color-line)" }}
        >
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
            Selamat datang
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Masuk ke akunmu untuk melanjutkan belajar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                style={{
                  border: "1px solid var(--color-line)",
                  background: "#FAFAF9",
                  color: "var(--color-foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
                placeholder="contoh@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                style={{
                  border: "1px solid var(--color-line)",
                  background: "#FAFAF9",
                  color: "var(--color-foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
                placeholder="••••••••"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              style={{ background: "var(--color-primary)" }}
            >
              {loading ? "Memproses..." : "Masuk"}
            </motion.button>
          </form>
        </div>

        <p className="text-sm text-center mt-4" style={{ color: "var(--color-muted)" }}>
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Daftar sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  );
}