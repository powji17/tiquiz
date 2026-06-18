import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata = {
  title: "TIQuiz",
  description: "TIQuiz membantu kamu menguji pemahaman ilmu komputer lewat kuis interaktif, lengkap dengan pembahasan dan pelacakan progress per topik.",
  metadataBase: new URL("https://tiquiz.vercel.app"),
  openGraph: {
    title: "TIQuiz",
    description: "Belajar lebih terukur, hasil lebih nyata. Kerjakan kuis interaktif dengan pembahasan dan progress tracking per topik.",
    url: "https://tiquiz.vercel.app",
    siteName: "TIQuiz",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TIQuiz",
    description: "Belajar lebih terukur, hasil lebih nyata.",
  },
  verification: {
    google: "Sn-FJdc2L82cUzF8mAzyNIfpaXTq6aSodc-TpwPpn4Y",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
