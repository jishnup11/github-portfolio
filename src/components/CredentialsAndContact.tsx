"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Award,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  AWARDS,
  CERTIFICATIONS,
  EDUCATION,
  PERSONAL_INFO,
} from "@/data/resume";
import { useApp } from "@/components/AppContext";
import { cn } from "@/lib/utils";

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="border-b hairline-border bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Education */}
          <div className="surface-card rounded-2xl p-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="h-4 w-4" />
              Education
            </div>
            <div className="mt-5 space-y-5">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="border-l-2 border-indigo-500/40 pl-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      {edu.period}
                    </span>
                    {edu.score && (
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        {edu.score}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-zinc-950 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                    {edu.institution}
                  </p>
                  {edu.focus && (
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {edu.focus}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Awards */}
          <div className="surface-card rounded-2xl p-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Award className="h-4 w-4" />
              Honors & Awards
            </div>
            <div className="mt-5 space-y-4">
              {AWARDS.map((award) => (
                <div
                  key={award.title}
                  className="surface-elevated rounded-xl p-3.5"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-zinc-500">
                    <span>{award.organization}</span>
                    <span>{award.date}</span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-zinc-950 dark:text-white">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {award.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="surface-card rounded-2xl p-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <ShieldCheck className="h-4 w-4" />
              Certifications
            </div>
            <div className="mt-5 space-y-2.5">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className={cn(
                    "rounded-xl border p-3 transition-colors",
                    cert.highlight
                      ? "border-cyan-500/35 bg-cyan-500/10"
                      : "hairline-border bg-zinc-50/70 dark:bg-[#16161C]"
                  )}
                >
                  <div className="text-xs font-semibold leading-snug text-zinc-950 dark:text-zinc-100">
                    {cert.title}
                  </div>
                  <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                    <span>{cert.issuer}</span>
                    {cert.date && (
                      <span className="text-cyan-700 dark:text-cyan-300">
                        {cert.date}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const { showToast } = useApp();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [roleContext, setRoleContext] = useState("AI / Research Engineer Role");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const copyValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      showToast(`${label} copied to clipboard`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      showToast("Could not copy automatically", "info");
    }
  };

  const mailtoFallbackHref = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${roleContext} — ${senderName.trim() || "Recruiter"}`
  )}&body=${encodeURIComponent(
    `Hi Jishnu,\n\n${message.trim() || "We would love to connect regarding an AI / ML / Research opportunity."}\n\nBest regards,\n${senderName.trim() || "Hiring Team"}${senderEmail.trim() ? `\nReply to: ${senderEmail.trim()}` : ""}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "submitting") return;

    // Honeypot check: silently ignore automated bot submissions
    if (honeypot.trim()) {
      setSubmitState("success");
      setSubmitFeedback("Your message has been received.");
      return;
    }

    const cleanName = senderName.trim();
    const cleanEmail = senderEmail.trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      setValidationError("Please enter your name.");
      return;
    }
    if (!EMAIL_PATTERN.test(cleanEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (cleanMessage.length < 5) {
      setValidationError("Please enter a brief message (at least 5 characters).");
      return;
    }

    setValidationError(null);
    setSubmitFeedback(null);
    setSubmitState("submitting");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${PERSONAL_INFO.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            inquiry_focus: roleContext,
            message: cleanMessage,
            _subject: `New Portfolio Message from ${cleanName}`,
            _template: "table",
            _honey: honeypot,
          }),
        }
      );

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };

      const isSuccess =
        response.ok &&
        (data.success === true || data.success === "true" || data.success === undefined);

      if (!isSuccess) {
        throw new Error(
          data.message || "Email delivery service returned an unexpected error."
        );
      }

      setSubmitState("success");
      setSubmitFeedback(
        `Message delivered directly to ${PERSONAL_INFO.email}. Thank you for reaching out!`
      );
      setSenderName("");
      setSenderEmail("");
      setMessage("");
      showToast(`Message sent to ${PERSONAL_INFO.email}`);
    } catch (err) {
      setSubmitState("error");
      setSubmitFeedback(
        err instanceof Error
          ? err.message
          : "Unable to send message right now. Please use the direct email link below."
      );
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        className="bg-[#FAFAFA] py-16 dark:bg-[#0A0A0C] sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="surface-card grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  Direct Channels
                </span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                  Let&apos;s Build Frontier AI Systems
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Targeting{" "}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    AI Engineer, ML Engineer, Research Engineer, and Research
                    Scientist
                  </span>{" "}
                  roles across Bengaluru, remote, or global R&D teams.
                </p>

                <div className="mt-6 space-y-3">
                  {/* Copy Email */}
                  <div className="surface-elevated flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="h-4 w-4 shrink-0 text-indigo-500" />
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] uppercase text-zinc-500">
                          Email
                        </div>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="truncate text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyValue("Email", PERSONAL_INFO.email)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border hairline-border bg-white px-2.5 py-1 font-mono text-[11px] text-zinc-700 hover:border-indigo-500/40 dark:bg-[#121216] dark:text-zinc-300"
                    >
                      {copiedField === "Email" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      Copy
                    </button>
                  </div>

                  {/* Copy Phone */}
                  <div className="surface-elevated flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-cyan-500" />
                      <div>
                        <div className="font-mono text-[10px] uppercase text-zinc-500">
                          Phone
                        </div>
                        <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {PERSONAL_INFO.phone}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyValue("Phone", PERSONAL_INFO.phone)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border hairline-border bg-white px-2.5 py-1 font-mono text-[11px] text-zinc-700 hover:border-cyan-500/40 dark:bg-[#121216] dark:text-zinc-300"
                    >
                      {copiedField === "Phone" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border hairline-border px-3.5 py-2 font-mono text-xs font-medium text-zinc-800 hover:border-emerald-500/40 dark:text-zinc-200"
                >
                  <Download className="h-3.5 w-3.5 text-emerald-500" />
                  Resume PDF
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border hairline-border px-3.5 py-2 font-mono text-xs font-medium text-zinc-800 hover:border-indigo-500/40 dark:text-zinc-200"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border hairline-border px-3.5 py-2 font-mono text-xs font-medium text-zinc-800 hover:border-cyan-500/40 dark:text-zinc-200"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Interactive Contact Form (FormSubmit AJAX + mailto fallback) */}
            <form
              noValidate
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border hairline-border bg-zinc-50/70 p-5 dark:bg-[#0E0E13] sm:p-6 lg:col-span-7"
            >
              {/* Hidden spam-protection honeypot field */}
              <input
                type="text"
                name="_honey"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    disabled={submitState === "submitting"}
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="Alex Rivera"
                    className="w-full rounded-xl border hairline-border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 disabled:opacity-60 dark:bg-[#14141B] dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500"
                  >
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    disabled={submitState === "submitting"}
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="alex@frontier-ai.com"
                    className="w-full rounded-xl border hairline-border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 disabled:opacity-60 dark:bg-[#14141B] dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-role"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500"
                >
                  Inquiry Focus
                </label>
                <select
                  id="contact-role"
                  name="inquiry_focus"
                  disabled={submitState === "submitting"}
                  value={roleContext}
                  onChange={(e) => setRoleContext(e.target.value)}
                  className="w-full rounded-xl border hairline-border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 disabled:opacity-60 dark:bg-[#14141B] dark:text-zinc-100"
                >
                  <option>AI / Agentic Engineer Role</option>
                  <option>ML / Systems Engineer Role</option>
                  <option>Research Scientist / Research Engineer Role</option>
                  <option>Technical Advisory / Research Collaboration</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  disabled={submitState === "submitting"}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="Share role details, team focus, or research problem..."
                  className="w-full resize-none rounded-xl border hairline-border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 disabled:opacity-60 dark:bg-[#14141B] dark:text-zinc-100"
                />
              </div>

              {validationError && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-800 dark:text-amber-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                  <span>{validationError}</span>
                </div>
              )}

              {submitState === "success" && submitFeedback && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-3 text-xs leading-relaxed text-emerald-800 dark:text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{submitFeedback}</span>
                </div>
              )}

              {submitState === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3.5 py-3 text-xs leading-relaxed text-rose-800 dark:text-rose-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <div>
                    <p>{submitFeedback}</p>
                    <p className="mt-1">
                      Direct fallback:{" "}
                      <a
                        href={mailtoFallbackHref}
                        className="font-mono font-semibold underline hover:text-rose-950 dark:hover:text-white"
                      >
                        mailto:{PERSONAL_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-zinc-500">
                  Sends directly to {PERSONAL_INFO.email} or use{" "}
                  <a
                    href={mailtoFallbackHref}
                    className="underline hover:text-zinc-800 dark:hover:text-zinc-300"
                  >
                    mailto
                  </a>
                  .
                </span>
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitState === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t hairline-border bg-[#FAFAFA] py-8 dark:bg-[#0A0A0C]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-zinc-500 dark:text-zinc-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="font-mono">
            © 2026 {PERSONAL_INFO.name} · AI & Deep Learning Scientist
          </div>
          <div className="font-mono text-[11px]">
            Built with Next.js · TypeScript · Tailwind · Framer Motion · ⌘K RAG
          </div>
        </div>
      </footer>
    </>
  );
}
