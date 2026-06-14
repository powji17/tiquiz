"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuizClient({ quiz }) {
  const { questions } = quiz;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

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

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleFinishClick = () => {
    if (unansweredIndices.length > 0) {
      setShowConfirm(true);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId: quiz.id, answers }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan, coba lagi.");
        setSubmitting(false);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Gagal terhubung ke server.");
      setSubmitting(false);
    }
  };

  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  // ===== Hasil Kuis =====
  if (result) {
    const percentage = Math.round((result.score / result.total) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-lg font-bold text-gray-800">{quiz.name} — Hasil Kuis</h1>
        </header>

        <main className="flex-1 p-6 max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Skor Kamu</p>
            <p className="text-4xl font-bold text-blue-600 mb-1">
              {result.score} / {result.total}
            </p>
            <p className="text-sm text-gray-500">{percentage}% benar</p>
          </div>

          <div className="space-y-4">
            {result.results.map((r, idx) => (
              <div key={r.questionId} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                <p className="font-medium text-gray-800 mb-3">
                  {idx + 1}. {r.text}
                </p>
                <div className="space-y-1 mb-3">
                  {Object.entries(r.options).map(([key, text]) => {
                    let style = "border-gray-200";
                    if (key === r.correctAnswer) style = "border-green-500 bg-green-50 text-green-700";
                    if (key === r.userAnswer && !r.isCorrect) style = "border-red-500 bg-red-50 text-red-700";

                    return (
                      <div key={key} className={`px-3 py-2 rounded-lg border text-sm ${style}`}>
                        <span className="font-semibold mr-2">{key}.</span>
                        {text}
                        {key === r.correctAnswer && " ✓"}
                        {key === r.userAnswer && !r.isCorrect && " ✗"}
                      </div>
                    );
                  })}
                </div>
                {!r.userAnswer && (
                  <p className="text-xs text-orange-500 mb-2">
                    ⚠ Soal ini tidak kamu jawab.
                  </p>
                )}
                {r.explanation && (
                  <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    💡 {r.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href={backHref}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-3 rounded-lg transition"
            >
              Kembali ke Daftar Kuis
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ===== Halaman Kuis =====
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">{quiz.name}</h1>
          <p className="text-sm text-gray-500">
            Soal {currentIndex + 1} dari {questions.length}
          </p>
        </div>
        <Link href={backHref} className="text-sm text-gray-500 hover:underline">
          Keluar dari Kuis
        </Link>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center">
        {/* Progress indicator */}
        <div className="w-full max-w-2xl flex flex-wrap gap-2 mb-4">
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-9 rounded-lg text-sm font-medium border transition flex items-center justify-center ${
                  isAnswered
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300"
                } ${isCurrent ? "ring-2 ring-offset-1 ring-blue-400" : ""}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 w-full max-w-2xl">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <p className="text-gray-800 font-medium mb-4">{currentQuestion.text}</p>

          <div className="space-y-2">
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleSelect(opt.key)}
                className={`w-full text-gray-700 text-left px-4 py-3 rounded-lg border text-sm transition ${
                  answers[currentQuestion.id] === opt.key
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="font-semibold mr-2">{opt.key}.</span>
                {opt.text}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="text-sm font-medium text-gray-600 disabled:opacity-40 hover:underline"
            >
              ← Sebelumnya
            </button>

            {!isLast ? (
              <button
                onClick={goNext}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
              >
                Selanjutnya →
              </button>
            ) : (
              <button
                onClick={handleFinishClick}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? "Menilai..." : `Selesai (${answeredCount}/${questions.length})`}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Modal konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Masih ada soal belum dijawab</h3>
            <p className="text-sm text-gray-500 mb-4">
              Soal nomor{" "}
              <span className="font-medium text-gray-700">
                {unansweredIndices.map((i) => i + 1).join(", ")}
              </span>{" "}
              belum kamu jawab. Tetap kumpulkan jawaban?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setCurrentIndex(unansweredIndices[0]);
                }}
                className="flex-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
              >
                Kembali ke Soal
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg py-2 disabled:opacity-50"
              >
                {submitting ? "Menilai..." : "Tetap Kumpulkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}