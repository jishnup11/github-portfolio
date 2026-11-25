"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Cpu,
  GitBranch,
  Layers,
  Maximize2,
  Monitor,
  Sparkles,
  X,
} from "lucide-react";
import { FEATURED_PROJECTS, type FeaturedProject } from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { roleLens } = useApp();
  const [inspectingProject, setInspectingProject] =
    useState<FeaturedProject | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  const orderedProjects = useMemo(() => {
    return [...FEATURED_PROJECTS].sort(
      (a, b) => b.lensRelevance[roleLens] - a.lensRelevance[roleLens]
    );
  }, [roleLens]);

  return (
    <section
      id="projects"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              <Layers className="h-3.5 w-3.5" />
              Flagship Systems & Benchmarks
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              Production AI Architectures & Research Systems
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
              Interactive system topologies, empirical benchmark gains, and
              end-to-end engineering from clinical medical imaging to multi-node
              PyTorch DDP and Agentic RAG.
            </p>
          </div>

          {roleLens !== "all" && (
            <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
              <Sparkles className="h-3 w-3" />
              Sorted by active lens relevance
            </span>
          )}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
          {orderedProjects.map((project, index) => {
            const isTopMatch =
              roleLens !== "all" && project.lensRelevance[roleLens] >= 95;
            const isFullWidth = index === 0;

            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "surface-card group flex flex-col justify-between rounded-2xl p-6 transition-all hover:border-indigo-500/35",
                  isFullWidth && "lg:col-span-2",
                  isTopMatch &&
                    "ring-1 ring-indigo-500/35 shadow-lg shadow-indigo-500/5"
                )}
              >
                <div>
                  {/* Card Top Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-cyan-700 dark:text-cyan-300">
                        {project.category}
                      </span>
                      {isTopMatch && (
                        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                          Top Lens Match
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {project.organization} · {project.period}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {project.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {project.paperUrl && (
                        <a
                          href={project.paperUrl.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-2 font-mono text-xs font-medium text-emerald-700 transition-all hover:border-emerald-500/60 hover:bg-emerald-500/20 dark:text-emerald-200"
                        >
                          {project.paperUrl.label}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.architecture && (
                        <button
                          type="button"
                          onClick={() => setInspectingProject(project)}
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-indigo-500/35 bg-indigo-500/10 px-3.5 py-2 font-mono text-xs font-medium text-indigo-700 transition-all hover:border-indigo-500/60 hover:bg-indigo-500/20 dark:text-indigo-200"
                        >
                          <GitBranch className="h-3.5 w-3.5 text-cyan-500" />
                          Inspect Architecture
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {project.summary}
                  </p>

                  {project.businessProblem && project.demoImage ? (
                    <div className="mt-4 grid gap-5 lg:grid-cols-12 lg:items-stretch">
                      <div className="flex flex-col justify-between rounded-xl border hairline-border bg-zinc-50/80 p-4 dark:bg-[#0D0D11] lg:col-span-6">
                        <div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            <AlertCircle className="h-3.5 w-3.5 text-cyan-500" />
                            Business Problem
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-sm">
                            {project.businessProblem.context}
                          </p>
                          <p className="mt-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 sm:text-sm">
                            {project.businessProblem.leadIn}
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {project.businessProblem.painPoints.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col overflow-hidden rounded-xl border hairline-border bg-[#0A0A0D] lg:col-span-6">
                        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3.5 py-2 font-mono text-[11px] text-zinc-300">
                          <span className="inline-flex items-center gap-1.5 truncate">
                            <Monitor className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            <span className="truncate">
                              {project.demoImage.caption}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage(project.demoImage ?? null)
                            }
                            aria-label="Enlarge demo screenshot"
                            className="inline-flex shrink-0 items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-zinc-200 transition-colors hover:bg-white/20"
                          >
                            <Maximize2 className="h-3 w-3" />
                            Expand
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxImage(project.demoImage ?? null)
                          }
                          className="group/img relative aspect-video w-full flex-1 overflow-hidden bg-black text-left focus:outline-none"
                        >
                          <Image
                            src={project.demoImage.src}
                            alt={project.demoImage.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.01]"
                          />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {project.businessProblem && (
                        <div className="mt-4 rounded-xl border hairline-border bg-zinc-50/80 p-4 dark:bg-[#0D0D11]">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            <AlertCircle className="h-3.5 w-3.5 text-cyan-500" />
                            Business Problem
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-sm">
                            {project.businessProblem.context}
                          </p>
                          <p className="mt-2.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 sm:text-sm">
                            {project.businessProblem.leadIn}
                          </p>
                          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                            {project.businessProblem.painPoints.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.demoImage && (
                        <div className="mt-4 overflow-hidden rounded-xl border hairline-border bg-[#0A0A0D]">
                          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3.5 py-2 font-mono text-[11px] text-zinc-300">
                            <span className="inline-flex items-center gap-1.5">
                              <Monitor className="h-3.5 w-3.5 text-emerald-400" />
                              {project.demoImage.caption}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setLightboxImage(project.demoImage ?? null)
                              }
                              className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-zinc-200 hover:bg-white/20"
                            >
                              <Maximize2 className="h-3 w-3" />
                              Expand
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage(project.demoImage ?? null)
                            }
                            className="relative aspect-video w-full overflow-hidden bg-black text-left"
                          >
                            <Image
                              src={project.demoImage.src}
                              alt={project.demoImage.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 80vw"
                              className="object-cover object-top"
                            />
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Metrics Strip */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="surface-elevated rounded-xl px-3 py-2"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {m.label}
                        </div>
                        <div className="mt-0.5 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Visual Benchmark Comparison Bars */}
                  {project.benchmarks.length > 0 && (
                    <div className="mt-5 space-y-3 rounded-xl border hairline-border bg-zinc-50/80 p-4 dark:bg-[#0D0D11]">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Cpu className="h-3.5 w-3.5 text-emerald-500" />
                        Empirical Benchmark Comparison
                      </div>
                      <div
                        className={cn(
                          "grid gap-4",
                          project.benchmarks.length > 1 && "md:grid-cols-2"
                        )}
                      >
                        {project.benchmarks.map((bm) => {
                          const maxVal = Math.max(
                            bm.baselineValue,
                            bm.improvedValue,
                            100
                          );
                          const basePct = Math.round(
                            (bm.baselineValue / maxVal) * 100
                          );
                          const impPct = Math.round(
                            (bm.improvedValue / maxVal) * 100
                          );

                          return (
                            <div key={bm.label} className="space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                                  {bm.label}
                                </span>
                                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                                  {bm.deltaText}
                                </span>
                              </div>

                              {/* Baseline */}
                              <div>
                                <div className="mb-1 flex justify-between font-mono text-[10px] text-zinc-500">
                                  <span>{bm.baselineLabel}</span>
                                  <span>
                                    {bm.baselineValue}
                                    {bm.unit}
                                  </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                                  <div
                                    className="h-full rounded-full bg-zinc-400 dark:bg-zinc-600"
                                    style={{ width: `${basePct}%` }}
                                  />
                                </div>
                              </div>

                              {/* Improved */}
                              <div>
                                <div className="mb-1 flex justify-between font-mono text-[10px] text-zinc-700 dark:text-zinc-200">
                                  <span>{bm.improvedLabel}</span>
                                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                    {bm.improvedValue}
                                    {bm.unit}
                                  </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${impPct}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags Footer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t hairline-border pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border hairline-border bg-zinc-100/80 px-2 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-[#18181F] dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Architecture Explorer Modal */}
      <ArchitectureModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />

      {/* Fullscreen Demo Screenshot Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="surface-card relative w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 border-b hairline-border px-4 py-3">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-700 dark:text-zinc-200">
                  <Monitor className="h-4 w-4 text-emerald-500" />
                  {lightboxImage.caption}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  aria-label="Close demo preview"
                  className="rounded-lg border hairline-border p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-black">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
