"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stackColors = {
  perfect: "var(--color-success)",
  partial: "var(--color-warning)",
  empty: "var(--color-stack-empty)",
};

const statCards = (s) => [
  { label: "Kuis Dikerjakan", value: `${s.completedAll}/${s.totalQuizzesAll}`, color: "var(--color-primary)" },
  { label: "Kuis Sempurna", value: s.perfectAll, color: "var(--color-success)" },
  { label: "Topik Tuntas", value: `${s.perfectTopicsCount}/${s.totalTopics}`, color: "#0EA5C9" },
  { label: "Rata-rata Skor", value: s.overallAvg !== null ? `${s.overallAvg}%` : "—", color: "#8B5CF6" },
];

export default function ProfileClient({ user, topicStats, summary }) {
  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      {/* Header profil */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-2xl font-bold text-white"
            style={{
              width: "52px",
              height: "52px",
              background: "var(--color-primary)",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--color-foreground)" }}>
              {user.name}
            </h1>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              {user.email}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {statCards(summary).map((card, i) => (
          <motion.div
            key={card.label}
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
                color: card.color,
              }}
            >
              {card.value}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)", lineHeight: 1.4 }}>
              {card.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Progress per topik */}
      <h2 className="text-base font-bold mb-4" style={{ color: "var(--color-foreground)" }}>
        Progress per Topik
      </h2>

      <div className="space-y-3">
        {topicStats.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Link
              href={`/topic/${topic.id}`}
              className="flex bg-white rounded-2xl overflow-hidden block"
              style={{
                border: `1px solid ${topic.isTopicPerfect ? "var(--color-success)" : "var(--color-line)"}`,
              }}
            >
              {/* Accent bar */}
              <div
                style={{
                  width: "4px",
                  flexShrink: 0,
                  background: topic.isTopicPerfect ? "var(--color-success)" : "var(--color-primary)",
                }}
              />

              <div className="p-4 flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--color-primary-dark)",
                        background: "var(--color-primary-tint)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    >
                      {topic.index}
                    </span>
                    <span className="font-semibold text-sm truncate" style={{ color: "var(--color-foreground)" }}>
                      {topic.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "11px",
                      color: "var(--color-muted)",
                      flexShrink: 0,
                      marginLeft: "8px",
                    }}
                  >
                    {topic.completedCount}/{topic.totalQuizzes}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className="w-full rounded-full overflow-hidden mb-2"
                  style={{ height: "4px", background: "var(--color-line)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.progressPercent}%` }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                    style={{
                      height: "100%",
                      background: topic.isTopicPerfect ? "var(--color-success)" : "var(--color-primary)",
                      borderRadius: "999px",
                    }}
                  />
                </div>

                {/* Badge + stack bar */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {topic.perfectCount > 0 && (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded"
                        style={{
                          background: "var(--color-success-tint)",
                          color: "var(--color-success)",
                        }}
                      >
                        ✓ {topic.perfectCount} sempurna
                      </span>
                    )}
                    {topic.notPerfectCount > 0 && (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded"
                        style={{
                          background: "var(--color-warning-tint)",
                          color: "var(--color-warning)",
                        }}
                      >
                        ⚠ {topic.notPerfectCount} belum sempurna
                      </span>
                    )}
                    {topic.completedCount === 0 && (
                      <span className="text-xs" style={{ color: "var(--color-stack-empty)" }}>
                        Belum dikerjakan
                      </span>
                    )}
                  </div>

                  {/* Mini stack bar */}
                  <div className="flex gap-1 items-end" style={{ height: "14px", flexShrink: 0 }}>
                    {topic.quizStatuses.map((status, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.08 + idx * 0.05 }}
                        style={{
                          width: "6px",
                          height: status === "perfect" ? "100%" : status === "partial" ? "60%" : "30%",
                          background: stackColors[status],
                          borderRadius: "2px",
                          transformOrigin: "bottom",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}