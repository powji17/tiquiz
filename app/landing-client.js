"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Kuis Interaktif",
    desc: "Kerjakan soal pilihan ganda dengan navigasi soal, progress tracker, dan penilaian instan.",
    color: "var(--color-primary)",
  },
  {
    title: "Pembahasan Lengkap",
    desc: "Setiap soal punya pembahasan, jadi kamu tahu bukan cuma jawaban benar tapi juga alasannya.",
    color: "var(--color-success)",
  },
  {
    title: "Progress per Topik",
    desc: "Pantau skor terbaik, kuis yang sudah tuntas, dan rata-rata pemahamanmu di tiap topik.",
    color: "#8B5CF6",
  },
  {
    title: "Leaderboard Kuis",
    desc: "Lihat peringkatmu berdasarkan skor dan kecepatan di setiap kuis, lalu bersaing sehat dengan teman sekelas.",
    color: "#0EA5C9",
  },
];

export default function LandingClient({ topics, totalQuestions }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ borderBottom: "1px solid var(--color-line)" }}
        className="bg-white px-6 py-4"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {session ? (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold px-4 py-2 rounded-lg text-white inline-block"
                  style={{ background: "var(--color-primary)" }}
                >
                  Buka Dashboard
                </Link>
              </motion.div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium" style={{ color: "var(--color-muted)" }}>
                  Masuk
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className="text-sm font-semibold px-4 py-2 rounded-lg text-white inline-block"
                    style={{ background: "var(--color-primary)" }}
                  >
                    Daftar
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section
        className="relative px-6 pt-16 pb-20 max-w-3xl mx-auto text-center overflow-hidden"
        style={{ isolation: "isolate" }}
      >
        {/* Background: grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 30%, black 30%, transparent 80%)",
            zIndex: 0,
          }}
        />

        {/* Background: floating code elements */}
        {[
          { text: "{ }", top: "8%", left: "6%", size: "28px", delay: 0, duration: 7 },
          { text: "[ ]", top: "65%", left: "10%", size: "22px", delay: 1.2, duration: 8 },
          { text: "01", top: "15%", left: "88%", size: "16px", delay: 0.6, duration: 6.5 },
          { text: "</>", top: "75%", left: "85%", size: "20px", delay: 1.8, duration: 7.5 },
          { text: "===", top: "40%", left: "92%", size: "16px", delay: 0.3, duration: 9 },
          { text: "( )", top: "85%", left: "45%", size: "18px", delay: 2.2, duration: 6 },
          { text: "10", top: "5%", left: "35%", size: "16px", delay: 1.5, duration: 8.5 },
        ].map((el, i) => (
          <motion.span
            key={i}
            className="absolute hidden sm:block select-none"
            style={{
              top: el.top,
              left: el.left,
              fontFamily: "var(--font-jetbrains)",
              fontSize: el.size,
              fontWeight: 700,
              color: "var(--color-primary)",
              opacity: 0.18,
              zIndex: 0,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.18, 0.3, 0.18] }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {el.text}
          </motion.span>
        ))}

        <div className="relative" style={{ zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--color-primary-dark)",
            background: "var(--color-primary-tint)",
            padding: "4px 10px",
            borderRadius: "999px",
            display: "inline-block",
          }}
        >
          BELAJAR ILMU KOMPUTER, SIAPA SAJA BISA
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-bold mt-5 mb-4"
          style={{ fontSize: "clamp(28px, 5vw, 44px)", color: "var(--color-foreground)", lineHeight: 1.2 }}
        >
          Belajar lebih terukur,<br />hasil lebih nyata.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base mb-8 max-w-lg mx-auto"
          style={{ color: "var(--color-muted)" }}
        >
          TIQuiz membantu kamu menguji pemahaman ilmu komputer lewat kuis interaktif,
          lengkap dengan pembahasan dan pelacakan progress per topik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={session ? "/dashboard" : "/register"}
              className="text-sm font-semibold px-6 py-3 rounded-xl text-white inline-block"
              style={{ background: "var(--color-primary)" }}
            >
              {session ? "Buka Dashboard" : "Mulai Belajar Gratis"}
            </Link>
          </motion.div>
          {!session && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/login"
                className="text-sm font-semibold px-6 py-3 rounded-xl inline-block"
                style={{ border: "1px solid var(--color-line)", color: "var(--color-foreground)" }}
              >
                Sudah punya akun?
              </Link>
            </motion.div>
          )}
        </motion.div>
        </div>
      </section>

      {/* Fitur */}
      <section
        className="px-6 py-16"
        style={{ background: "white", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-bold text-center mb-10"
            style={{ color: "var(--color-foreground)" }}
          >
            Semua yang kamu butuhkan untuk belajar efektif
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex bg-white rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--color-line)" }}
              >
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.1 }}
                  style={{ width: "4px", flexShrink: 0, background: f.color, transformOrigin: "top" }}
                />
                <div className="p-5">
                  <h3 className="font-bold mb-1" style={{ fontSize: "15px", color: "var(--color-foreground)" }}>
                    {f.title}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--color-muted)", lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview topik */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--color-foreground)" }}>
            Jelajahi topik yang tersedia
          </h2>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            {topics.length} topik · {totalQuestions} soal siap dikerjakan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex bg-white rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <div style={{ width: "4px", flexShrink: 0, background: "var(--color-primary)" }} />
              <div className="p-5 min-w-0 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--color-primary-dark)",
                      background: "var(--color-primary-tint)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-muted)" }}>
                    {topic._count.quizzes} kuis
                  </span>
                </div>
                <h3 className="font-bold mb-1 truncate" style={{ fontSize: "14px", color: "var(--color-foreground)" }}>
                  {topic.name}
                </h3>
                <p className="text-xs" style={{ color: "var(--color-muted)", lineHeight: 1.5 }}>
                  {topic.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA penutup */}
      <section className="px-6 py-16" style={{ background: "var(--color-primary)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Siap menguji pemahamanmu?
          </h2>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
            Daftar gratis dan mulai pantau progress belajarmu sekarang.
          </p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={session ? "/dashboard" : "/register"}
              className="inline-block text-sm font-semibold px-6 py-3 rounded-xl"
              style={{ background: "white", color: "var(--color-primary)" }}
            >
              {session ? "Buka Dashboard" : "Daftar Sekarang"}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="px-6 py-6 text-center"
      >
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          TIQuiz · Tempat belajar ilmu komputer untuk siapa saja
        </p>
      </motion.footer>
    </div>
  );
}