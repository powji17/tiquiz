"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
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
              {title}
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--color-muted)", lineHeight: 1.5 }}>
              {description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 text-sm font-medium py-2.5 rounded-xl disabled:opacity-50"
                style={{
                  border: "1px solid var(--color-line)",
                  color: "var(--color-foreground)",
                }}
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 text-sm font-semibold py-2.5 rounded-xl text-white disabled:opacity-50"
                style={{ background: danger ? "var(--color-danger)" : "var(--color-success)" }}
              >
                {loading ? "Memproses..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}