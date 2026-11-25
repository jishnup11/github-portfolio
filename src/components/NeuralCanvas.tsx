"use client";

import React, { useEffect, useRef } from "react";
import { useApp } from "@/components/AppContext";

interface NodePoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let nodes: NodePoint[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const initNodes = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 640;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 640 ? 64 : 56;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = (Math.sin(r * 13.7 + c * 7.3) * 0.5 + 0.5) * 14 - 7;
          const jitterY = (Math.cos(c * 11.1 + r * 5.9) * 0.5 + 0.5) * 14 - 7;
          const x = c * spacing + jitterX;
          const y = r * spacing + jitterY;
          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === "dark";
      const dotColor = isDark ? "rgba(148, 163, 184, 0.22)" : "rgba(71, 85, 105, 0.16)";
      const activeDotColor = isDark
        ? "rgba(6, 182, 212, 0.65)"
        : "rgba(99, 102, 241, 0.55)";

      const radius = 155;
      const maxConnectDist = 78;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion && pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius && dist > 0.1) {
            const force = (1 - dist / radius) * 0.85;
            n.vx -= (dx / dist) * force;
            n.vy -= (dy / dist) * force;
          }
        }

        // Spring back to base
        n.vx += (n.baseX - n.x) * 0.05;
        n.vy += (n.baseY - n.y) * 0.05;
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx;
        n.y += n.vy;

        const distToCursor = pointer.active
          ? Math.hypot(pointer.x - n.x, pointer.y - n.y)
          : 9999;

        const isNearCursor = distToCursor < radius;

        ctx.beginPath();
        ctx.arc(n.x, n.y, isNearCursor ? 1.8 : 1.15, 0, Math.PI * 2);
        ctx.fillStyle = isNearCursor ? activeDotColor : dotColor;
        ctx.fill();

        // Draw subtle neural edges near cursor only (keeps GPU/CPU super lightweight)
        if (isNearCursor) {
          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const d = Math.hypot(m.x - n.x, m.y - n.y);
            if (d < maxConnectDist) {
              const alpha = (1 - d / maxConnectDist) * (1 - distToCursor / radius) * 0.38;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.strokeStyle = isDark
                ? `rgba(99, 102, 241, ${alpha.toFixed(3)})`
                : `rgba(79, 70, 229, ${alpha.toFixed(3)})`;
              ctx.lineWidth = 0.85;
              ctx.stroke();
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(drawFrame);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= rect.width &&
        pointer.y >= 0 &&
        pointer.y <= rect.height;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleResize = () => {
      initNodes();
      if (prefersReducedMotion) drawFrame();
    };

    initNodes();
    drawFrame();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    />
  );
}
