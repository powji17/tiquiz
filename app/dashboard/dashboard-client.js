"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const stackColors = {
  perfect: "var(--color-success)",
  partial: "var(--color-warning)",
  empty: "var(--color-stack-empty)",
};

export default function DashboardClient({ topics, userName, summary, continueQuiz, recentActivity }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("semua");

  const filteredTopics = topics
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => {
      if (filter === "tuntas") return t.isTopicComplete;
      if (filter === "belum") return !t.isTopicComplete;
      return true;
    });

  return (
    <main className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
          Halo, {userName}! 👋
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Pilih topik untuk mulai atau melanjutkan belajar.
        </p>
      </motion.div>

      {/* Ringkasan progress */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Kuis Dikerjakan", value: `${summary.completedAll}/${summary.totalQuizzesAll}`, color: "var(--color-primary)" },
          { label: "Kuis Sempurna", value: summary.perfectAll, color: "var(--color-success)" },
          { label: "Topik Tuntas", value: `${summary.perfectTopicsCount}/${summary.totalTopics}`, color: "#0EA5C9" },
          { label: "Rata-rata Skor", value: summary.overallAvg !== null ? `${summary.overallAvg}%` : "—", color: "#8B5CF6" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="bg-white rounded-2xl p-4 text-center"
            style={{ border: "1px solid var(--color-line)" }}
          >
            <p
              className="font-bold mb-1"
              style={{ fontFamily: "var(--font-jetbrains)", fontSize: "20px", color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lanjutkan Belajar + Aktivitas Terakhir */}
      {(continueQuiz || recentActivity.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {continueQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/quiz/${continueQuiz.id}`}
                className="flex bg-white rounded-2xl overflow-hidden h-full block items-center"
                style={{ border: "1px solid var(--color-warning)" }}
              >
                <div style={{ width: "4px", alignSelf: "stretch", flexShrink: 0, background: "var(--color-warning)" }} />
                <div className="p-5">
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: "var(--color-warning)" }}
                  >
                    ▶ Lanjutkan Belajar
                  </p>
                  <h3 className="font-bold mb-1" style={{ fontSize: "15px", color: "var(--color-foreground)" }}>
                    {continueQuiz.name}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                    {continueQuiz.topicName} ·{" "}
                    <span style={{ fontFamily: "var(--font-jetbrains)", color: "var(--color-warning)", fontWeight: 600 }}>
                      Skor terbaik: {continueQuiz.bestScore}/{continueQuiz.bestTotal}
                    </span>
                  </p>
                </div>
              </Link>
            </motion.div>
          )}

          {recentActivity.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-5"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--color-muted)" }}>
                Aktivitas Terakhir
              </p>
              <div className="space-y-2.5">
                {recentActivity.map((act) => {
                  const isPerfect = act.score === act.total;
                  return (
                    <Link
                      key={act.id}
                      href={`/quiz/${act.quizId}`}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="truncate flex-1" style={{ color: "var(--color-foreground)" }}>
                        {act.quizName}
                      </span>
                      <span
                        className="text-xs font-semibold ml-2 shrink-0"
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          color: isPerfect ? "var(--color-success)" : "var(--color-warning)",
                        }}
                      >
                        {act.score}/{act.total}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Grid topik */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-base font-bold shrink-0" style={{ color: "var(--color-foreground)" }}>
            Pilih Topik
          </h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "semua", label: "Semua" },
              { key: "tuntas", label: "Tuntas" },
              { key: "belum", label: "Belum Tuntas" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: filter === f.key ? "var(--color-primary)" : "white",
                  color: filter === f.key ? "white" : "var(--color-muted)",
                  border: `1px solid ${filter === f.key ? "var(--color-primary)" : "var(--color-line)"}`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari topik..."
          className="rounded-xl px-4 py-2 text-sm outline-none w-full max-w-xs"
          style={{ border: "1px solid var(--color-line)", background: "#FAFAF9", color: "var(--color-foreground)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.length === 0 ? (
          <p className="text-sm col-span-full text-center py-8" style={{ color: "var(--color-muted)" }}>
            {search
              ? `Tidak ada topik yang cocok dengan "${search}".`
              : filter === "tuntas"
              ? "Belum ada topik yang tuntas."
              : filter === "belum"
              ? "Semua topik sudah tuntas!"
              : "Belum ada topik."}
          </p>
        ) : filteredTopics.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link
              href={`/topic/${topic.id}`}
              className="flex bg-white rounded-2xl overflow-hidden h-full block"
              style={{
                border: `1px solid ${topic.isTopicComplete ? "var(--color-success)" : "var(--color-line)"}`,
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  width: "4px",
                  flexShrink: 0,
                  background: topic.isTopicComplete ? "var(--color-success)" : "var(--color-primary)",
                }}
              />

              <div className="p-5 flex flex-col flex-1 min-w-0">
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
                    {topic.index}
                  </span>

                  {topic.isTopicComplete ? (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--color-success)",
                        background: "var(--color-success-tint)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      Tuntas ✓
                    </span>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "11px",
                        color: "var(--color-muted)",
                      }}
                    >
                      {topic.totalQuizzes} kuis
                    </span>
                  )}
                </div>

                <h2
                  className="font-bold mb-1 truncate"
                  style={{ fontSize: "15px", color: "var(--color-foreground)" }}
                >
                  {topic.name}
                </h2>
                <p
                  className="text-xs mb-4 flex-1"
                  style={{ color: "var(--color-muted)", lineHeight: 1.5 }}
                >
                  {topic.description}
                </p>

                <div className="flex gap-1.5 items-end" style={{ height: "20px" }}>
                  {topic.quizStatuses.map((status, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.35, delay: 0.3 + i * 0.08 + idx * 0.07 }}
                      style={{
                        width: "8px",
                        height: status === "perfect" ? "100%" : status === "partial" ? "60%" : "30%",
                        background: stackColors[status],
                        borderRadius: "2px",
                        transformOrigin: "bottom",
                      }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}