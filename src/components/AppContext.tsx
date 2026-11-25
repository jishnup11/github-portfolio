"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import type { RoleLens } from "@/data/resume";

type ThemeMode = "dark" | "light";

interface ToastItem {
  id: string;
  message: string;
  tone?: "success" | "info";
}

interface AppContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  roleLens: RoleLens;
  setRoleLens: (lens: RoleLens) => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  initialAiPrompt: string | null;
  openAiWithPrompt: (prompt: string) => void;
  clearInitialAiPrompt: () => void;
  showToast: (message: string, tone?: "success" | "info") => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [roleLens, setRoleLens] = useState<RoleLens>("all");
  const [commandOpen, setCommandOpen] = useState(false);
  const [initialAiPrompt, setInitialAiPrompt] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (window.localStorage.getItem("jp-theme") as ThemeMode | null)
        : null;
    const activeTheme: ThemeMode = stored === "light" ? "light" : "dark";
    setTheme(activeTheme);
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, []);

  const showToast = useCallback(
    (message: string, tone: "success" | "info" = "success") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    },
    []
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ThemeMode = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem("jp-theme", next);
      return next;
    });
  }, []);

  const openAiWithPrompt = useCallback((prompt: string) => {
    setInitialAiPrompt(prompt);
    setCommandOpen(true);
  }, []);

  const clearInitialAiPrompt = useCallback(() => {
    setInitialAiPrompt(null);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        roleLens,
        setRoleLens,
        commandOpen,
        setCommandOpen,
        initialAiPrompt,
        openAiWithPrompt,
        clearInitialAiPrompt,
        showToast,
      }}
    >
      {children}

      {/* Global Toast Stack */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-black/10 bg-white/95 px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#16161C]/95 dark:text-zinc-100"
            >
              {toast.tone === "info" ? (
                <Info className="h-4 w-4 text-indigo-500" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              )}
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}
