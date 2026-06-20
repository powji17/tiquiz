"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const baseNavLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "Riwayat" },
  { href: "/profile", label: "Profil" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks =
    session?.user?.role === "ADMIN"
      ? [...baseNavLinks, { href: "/admin", label: "Panel Admin" }]
      : baseNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
        setMenuOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-40 px-6 py-4"
      style={{
        borderBottom: "1px solid var(--color-line)",
        background: "var(--background)",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
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
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/admin" && pathname.startsWith("/admin"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{ color: isActive ? "var(--color-primary)" : "var(--color-muted)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-bg"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--color-primary-tint)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          <div
            className="mx-2"
            style={{ width: "1px", height: "16px", background: "var(--color-line)" }}
          />

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{ color: "var(--color-danger)" }}
          >
            Keluar
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
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
            <div
              className="pt-3 pb-1 flex flex-col gap-1 max-w-5xl mx-auto"
              style={{ borderTop: "1px solid var(--color-line)", marginTop: "12px" }}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="relative px-3 py-2 rounded-lg text-sm font-medium"
                    style={{
                      color: isActive ? "var(--color-primary)" : "var(--color-muted)",
                      background: isActive ? "var(--color-primary-tint)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-3 py-2 rounded-lg text-sm font-medium text-left"
                style={{ color: "var(--color-danger)" }}
              >
                Keluar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}