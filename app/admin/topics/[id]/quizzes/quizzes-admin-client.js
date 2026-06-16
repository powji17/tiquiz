"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function QuizzesAdminClient({ topic, initialQuizzes }) {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const openCreateForm = () => {
    setEditingQuiz(null);
    setName("");
    setDescription("");
    setShowForm(true);
  };

  const openEditForm = (quiz) => {
    setEditingQuiz(quiz);
    setName(quiz.name);
    setDescription(quiz.description || "");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingQuiz(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingQuiz ? `/api/admin/quizzes/${editingQuiz.id}` : "/api/admin/quizzes";
      const method = editingQuiz ? "PUT" : "POST";
      const body = editingQuiz
        ? { name, description }
        : { topicId: topic.id, name, description };

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

      if (editingQuiz) {
        setQuizzes((prev) => prev.map((q) => (q.id === editingQuiz.id ? { ...q, ...data } : q)));
        toast.success("Kuis berhasil diperbarui!");
      } else {
        setQuizzes((prev) => [...prev, data]);
        toast.success("Kuis berhasil ditambahkan!");
      }

      closeForm();
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (quiz) => {
    if (quiz._count.questions > 0) {
      toast.error("Hapus semua soal di kuis ini terlebih dahulu.");
      return;
    }

    if (!confirm(`Hapus kuis "${quiz.name}"?`)) return;

    setDeletingId(quiz.id);

    try {
      const res = await fetch(`/api/admin/quizzes/${quiz.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal menghapus kuis.");
      } else {
        setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
        toast.success("Kuis berhasil dihapus.");
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

  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/topics" className="text-sm" style={{ color: "var(--color-muted)" }}>
            ← Kelola Topik
          </Link>
          <h1 className="text-xl font-bold mt-1" style={{ color: "var(--color-foreground)" }}>
            Kuis · {topic.name}
          </h1>
        </div>
        <motion.button
          onClick={openCreateForm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          + Tambah Kuis
        </motion.button>
      </div>

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
                {editingQuiz ? "Edit Kuis" : "Tambah Kuis Baru"}
              </h3>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Nama Kuis
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={inputStyle}
                  placeholder="Contoh: Manajemen Memori"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Deskripsi
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={inputStyle}
                  placeholder="Contoh: Paging, Segmentasi, Virtual Memory"
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

      <div className="space-y-2">
        {quizzes.length === 0 ? (
          <p className="text-sm text-center py-10" style={{ color: "var(--color-muted)" }}>
            Belum ada kuis di topik ini. Klik "Tambah Kuis" untuk membuat yang pertama.
          </p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate" style={{ color: "var(--color-foreground)" }}>
                  {quiz.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                  {quiz.description || "Tanpa deskripsi"} ·{" "}
                  <span style={{ fontFamily: "var(--font-jetbrains)" }}>
                    {quiz._count.questions} soal
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 ml-3 shrink-0">
                <Link
                  href={`/admin/quizzes/${quiz.id}/questions`}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  Kelola Soal
                </Link>
                <button
                  onClick={() => openEditForm(quiz)}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-muted)" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(quiz)}
                  disabled={deletingId === quiz.id}
                  className="text-xs font-medium disabled:opacity-50"
                  style={{ color: "var(--color-danger)" }}
                >
                  {deletingId === quiz.id ? "..." : "Hapus"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}