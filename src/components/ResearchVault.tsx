"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AFSEGGAN_BENCHMARK_CHART,
  PUBLICATIONS_AND_PATENTS,
} from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

export function ResearchVault() {
  const { roleLens, showToast, theme } = useApp();
  const [openAbstractId, setOpenAbstractId] = useState<string | null>(
    "plos-afseggan"
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const orderedItems = useMemo(() => {
    return [...PUBLICATIONS_AND_PATENTS].sort(
      (a, b) => b.lensRelevance[roleLens] - a.lensRelevance[roleLens]
    );
  }, [roleLens]);

  const handleCopyBibtex = async (id: string, bibtex: string, title: string) => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopiedId(id);
      showToast(`BibTeX copied for "${title.slice(0, 32)}..."`);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast("Copy failed — please copy manually", "info");
    }
  };

  return (
    <section
      id="research"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <BookOpen className="h-3.5 w-3.5" />
              Research & Publications Vault
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              Patents & Peer-Reviewed Literature
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
              Translating novel Generative Adversarial Network formulations into
              clinically validated healthcare systems and surveillance vision.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border hairline-border bg-white/80 px-3 py-1.5 font-mono text-xs text-zinc-600 dark:bg-[#121216] dark:text-zinc-300">
            <Award className="h-3.5 w-3.5 text-emerald-500" />
            1 Patent · 1 PLOS One Journal · 1 Springer Conference
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Publications & Patent List */}
          <div className="space-y-4 lg:col-span-7">
            {orderedItems.map((item) => {
              const isOpen = openAbstractId === item.id;
              const isCopied = copiedId === item.id;

              const badgeStyle =
                item.badgeColor === "emerald"
                  ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : item.badgeColor === "indigo"
                    ? "border-indigo-500/35 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                    : "border-cyan-500/35 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300";

              return (
                <motion.div
                  layout
                  key={item.id}
                  className="surface-card rounded-2xl p-5 transition-all sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-md border px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                          badgeStyle
                        )}
                      >
                        {item.venue}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        {item.type} · {item.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {item.paperUrl && (
                        <a
                          href={item.paperUrl.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-700 transition-colors hover:border-emerald-500/60 hover:bg-emerald-500/20 dark:text-emerald-300"
                        >
                          {item.paperUrl.label}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyBibtex(item.id, item.bibtex, item.title)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border hairline-border bg-zinc-50 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-700 transition-colors hover:border-indigo-500/40 hover:text-indigo-600 dark:bg-[#181820] dark:text-zinc-300 dark:hover:text-indigo-300"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            Copied BibTeX
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy BibTeX
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-zinc-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {item.authors}
                  </p>

                  {item.keyMetric && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                      <FileText className="h-3 w-3" />
                      {item.keyMetric}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenAbstractId(isOpen ? null : item.id)
                      }
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400"
                    >
                      {isOpen ? (
                        <>
                          Hide Abstract & Key Contributions
                          <ChevronUp className="h-3.5 w-3.5" />
                        </>
                      ) : (
                        <>
                          View Abstract & Key Contributions
                          <ChevronDown className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 space-y-3 border-t hairline-border pt-3 text-sm text-zinc-600 dark:text-zinc-300"
                      >
                        <p className="leading-relaxed">{item.abstract}</p>
                        <div>
                          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                            Key Contributions
                          </div>
                          <ul className="space-y-1.5">
                            {item.contributions.map((c, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
                                <span className="text-xs leading-relaxed">
                                  {c}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* AFSegGAN Benchmark Chart Panel */}
          <div className="surface-card flex flex-col justify-between rounded-2xl p-6 lg:col-span-5">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                PLOS One Benchmark · Dice Score (%)
              </span>
              <h3 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">
                AFSegGAN vs. Segmentation Baselines
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Conditional adversarial supervision sharpens irregular chronic
                ulcer borders, achieving{" "}
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  93.11% Dice
                </span>{" "}
                over standard semantic segmentation baselines.
              </p>

              <div className="mt-6 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={AFSEGGAN_BENCHMARK_CHART}
                    layout="vertical"
                    margin={{ top: 4, right: 20, left: 10, bottom: 4 }}
                  >
                    <XAxis
                      type="number"
                      domain={[75, 96]}
                      tick={{
                        fontSize: 11,
                        fill: theme === "dark" ? "#A1A1AA" : "#4B5563",
                        fontFamily: "var(--font-jetbrains-mono)",
                      }}
                      unit="%"
                    />
                    <YAxis
                      type="category"
                      dataKey="model"
                      width={110}
                      tick={{
                        fontSize: 11,
                        fill: theme === "dark" ? "#E4E4E7" : "#18181B",
                        fontFamily: "var(--font-jetbrains-mono)",
                      }}
                    />
                    <Tooltip
                      cursor={{
                        fill:
                          theme === "dark"
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.04)",
                      }}
                      contentStyle={{
                        backgroundColor:
                          theme === "dark" ? "#121216" : "#FFFFFF",
                        borderColor:
                          theme === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                        borderRadius: "0.75rem",
                        fontSize: "12px",
                        fontFamily: "var(--font-jetbrains-mono)",
                      }}
                      formatter={(value: number) => [`${value}%`, "Dice Score"]}
                    />
                    <Bar dataKey="dice" radius={[0, 6, 6, 0]} barSize={22}>
                      {AFSEGGAN_BENCHMARK_CHART.map((entry, idx) => (
                        <Cell key={idx} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 rounded-xl border hairline-border bg-zinc-50/80 p-4 dark:bg-[#0D0D11]">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Clinical & IP Translation
              </div>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                Validated alongside clinical scientists, health systems, and
                university partners—powering a patented remote wound management
                system for the{" "}
                <span className="font-mono font-semibold text-zinc-900 dark:text-white">
                  $96.8B
                </span>{" "}
                US chronic wound treatment market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
