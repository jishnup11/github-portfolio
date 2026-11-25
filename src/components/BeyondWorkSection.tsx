"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Trophy, Wrench } from "lucide-react";
import { HOBBY_GROUPS, PRODUCTIVITY_TOOLS, type HobbyItem, type ProductivityTool } from "@/data/resume";
import { cn } from "@/lib/utils";

function ToolLogo({ id }: { id: ProductivityTool["id"] }) {
  switch (id) {
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M17.5 2.5L21 4.2v15.6l-3.5 1.7L9 13.7l-4.5 3.4L3 16.3V7.7l1.5-.8L9 10.3l8.5-7.8Z"
            fill="#007ACC"
          />
          <path
            d="M17.5 2.5v19l3.5-1.7V4.2l-3.5-1.7Z"
            fill="#1F9CF0"
          />
          <path
            d="M4.5 6.9L3 7.7v8.6l1.5.8L9 13.7v-3.4L4.5 6.9Z"
            fill="#0065A9"
          />
        </svg>
      );
    case "cursor":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 2.5L20.5 7.4v9.2L12 21.5 3.5 16.6V7.4L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-zinc-800 dark:text-zinc-100"
          />
          <path
            d="M12 2.5v9.5l8.5-4.6M12 12L3.5 7.4M12 12v9.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            className="text-indigo-500 dark:text-cyan-400"
          />
          <path
            d="M12 7.2l4.2 2.4-2.1 1.2 1.8 3.2-1.6.9-1.8-3.2-2.1 1.2V7.2Z"
            fill="currentColor"
            className="text-zinc-900 dark:text-white"
          />
        </svg>
      );
    case "claude-code":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 2.8v4.1M12 17.1v4.1M2.8 12h4.1M17.1 12h4.1M5.5 5.5l2.9 2.9M15.6 15.6l2.9 2.9M18.5 5.5l-2.9 2.9M8.4 15.6l-2.9 2.9"
            stroke="#D97757"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.2" fill="#D97757" />
        </svg>
      );
    case "jupyter":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <ellipse
            cx="12"
            cy="12"
            rx="8.5"
            ry="3.6"
            transform="rotate(-18 12 12)"
            stroke="#F37626"
            strokeWidth="1.7"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="8.5"
            ry="3.6"
            transform="rotate(18 12 12)"
            stroke="#9CA3AF"
            strokeWidth="1.5"
          />
          <circle cx="17.8" cy="5.2" r="1.6" fill="#F37626" />
          <circle cx="6.2" cy="18.8" r="1.4" fill="#6E7681" />
          <circle cx="5.6" cy="7.3" r="1.2" fill="#6E7681" />
        </svg>
      );
    case "antigravity":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="ag-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="55%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <path
            d="M12 3.2L19 19.2c-2.3-1.4-4.7-2.1-7-2.1s-4.7.7-7 2.1L12 3.2Z"
            stroke="url(#ag-grad)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <ellipse
            cx="12"
            cy="13.2"
            rx="8.5"
            ry="2.8"
            transform="rotate(-14 12 13.2)"
            stroke="url(#ag-grad)"
            strokeWidth="1.3"
            strokeDasharray="2.5 2"
          />
          <circle cx="12" cy="9.4" r="1.4" fill="#06B6D4" />
        </svg>
      );
    case "gemini":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="gem-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path
            d="M12 2.2C12.7 7.6 16.4 11.3 21.8 12C16.4 12.7 12.7 16.4 12 21.8C11.3 16.4 7.6 12.7 2.2 12C7.6 11.3 11.3 7.6 12 2.2Z"
            fill="url(#gem-grad)"
          />
        </svg>
      );
  }
}

function HobbyIcon({ id }: { id: HobbyItem["id"] }) {
  switch (id) {
    case "football":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-500" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
          <polygon
            points="12,8 15.2,10.3 14,14.1 10,14.1 8.8,10.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V3.2M15.2 10.3l4.3-1.4M14 14.1l2.7 4.2M10 14.1l-2.7 4.2M8.8 10.3L4.5 8.9"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "cricket":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-500" fill="none" aria-hidden="true">
          <path
            d="M15.8 3.6l4.6 4.6-8.9 8.9-4.6-4.6 8.9-8.9Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 14.8L5.4 18.6M4.2 19.8l1.2-1.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="17.5" cy="17.5" r="2.7" stroke="#EF4444" strokeWidth="1.6" />
          <path d="M15.8 15.8l3.4 3.4" stroke="#EF4444" strokeWidth="1.1" strokeDasharray="1.5 1.2" />
        </svg>
      );
    case "badminton":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-indigo-500" fill="none" aria-hidden="true">
          <path
            d="M15.5 15.5c1.5 1.5 1.5 3.6 0 4.6s-3.6 1-4.6 0l-1.4-1.4 4.6-4.6 1.4 1.4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 18.7L4.2 8.2l3.8-1.4 3.5 9.2M14.1 14.1L12.6 4.2l-4.6 2.6M14.1 14.1l-6.1-7.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "reverse-engineering":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" aria-hidden="true">
          <rect x="6.5" y="6.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "current-affairs":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-500" fill="none" aria-hidden="true">
          <path
            d="M4.5 5.5h12a1.5 1.5 0 0 1 1.5 1.5v11.5H6a1.5 1.5 0 0 1-1.5-1.5V5.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M18 8.5h1.5A1.5 1.5 0 0 1 21 10v7a1.5 1.5 0 0 1-1.5 1.5H18"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect x="7.5" y="8.5" width="7.5" height="3.2" rx="0.6" stroke="currentColor" strokeWidth="1.3" />
          <path
            d="M7.5 14.5h7.5M7.5 16.8h5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function BeyondWorkSection() {
  return (
    <section
      id="beyond-work"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            <Compass className="h-3.5 w-3.5" />
            Workflow &amp; Personal Side
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            Beyond Work: Tools &amp; Interests
          </h2>
        </div>

        {/* Subsection 1 — Productivity Tools */}
        <div className="mt-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              Productivity Tools
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              AI-assisted editors and coding agents are part of my daily
              workflow, compressing the loop from idea to shipped code. They
              accelerate refactors, test generation, notebook exploration, and
              codebase navigation—while keeping architecture decisions and
              production quality in human hands.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTIVITY_TOOLS.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="surface-card group rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border hairline-border bg-zinc-50 transition-colors group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 dark:bg-[#17171F]">
                    <ToolLogo id={tool.id} />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
                    {tool.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subsection 2 — Hobbies */}
        <div className="mt-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Trophy className="h-3.5 w-3.5" />
              Hobbies
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Outside of production AI work, I stay sharp through sports,
              hands-on tinkering, and staying engaged with the world beyond tech.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {HOBBY_GROUPS.map((group, gIdx) => {
              const isSports = group.id === "sports";
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.3, delay: gIdx * 0.05 }}
                  className="surface-card rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between gap-2 border-b hairline-border pb-3">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-950 dark:text-white">
                      {isSports ? (
                        <Trophy className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Wrench className="h-4 w-4 text-cyan-500" />
                      )}
                      {group.title}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        isSports
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                      )}
                    >
                      {group.items.length} Interests
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="surface-elevated group flex items-start gap-3.5 rounded-xl p-4 transition-colors hover:border-indigo-500/35"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border hairline-border bg-white transition-colors group-hover:border-indigo-500/40 dark:bg-[#121218]">
                          <HobbyIcon id={item.id} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
