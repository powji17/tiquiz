"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stackColors = {
  perfect: "var(--color-success)",
  partial: "var(--color-warning)",
  empty: "var(--color-stack-empty)",
};

export default function DashboardClient({ topics, userName }) {
  return (
    <main className="px-6 py-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
          Halo, {userName}! 👋
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Pilih topik untuk mulai atau melanjutkan belajar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
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
              {/* Accent bar kiri */}
              <div
                style={{
                  width: "4px",
                  flexShrink: 0,
                  background: topic.isTopicComplete
                    ? "var(--color-success)"
                    : "var(--color-primary)",
                }}
              />

              <div className="p-5 flex flex-col flex-1 min-w-0">
                {/* Header: index + status */}
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
                    {topic.id}
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

                {/* Nama & deskripsi */}
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

                {/* Stack-bar progress */}
                <div className="flex gap-1.5 items-end" style={{ height: "20px" }}>
                  {topic.quizStatuses.map((status, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.35, delay: i * 0.08 + idx * 0.07 }}
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