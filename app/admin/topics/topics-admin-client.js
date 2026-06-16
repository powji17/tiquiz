"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function TopicsAdminClient({ initialTopics }) {
  const [topics, setTopics] = useState(initialTopics);
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const openCreateForm = () => {
    setEditingTopic(null);
    setName("");
    setDescription("");
    setShowForm(true);
  };

  const openEditForm = (topic) => {
    setEditingTopic(topic);
    setName(topic.name);
    setDescription(topic.description || "");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTopic(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingTopic ? `/api/admin/topics/${editingTopic.id}` : "/api/admin/topics";
      const method = editingTopic ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Terjadi kesalahan.");
        setSubmitting(false);
        return;
      }

      if (editingTopic) {
        setTopics((prev) =>
          prev.map((t) => (t.id === editingTopic.id ? { ...t, ...data } : t))
        );
        toast.success("Topik berhasil diperbarui!");
      } else {
        setTopics((prev) => [...prev, { ...data, _count: { quizzes: 0 } }]);
        toast.success("Topik berhasil ditambahkan!");
      }

      closeForm();
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (topic) => {
    if (topic._count.quizzes > 0) {
      toast.error("Hapus semua kuis di topik ini terlebih dahulu.");
      return;
    }

    if (!confirm(`Hapus topik "${topic.name}"?`)) return;

    setDeletingId(topic.id);

    try {
      const res = await fetch(`/api/admin/topics/${topic.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal menghapus topik.");
      } else {
        setTopics((prev) => prev.filter((t) => t.id !== topic.id));
        toast.success("Topik berhasil dihapus.");
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
          <Link href="/admin" className="text-sm" style={{ color: "var(--color-muted)" }}>
            ← Panel Admin
          </Link>
          <h1 className="text-xl font-bold mt-1" style={{ color: "var(--color-foreground)" }}>
            Kelola Topik
          </h1>
        </div>
        <motion.button
          onClick={openCreateForm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "var(--color-primary)" }}
        >
          + Tambah Topik
        </motion.button>
      </div>

      {/* Form tambah/edit */}
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
                {editingTopic ? "Edit Topik" : "Tambah Topik Baru"}
              </h3>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Nama Topik
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={inputStyle}
                  placeholder="Contoh: Sistem Operasi"
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
                  placeholder="Contoh: Proses, Memori, Penjadwalan"
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

      {/* Daftar topik */}
      <div className="space-y-2">
        {topics.length === 0 ? (
          <p className="text-sm text-center py-10" style={{ color: "var(--color-muted)" }}>
            Belum ada topik. Klik "Tambah Topik" untuk membuat yang pertama.
          </p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate" style={{ color: "var(--color-foreground)" }}>
                  {topic.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                  {topic.description || "Tanpa deskripsi"} ·{" "}
                  <span style={{ fontFamily: "var(--font-jetbrains)" }}>
                    {topic._count.quizzes} kuis
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 ml-3 shrink-0">
                <Link
                  href={`/admin/topics/${topic.id}/quizzes`}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  Kelola Kuis
                </Link>
                <button
                  onClick={() => openEditForm(topic)}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-muted)" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(topic)}
                  disabled={deletingId === topic.id}
                  className="text-xs font-medium disabled:opacity-50"
                  style={{ color: "var(--color-danger)" }}
                >
                  {deletingId === topic.id ? "..." : "Hapus"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}