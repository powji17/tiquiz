"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
        {children}
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </ThemeProvider>
    </SessionProvider>
  );
}