"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const medalColors = ["#E8A23D", "#9CA3AF", "#C97B3D"]; // emas, perak, perunggu

export default function Leaderboard({ quizId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/quiz/${quizId}/leaderboard`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat");
        return res.json();
      })
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [quizId]);

  const formatDuration = (seconds) => {
    if (seconds === null || seconds === undefined) return "—";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}d` : `${s}d`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: "1px solid var(--color-line)" }}>
        <div className="h-4 w-40 rounded animate-pulse mb-4" style={{ background: "var(--color-line)" }} />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 rounded mb-2 animate-pulse" style={{ background: "var(--color-line)" }} />
        ))}
      </div>
    );
  }

  if (error || !data || data.totalParticipants === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-2xl p-5 mb-6"
      style={{ border: "1px solid var(--color-line)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm" style={{ color: "var(--color-foreground)" }}>
          🏆 Leaderboard
        </h3>
        <span
          style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-muted)" }}
        >
          {data.totalParticipants} peserta
        </span>
      </div>

      <div className="space-y-1.5">
        {data.top10.map((entry, i) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.04 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{
              background: entry.isCurrentUser ? "var(--color-primary-tint)" : "transparent",
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                fontWeight: 700,
                background: entry.rank <= 3 ? medalColors[entry.rank - 1] : "var(--color-line)",
                color: entry.rank <= 3 ? "white" : "var(--color-muted)",
              }}
            >
              {entry.rank}
            </span>
            <span
              className="flex-1 truncate text-sm font-medium"
              style={{ color: entry.isCurrentUser ? "var(--color-primary-dark)" : "var(--color-foreground)" }}
            >
              {entry.name}
              {entry.isCurrentUser && (
                <span style={{ fontSize: "11px", color: "var(--color-primary)", marginLeft: "6px" }}>(kamu)</span>
              )}
            </span>
            <span
              style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", fontWeight: 600, color: "var(--color-foreground)" }}
            >
              {entry.score}/{entry.total}
            </span>
            <span
              style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-muted)", minWidth: "44px", textAlign: "right" }}
            >
              {formatDuration(entry.durationSeconds)}
            </span>
          </motion.div>
        ))}

        {data.currentUserEntry && (
          <>
            <div className="text-center py-1" style={{ color: "var(--color-muted)", fontSize: "11px" }}>
              ⋯
            </div>
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{ background: "var(--color-primary-tint)" }}
            >
              <span
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "11px",
                  fontWeight: 700,
                  background: "var(--color-line)",
                  color: "var(--color-muted)",
                }}
              >
                {data.currentUserEntry.rank}
              </span>
              <span className="flex-1 truncate text-sm font-medium" style={{ color: "var(--color-primary-dark)" }}>
                {data.currentUserEntry.name}
                <span style={{ fontSize: "11px", color: "var(--color-primary)", marginLeft: "6px" }}>(kamu)</span>
              </span>
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", fontWeight: 600, color: "var(--color-foreground)" }}>
                {data.currentUserEntry.score}/{data.currentUserEntry.total}
              </span>
              <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--color-muted)", minWidth: "44px", textAlign: "right" }}>
                {formatDuration(data.currentUserEntry.durationSeconds)}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}