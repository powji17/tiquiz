"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Terjadi kesalahan, coba lagi.");
        setLoading(false);
      } else {
        toast.success("Akun berhasil dibuat!");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
      setLoading(false);
    }
  };

  const inputStyle = {
    border: "1px solid var(--color-line)",
    background: "#FAFAF9",
    color: "var(--color-foreground)",
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
        {/* Logo + tombol kembali */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
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
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>
        </div>

        <div
          className="bg-white p-8 rounded-2xl"
          style={{ border: "1px solid var(--color-line)" }}
        >
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
            Buat akun baru
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Mulai perjalanan belajarmu sekarang.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Nama", type: "text", value: name, setter: setName, placeholder: "Nama lengkapmu" },
              { label: "Email", type: "email", value: email, setter: setEmail, placeholder: "contoh@email.com" },
              { label: "Password", type: "password", value: password, setter: setPassword, placeholder: "Minimal 6 karakter", minLength: 6 },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
                  placeholder={field.placeholder}
                  minLength={field.minLength}
                  required
                />
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              style={{ background: "var(--color-primary)" }}
            >
              {loading ? "Memproses..." : "Daftar"}
            </motion.button>
          </form>
        </div>

        <p className="text-sm text-center mt-4" style={{ color: "var(--color-muted)" }}>
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Masuk sekarang
          </Link>
        </p>
      </motion.div>
    </div>
  );
}