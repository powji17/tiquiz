"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const menus = [
  {
    href: "/admin/topics",
    title: "Kelola Topik & Kuis",
    desc: "Tambah, ubah, atau hapus topik, kuis, dan soal.",
    color: "var(--color-primary)",
  },
  {
    href: "/admin/users",
    title: "Kelola Pengguna",
    desc: "Tambah, ubah role, reset password, atau hapus akun pengguna.",
    color: "#8B5CF6",
  },
];

export default function AdminDashboardClient({ stats }) {
  return (
    <main className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
          Panel Admin
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Kelola konten dan pantau ringkasan data TIQuiz.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="bg-white rounded-2xl p-4 text-center"
            style={{ border: "1px solid var(--color-line)" }}
          >
            <p
              className="font-bold mb-1"
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "22px",
                color: stat.color,
              }}
            >
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-base font-bold mb-4"
        style={{ color: "var(--color-foreground)" }}
      >
        Kelola Konten
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menus.map((menu, i) => (
          <motion.div
            key={menu.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link
              href={menu.href}
              className="flex bg-white rounded-2xl overflow-hidden block h-full"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <div style={{ width: "4px", flexShrink: 0, background: menu.color }} />
              <div className="p-5">
                <h3 className="font-bold mb-1" style={{ fontSize: "15px", color: "var(--color-foreground)" }}>
                  {menu.title}
                </h3>
                <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                  {menu.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}