"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function QuizClient({ quiz }) {
  const { questions } = quiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentIndex];
  const options = currentQuestion
    ? [
        { key: "A", text: currentQuestion.optionA },
        { key: "B", text: currentQuestion.optionB },
        { key: "C", text: currentQuestion.optionC },
        { key: "D", text: currentQuestion.optionD },
      ]
    : [];

  const unansweredIndices = questions
    .map((q, i) => (answers[q.id] ? null : i))
    .filter((i) => i !== null);

  const backHref = `/topic/${quiz.topic.id}`;

  const handleSelect = (key) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: key }));
  };

  const goTo = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const goNext = () => { if (currentIndex < questions.length - 1) goTo(currentIndex + 1); };
  const goPrev = () => { if (currentIndex > 0) goTo(currentIndex - 1); };

  const handleFinishClick = () => {
    if (unansweredIndices.length > 0) setShowConfirm(true);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId: quiz.id, answers }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Terjadi kesalahan, coba lagi.");
        setSubmitting(false);
      } else {
        setResult(data);
      }
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
      setSubmitting(false);
    }
  };

  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  // ===== Hasil Kuis =====
  if (result) {
    const percentage = Math.round((result.score / result.total) * 100);
    const isPerfect = result.score === result.total;

    return (
      <div className="min-h-screen" style={{ background: "var(--background)" }}>
        <header
          className="bg-white px-4 sm:px-6 py-4"
          style={{ borderBottom: "1px solid var(--color-line)" }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
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
              <span className="text-sm font-bold" style={{ color: "var(--color-foreground)" }}>
                Hasil Kuis
              </span>
            </div>
            <Link href={backHref} className="text-sm" style={{ color: "var(--color-muted)" }}>
              ← Kembali
            </Link>
          </div>
        </header>

        <main className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
          {/* Score card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-8 text-center mb-6"
            style={{ border: `1px solid ${isPerfect ? "var(--color-success)" : "var(--color-line)"}` }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: "var(--color-muted)" }}>
              {quiz.name}
            </p>
            <motion.p
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "52px",
                fontWeight: 700,
                color: isPerfect ? "var(--color-success)" : "var(--color-primary)",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {result.score}/{result.total}
            </motion.p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              {percentage}% benar
              {isPerfect && (
                <span
                  className="ml-2 font-semibold"
                  style={{ color: "var(--color-success)" }}
                >
                  · Sempurna! 🎉
                </span>
              )}
            </p>

            {/* Progress bar skor */}
            <div
              className="w-full rounded-full overflow-hidden mt-4"
              style={{ height: "6px", background: "var(--color-line)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  height: "100%",
                  background: isPerfect ? "var(--color-success)" : "var(--color-primary)",
                  borderRadius: "999px",
                }}
              />
            </div>
          </motion.div>

          {/* Pembahasan */}
          <div className="space-y-4">
            {result.results.map((r, idx) => (
              <motion.div
                key={r.questionId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.07 }}
                className="bg-white rounded-2xl p-5"
                style={{ border: "1px solid var(--color-line)" }}
              >
                <p
                  className="font-semibold mb-3 text-sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {idx + 1}. {r.text}
                </p>
                <div className="space-y-2 mb-3">
                  {Object.entries(r.options).map(([key, text]) => {
                    let bg = "transparent";
                    let border = "var(--color-line)";
                    let color = "var(--color-foreground)";

                    if (key === r.correctAnswer) {
                      bg = "var(--color-success-tint)";
                      border = "var(--color-success)";
                      color = "var(--color-success)";
                    } else if (key === r.userAnswer && !r.isCorrect) {
                      bg = "var(--color-danger-tint)";
                      border = "var(--color-danger)";
                      color = "var(--color-danger)";
                    }

                    return (
                      <div
                        key={key}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                        style={{ background: bg, border: `1px solid ${border}`, color }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            fontSize: "11px",
                            fontWeight: 700,
                            minWidth: "16px",
                          }}
                        >
                          {key}
                        </span>
                        <span style={{ flex: 1 }}>{text}</span>
                        {key === r.correctAnswer && (
                          <span style={{ fontSize: "12px", fontWeight: 700 }}>✓</span>
                        )}
                        {key === r.userAnswer && !r.isCorrect && (
                          <span style={{ fontSize: "12px", fontWeight: 700 }}>✗</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {!r.userAnswer && (
                  <p className="text-xs mb-2" style={{ color: "var(--color-warning)" }}>
                    ⚠ Soal ini tidak dijawab
                  </p>
                )}
                {r.explanation && (
                  <div
                    className="text-xs px-3 py-2.5 rounded-lg"
                    style={{
                      background: "var(--color-primary-tint)",
                      color: "var(--color-primary-dark)",
                      lineHeight: 1.6,
                    }}
                  >
                    💡 {r.explanation}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex gap-3"
          >
            <Link
              href={backHref}
              className="flex-1 text-center py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
              style={{ background: "var(--color-primary)" }}
            >
              Kembali ke Daftar Kuis
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  // ===== Halaman Kuis =====
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <header
        className="bg-white px-4 sm:px-6 py-4"
        style={{ borderBottom: "1px solid var(--color-line)" }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1
              className="font-bold truncate"
              style={{ fontSize: "15px", color: "var(--color-foreground)" }}
            >
              {quiz.name}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "11px",
                color: "var(--color-muted)",
                marginTop: "2px",
              }}
            >
              {currentIndex + 1}/{questions.length}
            </p>
          </div>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="text-sm shrink-0"
            style={{ color: "var(--color-muted)" }}
          >
            <span className="hidden sm:inline">Keluar dari Kuis</span>
            <span className="sm:hidden">Keluar</span>
          </button>
        </div>

        {/* Progress bar */}
        <div
          className="max-w-2xl mx-auto mt-3 rounded-full overflow-hidden"
          style={{ height: "3px", background: "var(--color-line)" }}
        >
          <motion.div
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            style={{
              height: "100%",
              background: "var(--color-primary)",
              borderRadius: "999px",
            }}
          />
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-6 flex flex-col items-center">
        {/* Navigator soal */}
        <div className="w-full max-w-2xl flex flex-wrap gap-2 mb-5">
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <motion.button
                key={q.id}
                onClick={() => goTo(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontFamily: "var(--font-jetbrains)",
                  fontWeight: 600,
                  border: isCurrent
                    ? "2px solid var(--color-primary)"
                    : isAnswered
                    ? "1px solid var(--color-success)"
                    : "1px solid var(--color-line)",
                  background: isAnswered
                    ? "var(--color-success-tint)"
                    : "white",
                  color: isAnswered
                    ? "var(--color-success)"
                    : isCurrent
                    ? "var(--color-primary)"
                    : "var(--color-muted)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {idx + 1}
              </motion.button>
            );
          })}
        </div>

        {/* Kartu soal */}
        <div className="w-full max-w-2xl flex-1 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 30 }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d * -30 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-6 flex-1"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <p
                className="font-semibold mb-5 leading-relaxed"
                style={{ fontSize: "15px", color: "var(--color-foreground)" }}
              >
                {currentQuestion.text}
              </p>

              <div className="space-y-2.5">
                {options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.key;
                  return (
                    <motion.button
                      key={opt.key}
                      onClick={() => handleSelect(opt.key)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all"
                      style={{
                        border: `1.5px solid ${isSelected ? "var(--color-primary)" : "var(--color-line)"}`,
                        background: isSelected ? "var(--color-primary-tint)" : "white",
                        color: isSelected ? "var(--color-primary-dark)" : "var(--color-foreground)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          fontSize: "11px",
                          fontWeight: 700,
                          minWidth: "16px",
                          color: isSelected ? "var(--color-primary)" : "var(--color-muted)",
                        }}
                      >
                        {opt.key}
                      </span>
                      {opt.text}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigasi */}
          <div className="flex items-center justify-between mt-4 pb-4">
            <motion.button
              onClick={goPrev}
              disabled={currentIndex === 0}
              whileHover={{ x: -2 }}
              className="text-sm font-medium disabled:opacity-30"
              style={{ color: "var(--color-muted)" }}
            >
              ← Sebelumnya
            </motion.button>

            {!isLast ? (
              <motion.button
                onClick={goNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "var(--color-primary)" }}
              >
                Selanjutnya →
              </motion.button>
            ) : (
              <motion.button
                onClick={handleFinishClick}
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: "var(--color-success)" }}
              >
                {submitting ? "Menilai..." : `Selesai (${answeredCount}/${questions.length})`}
              </motion.button>
            )}
          </div>
        </div>
      </main>

      {/* Modal konfirmasi submit */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ background: "rgba(27,26,46,0.4)", zIndex: 50 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <h3
                className="font-bold mb-1"
                style={{ fontSize: "15px", color: "var(--color-foreground)" }}
              >
                Masih ada soal belum dijawab
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
                Soal nomor{" "}
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "var(--color-warning)",
                    fontWeight: 600,
                  }}
                >
                  {unansweredIndices.map((i) => i + 1).join(", ")}
                </span>{" "}
                belum dijawab. Tetap kumpulkan?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    goTo(unansweredIndices[0]);
                  }}
                  className="flex-1 text-sm font-medium py-2.5 rounded-xl"
                  style={{
                    border: "1px solid var(--color-line)",
                    color: "var(--color-foreground)",
                  }}
                >
                  Kembali ke Soal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 text-sm font-semibold py-2.5 rounded-xl text-white disabled:opacity-50"
                  style={{ background: "var(--color-success)" }}
                >
                  {submitting ? "Menilai..." : "Tetap Kumpulkan"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal konfirmasi keluar */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ background: "rgba(27,26,46,0.4)", zIndex: 50 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <h3
                className="font-bold mb-1"
                style={{ fontSize: "15px", color: "var(--color-foreground)" }}
              >
                Keluar dari kuis?
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
                Progress jawaban yang sudah kamu isi{" "}
                <span style={{ color: "var(--color-danger)", fontWeight: 600 }}>
                  tidak akan disimpan
                </span>{" "}
                dan akan hilang jika kamu keluar sekarang.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 text-sm font-medium py-2.5 rounded-xl"
                  style={{
                    border: "1px solid var(--color-line)",
                    color: "var(--color-foreground)",
                  }}
                >
                  Lanjutkan Kuis
                </button>
                <Link
                  href={backHref}
                  className="flex-1 text-sm font-semibold py-2.5 rounded-xl text-white text-center"
                  style={{ background: "var(--color-danger)" }}
                >
                  Ya, Keluar
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}