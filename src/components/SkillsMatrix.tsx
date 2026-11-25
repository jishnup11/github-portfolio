"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

export function SkillsMatrix() {
  const { roleLens } = useApp();

  return (
    <section
      id="skills"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            <Cpu className="h-3.5 w-3.5" />
            Technical Stack
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            Core Engineering & Research Matrix
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Spanning agentic orchestration, multi-node distributed GPU training,
            medical computer vision, and containerized cloud deployments.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, idx) => {
            const dotColor =
              category.accent === "emerald"
                ? "bg-emerald-500"
                : category.accent === "cyan"
                  ? "bg-cyan-500"
                  : "bg-indigo-500";

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="surface-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2.5">
                  <span className={cn("h-2.5 w-2.5 rounded-full", dotColor)} />
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {category.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isHighlighted =
                      roleLens !== "all" && skill.lenses.includes(roleLens);
                    const isDimmed =
                      roleLens !== "all" && !skill.lenses.includes(roleLens);

                    return (
                      <span
                        key={skill.name}
                        className={cn(
                          "rounded-lg border px-2.5 py-1 font-mono text-xs transition-all",
                          isHighlighted
                            ? "border-indigo-500/45 bg-indigo-500/12 font-medium text-indigo-700 dark:border-indigo-400/45 dark:text-indigo-200"
                            : "hairline-border bg-zinc-50 text-zinc-700 dark:bg-[#16161D] dark:text-zinc-300",
                          isDimmed && "opacity-55"
                        )}
                      >
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
