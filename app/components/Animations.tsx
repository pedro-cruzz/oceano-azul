// src/components/Animations.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// --- COMPONENTE 1: REVEAL (Para textos, títulos e blocos) ---
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
        viewport={{ once: true, margin: "-100px" }} // Ativa um pouco antes de entrar totalmente na tela
        transition={{ duration: 0.7, delay: delay, ease: [0.25, 0.4, 0.25, 1] }} // Curva de animação suave
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- COMPONENTE 2: MOLDURA DE IMAGEM ANIMADA ---
// Para usar em volta dos seus componentes <Image /> ou divs com background
export function AnimatedImageFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // O overflow-hidden é essencial para o zoom não vazar
    <div className={`group relative overflow-hidden rounded-3xl ${className}`}>
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }} // Começa um pouco maior e invisível
        whileInView={{ scale: 1, opacity: 1 }} // Revela e volta ao tamanho normal
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        className="h-full w-full"
      >
        {/* O "group-hover" do Tailwind faz o zoom lento ao passar o mouse */}
        <div className="h-full w-full transition-transform duration-700 will-change-transform group-hover:scale-105">
          {children}
        </div>
      </motion.div>
      
      {/* Opcional: uma leve sombra escura que some ao passar o mouse para dar mais "vida" */}
      <div className="pointer-events-none absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0"></div>
    </div>
  );
}