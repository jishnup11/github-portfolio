"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { WORK_EXPERIENCE } from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  const { roleLens } = useApp();
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "independent-sabbatical": true,
    "cynapto-scientist": true,
    "tcs-research": true,
    "tcs-ml-eng": true,
  });

  const orderedExperience = useMemo(() => {
    return [...WORK_EXPERIENCE].sort(
      (a, b) => b.lensRelevance[roleLens] - a.lensRelevance[roleLens]
    );
  }, [roleLens]);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experience"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            <Briefcase className="h-3.5 w-3.5" />
            Career Trajectory
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            4.3+ Years Across R&I Labs & Production AI
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            From enterprise document pipelines and patented healthcare computer
            vision at TCS to 500+ hr multi-node LipSync training and Agentic RAG.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-10 space-y-6 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-zinc-200 dark:before:bg-white/10 sm:before:left-6">
          {orderedExperience.map((item) => {
            const isExpanded = expandedIds[item.id] ?? true;
            const isLensPriority =
              roleLens !== "all" && item.lensRelevance[roleLens] >= 95;

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3 }}
                className="relative pl-11 sm:pl-16"
              >
                {/* Timeline Dot */}
                <span
                  className={cn(
                    "absolute left-2.5 top-6 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 bg-[#FAFAFA] dark:bg-[#0A0A0C] sm:left-4",
                    isLensPriority
                      ? "border-emerald-500 ring-4 ring-emerald-500/20"
                      : "border-indigo-500"
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                </span>

                <div
                  className={cn(
                    "surface-card rounded-2xl p-5 transition-all sm:p-6",
                    isLensPriority && "ring-1 ring-indigo-500/35"
                  )}
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </span>
                        {item.badge && (
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1.5 text-lg font-semibold text-zinc-950 dark:text-white">
                        {item.role}
                      </h3>
                      <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                        {item.organization}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="inline-flex items-center gap-1 self-start rounded-lg border hairline-border px-2.5 py-1 font-mono text-[11px] text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5"
                    >
                      {isExpanded ? (
                        <>
                          Collapse <ChevronUp className="h-3.5 w-3.5" />
                        </>
                      ) : (
                        <>
                          Expand <ChevronDown className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.summary}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 space-y-2.5 border-t hairline-border pt-4">
                      {item.highlights.map((hl, i) => {
                        const matchesLens =
                          roleLens !== "all" && hl.lenses.includes(roleLens);
                        return (
                          <div
                            key={i}
                            className={cn(
                              "flex items-start justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                              matchesLens
                                ? "border border-indigo-500/25 bg-indigo-500/5 text-zinc-900 dark:text-zinc-100"
                                : "text-zinc-700 dark:text-zinc-300"
                            )}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                              <span className="leading-relaxed">{hl.text}</span>
                            </div>
                            {hl.metric && (
                              <span className="hidden shrink-0 rounded-md border hairline-border bg-white/80 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-700 dark:bg-[#181820] dark:text-emerald-300 sm:inline-block">
                                {hl.metric}
                              </span>
                            )}
                          </div>
                        );
                      })}

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border hairline-border bg-zinc-100/80 px-2 py-0.5 font-mono text-[10px] text-zinc-700 dark:bg-[#18181F] dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
