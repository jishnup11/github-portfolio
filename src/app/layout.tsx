import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppProvider } from "@/components/AppContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jishnu P — AI & Deep Learning Scientist | Agentic AI & Computer Vision",
  description:
    "Portfolio of Jishnu P, AI & Deep Learning Scientist with 4.3+ years building Agentic RAG systems (LangGraph, Gemini, Pinecone), distributed PyTorch DDP pipelines (500+ hrs, 4x A100/H100), and patented medical CV (AFSegGAN, 93.11% Dice, PLOS One).",
  keywords: [
    "Jishnu P",
    "AI Scientist",
    "Deep Learning Scientist",
    "Agentic AI",
    "LangGraph",
    "PyTorch DDP",
    "AFSegGAN",
    "Computer Vision",
    "Research Scientist",
    "ML Engineer",
  ],
  openGraph: {
    title: "Jishnu P — AI & Deep Learning Scientist",
    description:
      "Production Agentic RAG, Distributed Multimodal AI (4x A100/H100 PyTorch DDP), and Patented Medical Computer Vision (AFSegGAN, 93.11% Dice).",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jishnu P — AI & Deep Learning Scientist",
    description:
      "Agentic AI, Distributed Multimodal Pipelines, and Peer-Reviewed Medical CV Research.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
