"use client";

import React from "react";
import { motion } from "framer-motion";

// --- 1. REVEAL (ATUALIZADO) ---
// Faz o elemento aparecer de baixo para cima suavemente ao rolar
export function Reveal({
  children,
  delay = 0,
  width = "fit-content",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
  className?: string;
}) {
  return (
    <div style={{ width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: delay, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- 2. ANIMATED IMAGE FRAME (MELHORADO COM ZOOM) ---
// Adicionei o código novo que você mandou, que tem o efeito de zoom no hover
export function AnimatedImageFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl ${className}`}>
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        className="h-full w-full"
      >
        {/* O "group-hover" faz o zoom lento ao passar o mouse */}
        <div className="h-full w-full transition-transform duration-700 will-change-transform group-hover:scale-105">
          {children}
        </div>
      </motion.div>

      {/* Sombra leve que some ao passar o mouse */}
      <div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0"></div>
    </div>
  );
}

// --- 3. CONTAINER (MANTIDO) ---
// Essencial para o layout não quebrar nas laterais
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>
      {children}
    </div>
  );
}

// --- 4. SECTION (MANTIDO) ---
// Base para o espaçamento das seções
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

// --- 5. FEATURE CARD (MANTIDO) ---
// Usado na seção de benefícios
export function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: any;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full" width="100%">
      <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-sky-200/50">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
          <Icon size={24} />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}
