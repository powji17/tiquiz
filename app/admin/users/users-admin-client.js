"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ConfirmModal from "@/app/components/ConfirmModal";

const emptyForm = { name: "", email: "", password: "", role: "USER" };

export default function UsersAdminClient({ initialUsers, currentUserId }) {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("semua");

  const filteredUsers = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => {
      if (filter === "user") return u.role === "USER";
      if (filter === "admin") return u.role === "ADMIN";
      return true;
    });

  const openCreateForm = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: "", role: user.role });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingUser ? `/api/admin/users/${editingUser.id}` : "/api/admin/users";
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Terjadi kesalahan.");
        setSubmitting(false);
        return;
      }

      if (editingUser) {
        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? data : u)));
        toast.success("Pengguna berhasil diperbarui!");
      } else {
        setUsers((prev) => [data, ...prev]);
        toast.success("Pengguna berhasil ditambahkan!");
      }

      closeForm();
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (user) => {
    if (user.id === currentUserId) {
      toast.error("Tidak bisa menghapus akunmu sendiri.");
      return;
    }
    setDeleteTarget(user);
  };

  const confirmDelete = async () => {
    const user = deleteTarget;
    setDeletingId(user.id);

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal menghapus pengguna.");
      } else {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        toast.success("Pengguna dan riwayat kuisnya berhasil dihapus.");
      }
    } catch (err) {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  const inputStyle = {
    border: "1px solid var(--color-line)",
    background: "#FAFAF9",
    color: "var(--color-foreground)",
  };

  return (
    <main className="px-6 py-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-sm mb-1"
            style={{ color: "var(--color-muted)" }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Panel Admin
          </Link>
          <h1 className="text-xl font-bold" style={{ color: "var(--color-foreground)" }}>
            Kelola Pengguna
          </h1>
        </div>
        <motion.button
          onClick={openCreateForm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          + Tambah Pengguna
        </motion.button>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau email..."
          className="rounded-xl px-4 py-2 text-sm outline-none w-full sm:max-w-xs"
          style={{ border: "1px solid var(--color-line)", background: "#FAFAF9", color: "var(--color-foreground)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
        />
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "semua", label: "Semua" },
            { key: "user", label: "USER" },
            { key: "admin", label: "ADMIN" },
          ].map((f) => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: filter === f.key ? "var(--color-primary)" : "white",
                color: filter === f.key ? "white" : "var(--color-muted)",
                border: `1px solid ${filter === f.key ? "var(--color-primary)" : "var(--color-line)"}`,
                fontFamily: f.key !== "semua" ? "var(--font-jetbrains)" : undefined,
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
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
                {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
              </h3>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Nama
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  {editingUser ? "Reset Password (opsional)" : "Password"}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={inputStyle}
                  placeholder={editingUser ? "Kosongkan jika tidak diubah" : "Minimal 6 karakter"}
                  minLength={6}
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-foreground)" }}>
                  Role
                </label>
                <div className="flex gap-2">
                  {["USER", "ADMIN"].map((r) => {
                    const isSelfDowngrade =
                      editingUser?.id === currentUserId && r !== "ADMIN";
                    return (
                      <button
                        key={r}
                        type="button"
                        disabled={isSelfDowngrade}
                        onClick={() => updateField("role", r)}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          border: `1.5px solid ${form.role === r ? "var(--color-primary)" : "var(--color-line)"}`,
                          background: form.role === r ? "var(--color-primary-tint)" : "white",
                          color: form.role === r ? "var(--color-primary-dark)" : "var(--color-muted)",
                        }}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>
                {editingUser?.id === currentUserId && (
                  <p className="text-xs mt-1" style={{ color: "var(--color-warning)" }}>
                    ⚠ Kamu tidak bisa mengubah role akunmu sendiri menjadi USER.
                  </p>
                )}
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

      {/* Daftar pengguna */}
      <div className="space-y-2">
        <AnimatePresence>
        {filteredUsers.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-center py-10"
            style={{ color: "var(--color-muted)" }}
          >
            {search
              ? `Tidak ada pengguna yang cocok dengan "${search}".`
              : filter === "user"
              ? "Belum ada pengguna dengan role USER."
              : filter === "admin"
              ? "Belum ada pengguna dengan role ADMIN."
              : "Belum ada pengguna."}
          </motion.p>
        ) : (
          filteredUsers.map((user, i) => {
          const isSelf = user.id === currentUserId;
          const joinDate = new Date(user.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--color-foreground)" }}>
                    {user.name}
                  </p>
                  {isSelf && (
                    <span
                      className="text-xs font-medium px-1.5 py-0.5 rounded"
                      style={{ background: "var(--color-primary-tint)", color: "var(--color-primary)" }}
                    >
                      Kamu
                    </span>
                  )}
                  <span
                    className="text-xs font-medium px-1.5 py-0.5 rounded"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      background: user.role === "ADMIN" ? "var(--color-success-tint)" : "var(--color-primary-tint)",
                      color: user.role === "ADMIN" ? "var(--color-success)" : "var(--color-muted)",
                    }}
                  >
                    {user.role}
                  </span>
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-muted)" }}>
                  {user.email} · Bergabung {joinDate}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-3 shrink-0">
                <button
                  onClick={() => openEditForm(user)}
                  className="text-xs font-medium"
                  style={{ color: "var(--color-muted)" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  disabled={isSelf}
                  className="text-xs font-medium disabled:opacity-40"
                  style={{ color: "var(--color-danger)" }}
                >
                  Hapus
                </button>
              </div>
            </motion.div>
          );
        })
        )}
        </AnimatePresence>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title={`Hapus pengguna "${deleteTarget?.name}"?`}
        description="Seluruh riwayat pengerjaan kuis milik pengguna ini akan ikut terhapus secara permanen."
        loading={deletingId === deleteTarget?.id}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </main>
  );
}