"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Compass,
  PlayCircle,
  Sparkles,
  Target,
} from "lucide-react";
import { BUILT_OUTSIDE_WORK } from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

export function BuiltOutsideWork() {
  const { roleLens } = useApp();

  const orderedProjects = useMemo(() => {
    return [...BUILT_OUTSIDE_WORK].sort(
      (a, b) => b.lensRelevance[roleLens] - a.lensRelevance[roleLens]
    );
  }, [roleLens]);

  return (
    <section
      id="outside-work"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <Compass className="h-3.5 w-3.5" />
              Independent Builds & Applied R&amp;D
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              Built outside work
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Multi-agent workflows, GAN image restoration &amp; super-resolution
              pipelines, evolutionary CNN search, and aspect-level NLP systems.
            </p>
          </div>

          {roleLens !== "all" && (
            <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
              <Sparkles className="h-3 w-3" />
              Ordered by active lens
            </span>
          )}
        </div>

        <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
          {orderedProjects.map((project, index) => {
            const isTopMatch =
              roleLens !== "all" && project.lensRelevance[roleLens] >= 94;
            const spanFull = index === 0 || Boolean(project.demoVideo);

            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-35px" }}
                transition={{ duration: 0.32 }}
                className={cn(
                  "surface-card flex flex-col justify-between rounded-2xl p-6 transition-all hover:border-indigo-500/35",
                  spanFull && "lg:col-span-2",
                  isTopMatch &&
                    "ring-1 ring-indigo-500/35 shadow-lg shadow-indigo-500/5"
                )}
              >
                <div>
                  {/* Header Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-indigo-700 dark:text-indigo-300">
                        {project.category}
                      </span>
                      {isTopMatch && (
                        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                          Top Lens Match
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Optional Extension Note */}
                  <h3 className="mt-3.5 text-lg font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-xl">
                    {project.title}
                  </h3>

                  {project.relationNote && (
                    <p className="mt-1 font-mono text-xs text-cyan-700 dark:text-cyan-400">
                      {project.relationNote}
                    </p>
                  )}

                  <div
                    className={cn(
                      "mt-3",
                      project.demoVideo &&
                        "grid gap-6 lg:grid-cols-12 lg:items-start"
                    )}
                  >
                    <div className={cn(project.demoVideo && "lg:col-span-6")}>
                      {/* Summary / Abstract */}
                      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {project.summary}
                      </p>

                      {/* Objective Box */}
                      {project.objective && (
                        <div className="mt-4 rounded-xl border hairline-border bg-zinc-50/80 p-3.5 dark:bg-[#0D0D11]">
                          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                            <Target className="h-3.5 w-3.5" />
                            Objective
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-sm">
                            {project.objective}
                          </p>
                        </div>
                      )}

                      {/* Highlights List */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="mt-4 rounded-xl border hairline-border bg-zinc-50/80 p-4 dark:bg-[#0D0D11]">
                          {project.highlightsTitle && (
                            <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                              {project.highlightsTitle}
                            </div>
                          )}
                          <ul className="space-y-2">
                            {project.highlights.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-sm"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Demo Video Player */}
                    {project.demoVideo && (
                      <div className="overflow-hidden rounded-xl border hairline-border bg-[#0A0A0D] lg:col-span-6">
                        <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2 font-mono text-[11px] text-zinc-300">
                          <span className="inline-flex items-center gap-1.5">
                            <PlayCircle className="h-3.5 w-3.5 text-emerald-400" />
                            {project.demoVideo.caption}
                          </span>
                          <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-300">
                            MP4 Demo
                          </span>
                        </div>
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          poster={project.demoVideo.poster}
                          className="aspect-video w-full bg-black object-contain"
                        >
                          <source
                            src={project.demoVideo.src}
                            type="video/mp4"
                          />
                          Your browser does not support embedded video playback.
                        </video>
                      </div>
                    )}
                  </div>
                </div>

                {/* Respective Skills Footer */}
                <div className="mt-5 border-t hairline-border pt-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Skills Applied
                    </span>
                    {project.externalUrl && (
                      <a
                        href={project.externalUrl.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        {project.externalUrl.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border hairline-border bg-zinc-100/80 px-2.5 py-1 font-mono text-[11px] text-zinc-800 dark:bg-[#18181F] dark:text-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
