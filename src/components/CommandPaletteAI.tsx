"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Command,
  Copy,
  Download,
  Loader2,
  Moon,
  Search,
  Send,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import {
  PERSONAL_INFO,
  QUICK_AI_PROMPTS,
  ROLE_LENSES,
} from "@/data/resume";
import { runDeterministicRag, type RagResponse } from "@/lib/rag";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { label: string; href: string }[];
  mode?: RagResponse["mode"];
}

export function CommandPaletteAI() {
  const {
    commandOpen,
    setCommandOpen,
    initialAiPrompt,
    clearInitialAiPrompt,
    theme,
    toggleTheme,
    roleLens,
    setRoleLens,
    showToast,
  } = useApp();

  const [tab, setTab] = useState<"ai" | "commands">("ai");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi — I'm Jishnu's portfolio assistant. Ask me about his Agentic RAG Copilot, PyTorch DDP scaling on 4x A100/H100s, his healthcare CV patent, or his PLOS One AFSegGAN paper (93.11% Dice).",
      sources: [
        { label: "Flagship Systems", href: "#projects" },
        { label: "Research Vault", href: "#research" },
      ],
      mode: "deterministic-rag",
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const askQuestion = useCallback(async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;

    setTab("ai");
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: query,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      let payload: RagResponse;
      if (res.ok) {
        payload = (await res.json()) as RagResponse;
      } else {
        payload = runDeterministicRag(query);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: payload.answer,
          sources: payload.sources,
          mode: payload.mode,
        },
      ]);
    } catch {
      const fallback = runDeterministicRag(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: fallback.answer,
          sources: fallback.sources,
          mode: fallback.mode,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (commandOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [commandOpen]);

  useEffect(() => {
    if (commandOpen && initialAiPrompt) {
      void askQuestion(initialAiPrompt);
      clearInitialAiPrompt();
    }
  }, [commandOpen, initialAiPrompt, askQuestion, clearInitialAiPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!commandOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commandOpen, setCommandOpen]);

  const jumpTo = (href: string) => {
    setCommandOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      showToast("Email copied to clipboard");
      setCommandOpen(false);
    } catch {
      showToast("Copy failed", "info");
    }
  };

  const filteredQuickCommands = [
    {
      label: "Jump to Flagship Systems & Architectures",
      shortcut: "Section",
      action: () => jumpTo("#projects"),
    },
    {
      label: "Jump to Work Experience Timeline",
      shortcut: "Section",
      action: () => jumpTo("#experience"),
    },
    {
      label: "Jump to Research & Publications Vault",
      shortcut: "Section",
      action: () => jumpTo("#research"),
    },
    {
      label: "Jump to Built Outside Work Projects",
      shortcut: "Section",
      action: () => jumpTo("#outside-work"),
    },
    {
      label: "Jump to Technical Deep-Dives / Notes",
      shortcut: "Section",
      action: () => jumpTo("#notes"),
    },
    {
      label: "Jump to Beyond Work: Tools & Interests",
      shortcut: "Section",
      action: () => jumpTo("#beyond-work"),
    },
    {
      label: `Toggle ${theme === "dark" ? "Light" : "Dark"} Theme`,
      shortcut: "Theme",
      action: () => {
        toggleTheme();
        setCommandOpen(false);
      },
    },
    {
      label: `Copy Email (${PERSONAL_INFO.email})`,
      shortcut: "Copy",
      action: copyEmail,
    },
  ].filter(
    (cmd) =>
      tab === "commands" &&
      (!input.trim() ||
        cmd.label.toLowerCase().includes(input.trim().toLowerCase()))
  );

  return (
    <>
      {/* Floating Launcher Pill */}
      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        aria-label="Open Ask Jishnu's AI Command Palette"
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-indigo-500/35 bg-white/90 px-3.5 py-2 text-xs font-medium text-zinc-900 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] hover:border-indigo-500/60 dark:bg-[#121218]/90 dark:text-zinc-100"
      >
        <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
        <span>Ask Jishnu&apos;s AI</span>
        <kbd className="rounded border hairline-border px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
          ⌘K
        </kbd>
      </button>

      {/* Command Palette + AI Chat Modal */}
      <AnimatePresence>
        {commandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandOpen(false)}
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/70 p-3 pt-12 backdrop-blur-sm sm:p-6 sm:pt-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="surface-card flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl"
            >
              {/* Header & Mode Switch */}
              <div className="flex items-center justify-between gap-2 border-b hairline-border px-4 py-3">
                <div className="flex items-center gap-1 rounded-xl border hairline-border bg-zinc-100/80 p-1 dark:bg-[#0D0D11]">
                  <button
                    type="button"
                    onClick={() => setTab("ai")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-colors",
                      tab === "ai"
                        ? "bg-white text-zinc-950 shadow-sm dark:bg-[#1A1A22] dark:text-white"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                    Ask Jishnu&apos;s AI
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("commands")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-colors",
                      tab === "commands"
                        ? "bg-white text-zinc-950 shadow-sm dark:bg-[#1A1A22] dark:text-white"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                    )}
                  >
                    <Command className="h-3.5 w-3.5 text-indigo-500" />
                    Quick Commands
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setCommandOpen(false)}
                  aria-label="Close command palette"
                  className="rounded-lg border hairline-border p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {tab === "ai" ? (
                <>
                  {/* Quick Recruiter Prompts */}
                  <div className="border-b hairline-border bg-zinc-50/70 px-4 py-2.5 dark:bg-[#0D0D11]">
                    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      Quick Recruiter Prompts
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_AI_PROMPTS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => void askQuestion(p)}
                          className="rounded-lg border hairline-border bg-white px-2.5 py-1 text-[11px] text-zinc-700 transition-colors hover:border-indigo-500/40 hover:text-indigo-600 dark:bg-[#16161D] dark:text-zinc-300 dark:hover:text-indigo-300"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chat History */}
                  <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-3",
                          msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {msg.role === "assistant" && (
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-500">
                            <Bot className="h-4 w-4" />
                          </span>
                        )}

                        <div
                          className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed sm:text-sm",
                            msg.role === "user"
                              ? "bg-indigo-600 text-white"
                              : "surface-elevated text-zinc-800 dark:text-zinc-200"
                          )}
                        >
                          <div className="whitespace-pre-line">
                            {msg.content}
                          </div>

                          {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t hairline-border pt-2">
                              <span className="font-mono text-[10px] text-zinc-500">
                                {msg.mode === "gemini"
                                  ? "Gemini + Resume:"
                                  : "Verified Sources:"}
                              </span>
                              {msg.sources.map((src) => (
                                <button
                                  key={src.label}
                                  type="button"
                                  onClick={() => jumpTo(src.href)}
                                  className="inline-flex items-center gap-1 rounded border hairline-border bg-white/80 px-2 py-0.5 font-mono text-[10px] text-indigo-600 hover:border-indigo-500/40 dark:bg-[#121216] dark:text-indigo-300"
                                >
                                  {src.label}
                                  <ArrowRight className="h-2.5 w-2.5" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {msg.role === "user" && (
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border hairline-border bg-zinc-100 text-zinc-600 dark:bg-[#181820] dark:text-zinc-300">
                            <User className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    ))}

                    {loading && (
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                        Retrieving verified resume context...
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void askQuestion(input);
                    }}
                    className="flex items-center gap-2 border-t hairline-border p-3"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Jishnu's PyTorch DDP, AFSegGAN, Patent, or LangGraph..."
                      className="flex-1 bg-transparent px-2 py-1.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Ask
                    </button>
                  </form>
                </>
              ) : (
                <>
                  {/* Command Search Input */}
                  <div className="flex items-center gap-2.5 border-b hairline-border px-4 py-3">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Search sections, switch lens, or trigger actions..."
                      className="flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                    />
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    {/* Role Lens Switcher inside Palette */}
                    <div>
                      <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Switch Recruiter Role Lens
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {ROLE_LENSES.map((lens) => (
                          <button
                            key={lens.id}
                            type="button"
                            onClick={() => {
                              setRoleLens(lens.id);
                              showToast(`Lens: ${lens.label}`, "info");
                              setCommandOpen(false);
                            }}
                            className={cn(
                              "rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors",
                              roleLens === lens.id
                                ? "border-indigo-500/45 bg-indigo-500/10 text-indigo-700 dark:text-indigo-200"
                                : "hairline-border text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                            )}
                          >
                            {lens.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation & Utility Actions */}
                    <div>
                      <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                        Navigation & Utilities
                      </div>
                      <div className="space-y-1.5">
                        {filteredQuickCommands.map((cmd) => (
                          <button
                            key={cmd.label}
                            type="button"
                            onClick={cmd.action}
                            className="flex w-full items-center justify-between rounded-xl border hairline-border px-3.5 py-2.5 text-left text-xs font-medium text-zinc-800 transition-colors hover:border-indigo-500/40 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-[#17171E]"
                          >
                            <span className="inline-flex items-center gap-2">
                              {cmd.shortcut === "Theme" ? (
                                theme === "dark" ? (
                                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                                ) : (
                                  <Moon className="h-3.5 w-3.5 text-indigo-500" />
                                )
                              ) : cmd.shortcut === "Copy" ? (
                                <Copy className="h-3.5 w-3.5 text-emerald-500" />
                              ) : (
                                <ArrowRight className="h-3.5 w-3.5 text-cyan-500" />
                              )}
                              {cmd.label}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-400">
                              {cmd.shortcut}
                            </span>
                          </button>
                        ))}
                        <a
                          href={PERSONAL_INFO.resumePdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setCommandOpen(false)}
                          className="flex w-full items-center justify-between rounded-xl border hairline-border px-3.5 py-2.5 text-left text-xs font-medium text-zinc-800 transition-colors hover:border-emerald-500/40 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-[#17171E]"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Download className="h-3.5 w-3.5 text-emerald-500" />
                            Download Resume PDF
                          </span>
                          <span className="font-mono text-[10px] text-zinc-400">
                            PDF
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
