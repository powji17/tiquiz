"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const emptyForm = {
  text: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "A",
  explanation: "",
};

export default function QuestionsAdminClient({ quiz, initialQuestions }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const openCreateForm = () => {
    setEditingQuestion(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (q) => {
    setEditingQuestion(q);
    setForm({
      text: q.text,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingQuestion(null);
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingQuestion
        ? `/api/admin/questions/${editingQuestion.id}`
        : "/api/admin/questions";
      const method = editingQuestion ? "PUT" : "POST";
      const body = editingQuestion ? form : { ...form, quizId: quiz.id };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Terjadi kesalahan.");
        setSubmitting(false);
        return;
      }

      if (editingQuestion) {
        setQuestions((prev) => prev.map((q) => (q.id === editingQuestion.id ? data : q)));
        toast.success("Soal berhasil diperbarui!");
      } else {
        setQuestions((prev) => [...prev, data]);
        toast.success("Soal berhasil ditambahkan!");
      }

      closeForm();
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (question) => {
    if (!confirm("Hapus soal ini?")) return;

    setDeletingId(question.id);

    try {
      const res = await fetch(`/api/admin/questions/${question.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal menghapus soal.");
      } else {
        setQuestions((prev) => prev.filter((q) => q.id !== question.id));
        toast.success("Soal berhasil dihapus.");
      }
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setDeletingId(null);
    }
  };

  const inputStyle = {
    border: "1px solid var(--color-line)",
    background: "#FAFAF9",
    color: "var(--color-foreground)",
  };

  const optionFields = [
    { key: "optionA", label: "Opsi A" },
    { key: "optionB", label: "Opsi B" },
    { key: "optionC", label: "Opsi C" },
    { key: "optionD", label: "Opsi D" },
  ];

  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href={`/admin/topics/${quiz.topicId}/quizzes`}
            className="inline-flex items-center gap-1 text-sm mb-1"
            style={{ color: "var(--color-muted)" }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kuis · {quiz.topicName}
          </Link>
          <h1 className="text-xl font-bold" style={{ color: "var(--color-foreground)" }}>
            Soal · {quiz.name}
          </h1>
        </div>
        <motion.button
          onClick={openCreateForm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          + Tambah Soal
        </motion.button>
      </motion.div>

      {/* Form tambah/edit soal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-4"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-5 space-y-3"
              style={{ border: "1px solid var(--color-primary)" }}
            >
              <h3 className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>
                {editingQuestion ? "Edit Soal" : "Tambah Soal Baru"}
              </h3>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Pertanyaan
                </label>
                <textarea
                  value={form.text}
                  onChange={(e) => updateField("text", e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
                  style={inputStyle}
                  rows={2}
                  placeholder="Tulis pertanyaan di sini..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {optionFields.map((opt) => (
                  <div key={opt.key}>
                    <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                      {opt.label}
                    </label>
                    <input
                      type="text"
                      value={form[opt.key]}
                      onChange={(e) => updateField(opt.key, e.target.value)}
                      className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                      style={inputStyle}
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Jawaban Benar
                </label>
                <div className="flex gap-2">
                  {["A", "B", "C", "D"].map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateField("correctAnswer", key)}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        border: `1.5px solid ${
                          form.correctAnswer === key ? "var(--color-success)" : "var(--color-line)"
                        }`,
                        background: form.correctAnswer === key ? "var(--color-success-tint)" : "white",
                        color: form.correctAnswer === key ? "var(--color-success)" : "var(--color-muted)",
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Pembahasan (opsional)
                </label>
                <textarea
                  value={form.explanation}
                  onChange={(e) => updateField("explanation", e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
                  style={inputStyle}
                  rows={2}
                  placeholder="Jelaskan mengapa jawaban tersebut benar..."
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: "var(--color-primary)" }}
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ border: "1px solid var(--color-line)", color: "var(--color-foreground)" }}
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daftar soal */}
      <div className="space-y-3">
        <AnimatePresence>
        {questions.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-center py-10"
            style={{ color: "var(--color-muted)" }}
          >
            Belum ada soal di kuis ini. Klik "Tambah Soal" untuk membuat yang pertama.
          </motion.p>
        ) : (
          questions.map((q, idx) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-2xl p-4"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-semibold text-sm flex-1" style={{ color: "var(--color-foreground)" }}>
                  {idx + 1}. {q.text}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditForm(q)}
                    className="text-xs font-medium"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q)}
                    disabled={deletingId === q.id}
                    className="text-xs font-medium disabled:opacity-50"
                    style={{ color: "var(--color-danger)" }}
                  >
                    {deletingId === q.id ? "..." : "Hapus"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {["A", "B", "C", "D"].map((key) => {
                  const optionText = q[`option${key}`];
                  const isCorrect = q.correctAnswer === key;
                  return (
                    <div
                      key={key}
                      className="px-2.5 py-1.5 rounded-lg"
                      style={{
                        background: isCorrect ? "var(--color-success-tint)" : "#FAFAF9",
                        color: isCorrect ? "var(--color-success)" : "var(--color-muted)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-jetbrains)", fontWeight: 700 }}>{key}.</span>{" "}
                      {optionText} {isCorrect && "✓"}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))
        )}
        </AnimatePresence>
      </div>
    </main>
  );
}