"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import {
  HERO_METRICS,
  PERSONAL_INFO,
  ROLE_LENSES,
  type RoleLens,
} from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { roleLens, setRoleLens, setCommandOpen, showToast } = useApp();

  const activeLensMeta = useMemo(
    () => ROLE_LENSES.find((r) => r.id === roleLens) ?? ROLE_LENSES[0],
    [roleLens]
  );

  const orderedMetrics = useMemo(() => {
    return [...HERO_METRICS].sort(
      (a, b) => b.lensRelevance[roleLens] - a.lensRelevance[roleLens]
    );
  }, [roleLens]);

  const handleSelectLens = (lens: RoleLens) => {
    setRoleLens(lens);
    const meta = ROLE_LENSES.find((r) => r.id === lens);
    if (meta && lens !== "all") {
      showToast(`Lens: ${meta.label}`, "info");
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b hairline-border bg-[#FAFAFA] dark:bg-[#0A0A0C]"
    >
      {/* Subtle Neural Mesh Canvas */}
      <NeuralCanvas />

      {/* Radial Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/12 via-cyan-500/10 to-emerald-500/10 blur-3xl dark:from-indigo-500/15 dark:via-cyan-500/12 dark:to-emerald-500/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        {/* Status & Location Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {PERSONAL_INFO.statusBadge}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border hairline-border bg-white/70 px-3 py-1 font-mono text-xs text-zinc-600 backdrop-blur-sm dark:bg-[#121216]/80 dark:text-zinc-400">
            <MapPin className="h-3.5 w-3.5 text-cyan-500" />
            {PERSONAL_INFO.location}
          </span>
        </motion.div>

        {/* Main Hero Typography + Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-col-reverse items-start justify-between gap-8 lg:flex-row lg:items-center"
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
              {PERSONAL_INFO.name}
              <span className="mt-2 block bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 bg-clip-text text-2xl font-medium tracking-tight text-transparent sm:text-3xl lg:text-4xl">
                {PERSONAL_INFO.title}
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Executive Portrait Frame */}
          <div className="relative shrink-0 self-start lg:self-center">
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-indigo-500/40 via-cyan-400/30 to-emerald-400/30 opacity-75 blur-md"
            />
            <div className="surface-card relative overflow-hidden rounded-2xl p-1.5 shadow-xl">
              <div className="relative h-36 w-36 overflow-hidden rounded-xl bg-white sm:h-44 sm:w-44 lg:h-52 lg:w-52">
                <Image
                  src={PERSONAL_INFO.avatarUrl}
                  alt={`${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between px-1.5 pb-0.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                <span>{PERSONAL_INFO.name}</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  M.Tech AI · 9.16
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Role-Lens Switcher Banner (Hero) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-7 rounded-2xl border hairline-border bg-white/80 p-3 backdrop-blur-md dark:bg-[#121216]/85 sm:p-4"
        >
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div className="flex items-center gap-2.5">
              <Terminal className="h-4 w-4 shrink-0 text-indigo-500" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Recruiter Mode · Role-Lens Filter
                </p>
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  {activeLensMeta.focusHighlight}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ROLE_LENSES.map((lens) => {
                const isSelected = roleLens === lens.id;
                return (
                  <button
                    key={lens.id}
                    type="button"
                    onClick={() => handleSelectLens(lens.id)}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-xs font-medium transition-all",
                      isSelected
                        ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-700 shadow-sm dark:border-indigo-400/50 dark:text-indigo-200"
                        : "hairline-border bg-transparent text-zinc-600 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
                    )}
                  >
                    {lens.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500"
          >
            <Sparkles className="h-4 w-4 text-cyan-200" />
            Ask Jishnu&apos;s AI
            <span className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </span>
          </button>

          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 rounded-xl border hairline-border bg-white/80 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-[#121216] dark:text-zinc-100 dark:hover:bg-[#1B1B22]"
          >
            Inspect Systems
            <ArrowUpRight className="h-4 w-4 text-cyan-500" />
          </a>

          <a
            href={PERSONAL_INFO.resumePdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border hairline-border bg-white/80 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:bg-[#121216] dark:text-zinc-200 dark:hover:bg-[#1B1B22]"
          >
            <Download className="h-4 w-4 text-emerald-500" />
            Download Resume PDF
          </a>

          <div className="flex items-center gap-2 sm:ml-auto">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-1.5 rounded-xl border hairline-border bg-white/80 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-indigo-500/40 hover:text-zinc-950 dark:bg-[#121216] dark:text-zinc-300 dark:hover:text-white"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-1.5 rounded-xl border hairline-border bg-white/80 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-cyan-500/40 hover:text-zinc-950 dark:bg-[#121216] dark:text-zinc-300 dark:hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* Hero Metrics Strip */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {orderedMetrics.map((metric) => {
            const isHighlighted =
              roleLens !== "all" && metric.lensRelevance[roleLens] >= 95;
            const accentClass =
              metric.accent === "emerald"
                ? "text-emerald-600 dark:text-emerald-400"
                : metric.accent === "cyan"
                  ? "text-cyan-600 dark:text-cyan-400"
                  : "text-indigo-600 dark:text-indigo-400";

            return (
              <motion.div
                layout
                key={metric.id}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className={cn(
                  "surface-card group rounded-2xl p-4 transition-all",
                  isHighlighted &&
                    "ring-1 ring-indigo-500/40 shadow-md shadow-indigo-500/10"
                )}
              >
                <div
                  className={cn(
                    "font-mono text-xl font-bold tracking-tight sm:text-2xl",
                    accentClass
                  )}
                >
                  {metric.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {metric.label}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                  {metric.detail}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
