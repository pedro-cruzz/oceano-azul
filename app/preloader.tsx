"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Fan, Zap } from "lucide-react";

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [startExit, setStartExit] = useState(false);

  useEffect(() => {
    // Timer de 3.5 segundos
    const timer = setTimeout(() => {
      setStartExit(true);
      setTimeout(onComplete, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Componente Visual do Drone
  const CodeDrone = () => (
    <div className="relative w-40 h-40 flex items-center justify-center z-10">
      {/* 1. Estrutura em X */}
      <div className="absolute w-[120%] h-2 bg-slate-700 rounded-full rotate-45"></div>
      <div className="absolute w-[120%] h-2 bg-slate-700 rounded-full -rotate-45"></div>

      {/* 2. Corpo Central */}
      <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] border-2 border-blue-400">
        <Zap className="text-white w-8 h-8 fill-white" />
      </div>

      {/* 3. Hélices */}
      {[
        { t: "-top-2", l: "-left-2", r: 360 },
        { t: "-top-2", l: "-right-2", r: -360 },
        { t: "-bottom-2", l: "-left-2", r: -360 },
        { t: "-bottom-2", l: "-right-2", r: 360 },
      ].map((prop, i) => (
        <motion.div
          key={i}
          animate={{ rotate: prop.r }}
          transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
          className={`absolute ${prop.t} ${prop.l} bg-slate-800 rounded-full p-1 border border-slate-600 shadow-lg`}
        >
          <Fan className="text-sky-400 w-10 h-10 opacity-80" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={startExit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[9999] bg-[#0f172a] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. TEXTO (AGORA FICA NO TOPO) */}
      <motion.p
        animate={startExit ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        className="text-sky-500 font-bold tracking-[0.3em] text-xs uppercase mb-12 animate-pulse"
      >
        LIGANDO MOTORES...
      </motion.p>

      {/* 2. DRONE E CORDAS (AGORA FICAM EMBAIXO DO TEXTO) */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ y: 0, scale: 1 }}
        animate={
          startExit ? { y: -600, scale: 1.5, rotate: 0 } : { y: [-10, 10, -10] }
        }
        transition={
          startExit
            ? { duration: 0.8, ease: "backIn" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* AS CORDAS (SVG) */}
        <svg
          className="absolute w-[600px] h-[600px] -top-20 z-0 pointer-events-none opacity-60"
          viewBox="0 0 100 100"
        >
          {/* Corda Esquerda */}
          <motion.path
            d="M 50 50 Q 40 80 0 150"
            animate={
              startExit
                ? { d: "M 50 50 L 0 150" }
                : { d: "M 50 50 Q 40 80 0 150" }
            }
            transition={{ duration: 0.8, ease: "backIn" }}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          {/* Corda Direita */}
          <motion.path
            d="M 50 50 Q 60 80 100 150"
            animate={
              startExit
                ? { d: "M 50 50 L 100 150" }
                : { d: "M 50 50 Q 60 80 100 150" }
            }
            transition={{ duration: 0.8, ease: "backIn" }}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        <CodeDrone />
      </motion.div>
    </motion.div>
  );
}

export default Preloader;
