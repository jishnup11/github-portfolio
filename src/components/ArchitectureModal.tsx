"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Terminal,
  X,
} from "lucide-react";
import type { ArchitectureNode, FeaturedProject } from "@/data/resume";
import { cn } from "@/lib/utils";

interface ArchitectureModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

const NODE_KIND_META: Record<
  ArchitectureNode["kind"],
  { icon: React.ComponentType<{ className?: string }>; ring: string; badge: string }
> = {
  input: {
    icon: Terminal,
    ring: "border-zinc-400/50 dark:border-zinc-500/50",
    badge: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
  },
  orchestrator: {
    icon: GitBranch,
    ring: "border-indigo-500/60",
    badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
  },
  retrieval: {
    icon: Database,
    ring: "border-cyan-500/60",
    badge: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
  },
  model: {
    icon: Cpu,
    ring: "border-indigo-500/60",
    badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
  },
  compute: {
    icon: Layers,
    ring: "border-emerald-500/60",
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  output: {
    icon: Server,
    ring: "border-emerald-500/60",
    badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
};

export function ArchitectureModal({ project, onClose }: ArchitectureModalProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (project?.architecture?.nodes[0]) {
      setSelectedNodeId(project.architecture.nodes[1]?.id ?? project.architecture.nodes[0].id);
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  const architecture = project?.architecture;
  const selectedNode =
    architecture?.nodes.find((n) => n.id === selectedNodeId) ??
    architecture?.nodes[0];

  return (
    <AnimatePresence>
      {project && architecture && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="surface-card relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b hairline-border px-5 py-4 sm:px-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                    <Activity className="h-3 w-3" />
                    System Architecture Explorer
                  </span>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {project.organization}
                  </span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold text-zinc-950 dark:text-white sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                  {architecture.overview}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close architecture explorer"
                className="rounded-lg border hairline-border p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="grid flex-1 overflow-y-auto lg:grid-cols-12">
              {/* Interactive Node Graph Canvas */}
              <div className="border-b hairline-border bg-zinc-50/70 p-4 dark:bg-[#0B0B0F] sm:p-6 lg:col-span-8 lg:border-b-0 lg:border-r">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Click any node to inspect runtime behavior & stack
                  </span>
                  <span className="rounded-md border hairline-border bg-white/80 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:bg-[#121216] dark:text-emerald-400">
                    {architecture.throughputNote}
                  </span>
                </div>

                {/* Desktop / Tablet Interactive Spatial Node Graph */}
                <div className="relative hidden h-[390px] w-full overflow-hidden rounded-xl border hairline-border bg-white/70 dark:bg-[#0E0E13] md:block">
                  {/* Subtle Dot Grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(99,102,241,0.35) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* SVG Edges */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <marker
                        id="arch-arrow"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="4"
                        markerHeight="4"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366F1" />
                      </marker>
                      <marker
                        id="arch-arrow-cyan"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="4"
                        markerHeight="4"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#06B6D4" />
                      </marker>
                    </defs>

                    {architecture.edges.map((edge, idx) => {
                      const fromNode = architecture.nodes.find(
                        (n) => n.id === edge.from
                      );
                      const toNode = architecture.nodes.find(
                        (n) => n.id === edge.to
                      );
                      if (!fromNode || !toNode) return null;

                      const isSelectedEdge =
                        selectedNode?.id === edge.from ||
                        selectedNode?.id === edge.to;

                      const midX = (fromNode.x + toNode.x) / 2;
                      const d = `M ${fromNode.x} ${fromNode.y} C ${midX} ${fromNode.y}, ${midX} ${toNode.y}, ${toNode.x} ${toNode.y}`;

                      return (
                        <g key={`${edge.from}-${edge.to}-${idx}`}>
                          <path
                            d={d}
                            fill="none"
                            stroke={edge.dashed ? "#06B6D4" : "#6366F1"}
                            strokeOpacity={isSelectedEdge ? 0.9 : 0.35}
                            strokeWidth={isSelectedEdge ? 0.55 : 0.38}
                            strokeDasharray={edge.dashed ? "1.6 1.2" : undefined}
                            markerEnd={
                              edge.dashed
                                ? "url(#arch-arrow-cyan)"
                                : "url(#arch-arrow)"
                            }
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Interactive Nodes */}
                  {architecture.nodes.map((node) => {
                    const meta = NODE_KIND_META[node.kind];
                    const Icon = meta.icon;
                    const active = selectedNode?.id === node.id;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                        }}
                        className={cn(
                          "group absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white/95 px-2.5 py-2 text-left shadow-sm transition-all dark:bg-[#14141A]/95",
                          "w-[138px]",
                          meta.ring,
                          active
                            ? "z-20 scale-105 ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20"
                            : "z-10 hover:z-20 hover:scale-[1.03]"
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                              meta.badge
                            )}
                          >
                            <Icon className="h-3 w-3" />
                          </span>
                          <span className="truncate font-mono text-[9px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            {node.stage}
                          </span>
                        </div>
                        <div className="mt-1 truncate text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                          {node.label}
                        </div>
                        <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                          {node.sublabel}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Step-by-Step Pipeline List */}
                <div className="space-y-2 md:hidden">
                  {architecture.nodes.map((node) => {
                    const meta = NODE_KIND_META[node.kind];
                    const Icon = meta.icon;
                    const active = selectedNode?.id === node.id;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                          active
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "hairline-border bg-white dark:bg-[#121216]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            meta.badge
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[10px] uppercase text-zinc-500">
                            {node.stage}
                          </div>
                          <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {node.label}
                          </div>
                          <div className="truncate text-xs text-zinc-500">
                            {node.sublabel}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Edge Flow Legend */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <span className="h-0.5 w-4 bg-indigo-500" /> Primary Data Flow
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <span className="h-0.5 w-4 border-t-2 border-dashed border-cyan-500" />{" "}
                    Conditional Fallback Edge
                  </span>
                </div>
              </div>

              {/* Right Node Inspector */}
              <div className="flex flex-col justify-between p-5 sm:p-6 lg:col-span-4">
                {selectedNode && (
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Node Inspector · {selectedNode.stage}
                    </div>
                    <h4 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-white">
                      {selectedNode.label}
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {selectedNode.sublabel}
                    </p>

                    {selectedNode.metrics && (
                      <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-mono text-xs text-emerald-700 dark:text-emerald-300">
                        {selectedNode.metrics}
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {selectedNode.details}
                    </p>

                    <div className="mt-5">
                      <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Component Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border hairline-border bg-zinc-100 px-2.5 py-1 font-mono text-[11px] text-zinc-800 dark:bg-[#181820] dark:text-zinc-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Node Stepper */}
                <div className="mt-6 border-t hairline-border pt-4">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    Pipeline Nodes ({architecture.nodes.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {architecture.nodes.map((n, index) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => setSelectedNodeId(n.id)}
                        className={cn(
                          "rounded-md border px-2 py-1 font-mono text-[10px] transition-colors",
                          selectedNode?.id === n.id
                            ? "border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                            : "hairline-border text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                        )}
                      >
                        0{index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
