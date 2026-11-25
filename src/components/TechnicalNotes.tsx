"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookMarked,
  Clock,
  Terminal,
  X,
} from "lucide-react";
import { TECHNICAL_NOTES, type TechnicalNote } from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

export function TechnicalNotes() {
  const { roleLens } = useApp();
  const [activeNote, setActiveNote] = useState<TechnicalNote | null>(null);

  const orderedNotes = useMemo(() => {
    return [...TECHNICAL_NOTES].sort(
      (a, b) => b.lensRelevance[roleLens] - a.lensRelevance[roleLens]
    );
  }, [roleLens]);

  useEffect(() => {
    if (!activeNote) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveNote(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeNote]);

  return (
    <section
      id="notes"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            <BookMarked className="h-3.5 w-3.5" />
            Research Notes & Engineering Logs
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            Technical Deep-Dives
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Architectural notes, distributed training post-mortems, and
            clinical computer vision design logs.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {orderedNotes.map((note) => {
            const isPriority =
              roleLens !== "all" && note.lensRelevance[roleLens] >= 95;
            return (
              <motion.article
                layout
                key={note.id}
                onClick={() => setActiveNote(note)}
                className={cn(
                  "surface-card group flex cursor-pointer flex-col justify-between rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40",
                  isPriority && "ring-1 ring-indigo-500/35"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="rounded-md border border-indigo-500/25 bg-indigo-500/10 px-2 py-0.5 text-indigo-700 dark:text-indigo-300">
                      {note.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {note.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug text-zinc-950 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {note.subtitle}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t hairline-border pt-4">
                  <span className="font-mono text-[11px] text-zinc-500">
                    {note.date}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    Read Log
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* MDX-Styled Technical Reader Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveNote(null)}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="surface-card flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b hairline-border px-6 py-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="text-cyan-600 dark:text-cyan-400">
                      {activeNote.category}
                    </span>
                    <span>·</span>
                    <span>{activeNote.date}</span>
                    <span>·</span>
                    <span>{activeNote.readTime}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white sm:text-xl">
                    {activeNote.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveNote(null)}
                  aria-label="Close article"
                  className="rounded-lg border hairline-border p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                <p className="text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {activeNote.subtitle}
                </p>

                {activeNote.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-base font-semibold text-zinc-950 dark:text-white">
                      {section.heading}
                    </h4>
                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300"
                      >
                        {p}
                      </p>
                    ))}
                    {section.callout && (
                      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-xs leading-relaxed text-indigo-900 dark:text-indigo-200">
                        {section.callout}
                      </div>
                    )}
                    {section.code && (
                      <div className="overflow-hidden rounded-xl border hairline-border bg-[#0D0D12] text-zinc-100">
                        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] text-zinc-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                            {section.code.filename}
                          </span>
                          <span>{section.code.language}</span>
                        </div>
                        <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-200">
                          <code>{section.code.snippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex flex-wrap gap-1.5 border-t hairline-border pt-4">
                  {activeNote.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border hairline-border bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-[#181820] dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
