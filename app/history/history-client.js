"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HistoryClient({ attempts }) {
  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-foreground)" }}>
          Riwayat Pengerjaan
        </h1>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          Semua percobaan kuis yang pernah kamu kerjakan.
        </p>
      </motion.div>

      {attempts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-16"
        >
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Belum ada riwayat. Mulai kerjakan kuis pertamamu!
          </p>
          <Link
            href="/dashboard"
            className="inline-block mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--color-primary)" }}
          >
            Mulai Kuis
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {attempts.map((attempt, i) => {
            const isPerfect = attempt.score === attempt.total;
            const isLow = attempt.percentage < 50;

            const badgeColor = isPerfect
              ? "var(--color-success)"
              : isLow
              ? "var(--color-danger)"
              : "var(--color-warning)";

            const badgeBg = isPerfect
              ? "var(--color-success-tint)"
              : isLow
              ? "var(--color-danger-tint)"
              : "var(--color-warning-tint)";

            const date = new Date(attempt.createdAt).toLocaleString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={attempt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
              >
                <Link
                  href={`/quiz/${attempt.quizId}`}
                  className="flex items-center justify-between bg-white rounded-xl px-4 py-3.5 block"
                  style={{ border: "1px solid var(--color-line)" }}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-semibold text-sm truncate"
                      style={{ color: "var(--color-foreground)" }}
                    >
                      {attempt.quizName}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                      {attempt.topicName} · {date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <span
                      className="font-semibold text-xs px-2.5 py-1 rounded-lg"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        background: badgeBg,
                        color: badgeColor,
                      }}
                    >
                      {attempt.score}/{attempt.total}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}