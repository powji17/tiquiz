"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const statusConfig = {
  perfect: {
    border: "var(--color-success)",
    accent: "var(--color-success)",
    badge: { bg: "var(--color-success-tint)", color: "var(--color-success)", label: "Sempurna ✓" },
  },
  partial: {
    border: "var(--color-warning)",
    accent: "var(--color-warning)",
    badge: { bg: "var(--color-warning-tint)", color: "var(--color-warning)", label: null },
  },
  empty: {
    border: "var(--color-line)",
    accent: "var(--color-primary)",
    badge: null,
  },
};

export default function TopicClient({ topic, quizzes }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("semua");

  const filteredQuizzes = quizzes
    .filter((q) => q.name.toLowerCase().includes(search.toLowerCase()))
    .filter((q) => {
      if (filter === "sempurna") return q.status === "perfect";
      if (filter === "sebagian") return q.status === "partial";
      if (filter === "belum") return q.status === "empty";
      return true;
    });

  return (
    <main className="px-6 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm mb-4 transition-colors"
          style={{ color: "var(--color-muted)" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
          {topic.name}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {topic.description}
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari kuis..."
          className="rounded-xl px-4 py-2 text-sm outline-none w-full sm:max-w-xs"
          style={{ border: "1px solid var(--color-line)", background: "#FAFAF9", color: "var(--color-foreground)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
        />
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "semua", label: "Semua" },
            { key: "sempurna", label: "Sempurna" },
            { key: "sebagian", label: "Sebagian" },
            { key: "belum", label: "Belum Dikerjakan" },
          ].map((f) => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: filter === f.key ? "var(--color-primary)" : "white",
                color: filter === f.key ? "white" : "var(--color-muted)",
                border: `1px solid ${filter === f.key ? "var(--color-primary)" : "var(--color-line)"}`,
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid kuis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredQuizzes.length === 0 ? (
          <p className="text-sm col-span-full text-center py-8" style={{ color: "var(--color-muted)" }}>
            {search
              ? `Tidak ada kuis yang cocok dengan "${search}".`
              : filter === "sempurna"
              ? "Belum ada kuis yang sempurna di topik ini."
              : filter === "sebagian"
              ? "Belum ada kuis yang dikerjakan sebagian."
              : filter === "belum"
              ? "Semua kuis sudah dikerjakan!"
              : "Belum ada kuis di topik ini."}
          </p>
        ) : filteredQuizzes.map((quiz, i) => {
          const cfg = statusConfig[quiz.status];

          return (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/quiz/${quiz.id}`}
                className="flex bg-white rounded-2xl overflow-hidden h-full block"
                style={{ border: `1px solid ${cfg.border}` }}
              >
                {/* Accent bar */}
                <div style={{ width: "4px", flexShrink: 0, background: cfg.accent }} />

                <div className="p-5 flex flex-col flex-1 min-w-0">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-3">
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
                      {quiz.index}
                    </span>

                    <div className="flex items-center gap-2">
                      {cfg.badge && (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: cfg.badge.color,
                            background: cfg.badge.bg,
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          {cfg.badge.label ?? `${quiz.bestScore}/${quiz.bestTotal}`}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "11px",
                          color: "var(--color-muted)",
                        }}
                      >
                        {quiz.questionCount} soal
                      </span>
                    </div>
                  </div>

                  {/* Nama & deskripsi */}
                  <h2
                    className="font-bold mb-1"
                    style={{ fontSize: "15px", color: "var(--color-foreground)" }}
                  >
                    {quiz.name}
                  </h2>
                  <p
                    className="text-xs flex-1"
                    style={{ color: "var(--color-muted)", lineHeight: 1.5 }}
                  >
                    {quiz.description}
                  </p>

                  {/* Skor terbaik (partial) */}
                  {quiz.status === "partial" && quiz.bestScore !== null && (
                    <div className="mt-3">
                      <div
                        className="flex justify-between text-xs mb-1"
                        style={{ color: "var(--color-muted)" }}
                      >
                        <span>Skor terbaik</span>
                        <span
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            color: "var(--color-warning)",
                            fontWeight: 600,
                          }}
                        >
                          {quiz.bestScore}/{quiz.bestTotal}
                        </span>
                      </div>
                      <div
                        className="w-full rounded-full overflow-hidden"
                        style={{ height: "4px", background: "var(--color-line)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(quiz.bestScore / quiz.bestTotal) * 100}%` }}
                          transition={{ duration: 0.6, delay: i * 0.08 + 0.2 }}
                          style={{ height: "100%", background: "var(--color-warning)", borderRadius: "999px" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Progress bar kosong (empty) */}
                  {quiz.status === "empty" && (
                    <div className="mt-3">
                      <p className="text-xs" style={{ color: "var(--color-stack-empty)" }}>
                        Belum dikerjakan
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}