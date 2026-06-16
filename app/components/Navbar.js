"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "Riwayat" },
  { href: "/profile", label: "Profil" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ borderBottom: "1px solid var(--color-line)" }} className="bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-jetbrains)",
              background: "var(--color-primary-tint)",
              color: "var(--color-primary)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "4px",
              letterSpacing: "0.05em",
            }}
          >
            TQ
          </span>
          <span className="text-base font-bold" style={{ color: "var(--color-foreground)" }}>
            TIQuiz
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium transition-colors"
                style={{ color: isActive ? "var(--color-primary)" : "var(--color-muted)" }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "var(--color-primary)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="cursor-pointer text-sm font-medium transition-colors"
            style={{ color: "var(--color-danger)" }}
          >
            Keluar
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden cursor-pointer"
          aria-label="Menu"
          style={{ color: "var(--color-muted)" }}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden"
          >
            <div className="pt-3 pb-1 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium"
                  style={{
                    color: pathname === link.href ? "var(--color-primary)" : "var(--color-muted)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="cursor-pointer text-sm font-medium text-left"
                style={{ color: "var(--color-danger)" }}
              >
                Keluar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}