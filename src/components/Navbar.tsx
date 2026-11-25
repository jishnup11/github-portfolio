"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Command,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { PERSONAL_INFO, ROLE_LENSES, type RoleLens } from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Systems", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Outside Work", href: "#outside-work" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme, roleLens, setRoleLens, setCommandOpen, showToast } =
    useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLensChange = (lens: RoleLens) => {
    setRoleLens(lens);
    const meta = ROLE_LENSES.find((r) => r.id === lens);
    if (meta && lens !== "all") {
      showToast(`Recruiter Lens: ${meta.label}`, "info");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b hairline-border bg-[#FAFAFA]/85 backdrop-blur-xl dark:bg-[#0A0A0C]/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-lg border border-indigo-500/30 bg-white transition-colors group-hover:border-indigo-500/60">
            <Image
              src={PERSONAL_INFO.avatarUrl}
              alt={PERSONAL_INFO.name}
              fill
              sizes="32px"
              className="object-cover object-top"
            />
          </span>
          <div className="hidden sm:block">
            <span className="block text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {PERSONAL_INFO.name}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              AI & DL Scientist
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Sticky Role-Lens Switcher (Desktop & Tablet) */}
        <div
          role="group"
          aria-label="Recruiter Role Lens Switcher"
          className="hidden items-center rounded-xl border border-black/10 bg-zinc-100/80 p-1 dark:border-white/10 dark:bg-[#121216] md:flex"
        >
          {ROLE_LENSES.map((option) => {
            const active = roleLens === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleLensChange(option.id)}
                className={cn(
                  "relative rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors",
                  active
                    ? "text-zinc-950 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-lens-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-lg border border-indigo-500/30 bg-white shadow-sm dark:border-indigo-400/30 dark:bg-[#1C1C24]"
                  />
                )}
                <span className="relative z-10">{option.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-1.5 text-xs font-medium text-indigo-700 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/15 dark:text-indigo-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
            <span className="hidden sm:inline">Ask AI</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-indigo-500/20 bg-white/70 px-1.5 py-0.5 font-mono text-[10px] text-indigo-700 dark:bg-black/40 dark:text-indigo-300 sm:inline-flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border hairline-border bg-white/80 text-zinc-700 transition-colors hover:bg-zinc-100 dark:bg-[#121216] dark:text-zinc-300 dark:hover:bg-[#1B1B22]"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border hairline-border bg-white/80 text-zinc-700 dark:bg-[#121216] dark:text-zinc-300 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown + Mobile Lens Switcher */}
      {mobileMenuOpen && (
        <div className="border-t hairline-border bg-[#FAFAFA] px-4 py-3 dark:bg-[#0A0A0C] lg:hidden">
          <div className="mb-3 md:hidden">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Recruiter Mode (Role Lens)
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {ROLE_LENSES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleLensChange(option.id)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                    roleLens === option.id
                      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                      : "hairline-border text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg border hairline-border px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
