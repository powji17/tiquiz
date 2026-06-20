"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function LandingNavbar() {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div style={{ height: "72px" }} />
      <motion.div
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6"
      >
        <nav
          className="mx-auto max-w-5xl rounded-2xl px-5 py-3"
          style={{
            background: "var(--background)",
            border: "1px solid var(--color-line)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
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
              <span className="text-base font-bold" style={{ color: "var(--color-foreground)" }}>
                TIQuiz
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {session ? (
                <>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/dashboard"
                      className="text-sm font-semibold px-4 py-2 rounded-lg text-white inline-block"
                      style={{ background: "var(--color-primary)" }}
                    >
                      Buka Dashboard
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Masuk
                  </Link>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/register"
                      className="text-sm font-semibold px-4 py-2 rounded-lg text-white inline-block"
                      style={{ background: "var(--color-primary)" }}
                    >
                      Daftar
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </nav>
      </motion.div>
    </>
  );
}