"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  FileDown,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  LayoutDashboard,
  Zap,
  ChevronRight,
  Bell,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  Map,
  Shield,
  Paperclip,
  Cloud,
  Smartphone,
  Clock

} from "lucide-react"

// --- COMPONENTES DE ANIMAÇÃO ---

function Reveal({
  children,
  delay = 0,
  width = "fit-content",
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  width?: "fit-content" | "100%"
  className?: string
}) {
  return (
    <div style={{ width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function AnimatedImageFrame({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="h-full w-full transition-transform duration-700 will-change-transform group-hover:scale-[1.01]">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
    </motion.div>
  )
}

// --- COMPONENTES ATÓMICOS ---

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`py-20 md:py-32 relative overflow-hidden ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

function Badge({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-1 text-xs font-semibold text-sky-700 backdrop-blur-sm transition-colors hover:bg-sky-100">
      {Icon && <Icon size={12} />}
      {children}
    </span>
  )
}

function PrimaryButton({
  children,
  rightIcon,
}: {
  children: React.ReactNode
  rightIcon?: boolean
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-8 font-medium text-white shadow-lg transition-all hover:bg-slate-800 ring-offset-2 focus:ring-2 focus:ring-slate-900"
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {rightIcon && (
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        )}
      </span>
    </motion.button>
  )
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 active:scale-[0.98]"
    >
      {children}
    </motion.button>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  className = "",
  delay = 0,
}: {
  icon: any
  title: string
  desc: string
  className?: string
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="h-full" width="100%">
      <div
        className={`group relative h-full overflow-hidden rounded-3xl border border-slate-200/60 bg-white/60 p-8 shadow-sm transition-all hover:shadow-xl hover:border-sky-200/50 hover:bg-white/90 backdrop-blur-sm ${className}`}
      >
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
          <Icon size={24} />
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
      </div>
    </Reveal>
  )
}

function SolutionBlock({
  kicker,
  title,
  desc,
  bullets,
  reverse,
  imageSrc,
}: {
  kicker: string
  title: string
  desc: string
  bullets: string[]
  reverse?: boolean
  imageSrc?: string
}) {
  return (
    <div className={`flex flex-col gap-12 lg:flex-row lg:items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
      <div className="flex-1">
        <Reveal>
          <Badge icon={Zap}>{kicker}</Badge>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h3>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{desc}</p>
        </Reveal>
        
        <div className="mt-8 space-y-4">
          {bullets.map((b, i) => (
            <Reveal key={b} delay={0.3 + (i * 0.1)}>
              <div className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <CheckCircle2 size={12} />
                </div>
                <span>{b}</span>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.5}>
          <div className="mt-8">
            <button className="text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1">
              Explorar detalhes <ChevronRight size={14}/>
            </button>
          </div>
        </Reveal>
      </div>

      <div className="flex-1 relative">
        <AnimatedImageFrame className="aspect-[4/3] w-full shadow-2xl bg-slate-100">
            {imageSrc ? (
               <Image 
                 src={imageSrc} 
                 alt={title}
                 fill 
                 className="object-cover"
               />
            ) : (
              <div className="relative h-full w-full bg-gradient-to-br from-slate-50 to-slate-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-slate-400 font-medium">Sem imagem definida</span>
                  </div>
                  <div className="absolute top-4 left-4 right-4 h-full bg-white rounded-t-xl shadow-inner p-4 opacity-80">
                      <div className="flex gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-400/60"/>
                          <div className="w-3 h-3 rounded-full bg-amber-400/60"/>
                          <div className="w-3 h-3 rounded-full bg-emerald-400/60"/>
                      </div>
                      <div className="space-y-3">
                          <div className="h-4 w-1/3 bg-slate-100 rounded"/>
                          <div className="h-24 w-full bg-slate-50 rounded border border-slate-100"/>
                          <div className="h-24 w-full bg-slate-50 rounded border border-slate-100"/>
                      </div>
                  </div>
              </div>
            )}
        </AnimatedImageFrame>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -bottom-6 -left-6 z-10 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-xl backdrop-blur-md"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                    <CheckCircle2 size={20}/>
                </div>
                <div>
                    <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Eficiência</div>
                    <div className="text-lg font-bold text-slate-900">+45% Otimização</div>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  )
}

// --- PÁGINA PRINCIPAL ---

export default function Page() {
  // --- ESTADO PARA CONTROLAR A ABA ATIVA DO MOCKUP ---
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-sky-100 selection:text-sky-900 font-sans">
      
      {/* BACKGROUND GLOBAL */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            style={{ maskImage: "radial-gradient(ellipse at center, black, transparent 80%)" }}
        />
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-sky-200/20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-teal-200/20 blur-[100px]" />
      </div>

      <motion.nav 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-6 left-1/2 z-50 w-full max-w-4xl px-4"
      >
        <div className="flex items-center justify-between rounded-full border border-white/40 bg-white/80 px-6 py-3 shadow-lg shadow-slate-200/20 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-sm">
                    <LayoutDashboard size={18} />
                </div>
                <a href="#"><span className="font-bold text-slate-900 tracking-tight">IJA System</span></a>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <a href="#solucoes" className="hover:text-sky-600 transition-colors">Soluções</a>
                <a href="#recursos" className="hover:text-sky-600 transition-colors">Recursos</a>
                <a href="#contato" className="hover:text-sky-600 transition-colors">Contato</a>
            </div>

            <div className="flex items-center gap-3">
                <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-800">
                    Demo
                </button>
            </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <Section className="pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="relative z-10 flex flex-col items-center text-center">
            <Reveal>
              <Badge icon={Sparkles}>Novo módulo de Analytics 2.0 disponível</Badge>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
                  O sistema operacional da sua <br/>
                  <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">frota de drones.</span>
              </h1>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
                  Centralize operações, automatize relatórios e ganhe visibilidade total. 
                  De pulverização agrícola a inspeções urbanas em uma única plataforma.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <PrimaryButton rightIcon>Agendar Apresentação</PrimaryButton>
                  <SecondaryButton>Ver Vídeo Demo</SecondaryButton>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-12 flex items-center gap-8 text-slate-400 grayscale opacity-60">
                  <span className="font-bold text-lg">AGROTECH</span>
                  <span className="font-bold text-lg">URBAN FLY</span>
                  <span className="font-bold text-lg">DRONE LOG</span>
                  <span className="font-bold text-lg">CITY MAP</span>
              </div>
            </Reveal>
        </div>

        {/* --- MOCKUP INTERATIVO ATUALIZADO --- */}
        <div className="relative z-10 mt-20 mx-auto max-w-5xl">
            <AnimatedImageFrame className="shadow-2xl bg-white backdrop-blur-xl border border-slate-200/80">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-sky-500/20 blur-3xl rounded-full"></div>
                
                {/* Barra de Título */}
                <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-400 font-mono">
                    app.ijasystem.com/{activeTab}
                  </div>
                  <div className="w-10 flex justify-end text-slate-300">
                    <Bell size={14} />
                  </div>
                </div>

                {/* Corpo do Sistema */}
                <div className="flex aspect-[16/9] w-full bg-slate-50/50 overflow-hidden text-left font-sans">
                  
                  {/* SIDEBAR INTERATIVA */}
                  <div className="w-16 md:w-48 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between py-4">
                    <div>
                      {/* Logo Area */}
                      <div className="px-4 mb-6 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-sky-600 flex items-center justify-center shadow-sm">
                          <Zap size={16} className="text-white fill-white" />
                        </div>
                        <span className="hidden md:block font-bold text-slate-800 text-sm">IJA System</span>
                      </div>

                      {/* Menu Items (BOTÕES) */}
                      <div className="space-y-1 px-2">
                        <button 
                          onClick={() => setActiveTab("dashboard")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                            activeTab === "dashboard" 
                              ? "bg-sky-50 border border-sky-100 text-sky-700" 
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          <LayoutDashboard size={16} />
                          <span className="hidden md:block">Dashboard</span>
                        </button>

                        <button 
                          onClick={() => setActiveTab("relatorios")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                            activeTab === "relatorios" 
                              ? "bg-sky-50 border border-sky-100 text-sky-700" 
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          <FileDown size={16} />
                          <span className="hidden md:block">Relatórios</span>
                        </button>

                        <button 
                          onClick={() => setActiveTab("agenda")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                            activeTab === "agenda" 
                              ? "bg-sky-50 border border-sky-100 text-sky-700" 
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          <CalendarDays size={16} />
                          <span className="hidden md:block">Agenda</span>
                        </button>

                        <button 
                          onClick={() => setActiveTab("pilotos")}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
                            activeTab === "pilotos" 
                              ? "bg-sky-50 border border-sky-100 text-sky-700" 
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          <Users size={16} />
                          <span className="hidden md:block">Pilotos</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* User Profile */}
                    <div className="px-3 hidden md:block">
                       <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-xs border border-sky-200">PH</div>
                          <div className="flex-1 min-w-0">
                             <div className="text-xs font-bold text-slate-700 truncate">Pedro H.</div>
                             <div className="text-[10px] text-slate-500">Admin</div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* CONTEÚDO PRINCIPAL (MUDA CONFORME O CLICK) */}
                  <div className="flex-1 overflow-hidden p-4 md:p-6 flex flex-col gap-5 relative bg-slate-50/50">
                    
                    {/* Header da Página */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg md:text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
                        {activeTab === 'dashboard' && <p className="text-xs text-slate-500 mt-1">Dados de Janeiro / 2026</p>}
                      </div>
                      <div className="hidden md:flex gap-2">
                         {activeTab === 'pilotos' ? (
                            <button className="h-8 px-3 rounded-lg bg-sky-600 text-white text-xs flex items-center gap-1 font-medium shadow-sm hover:bg-sky-700 transition-colors">
                                <Plus size={12}/> Novo Piloto
                            </button>
                         ) : (
                            <div className="h-8 px-3 rounded-lg border border-slate-200 bg-white text-slate-500 text-xs flex items-center gap-2 shadow-sm cursor-pointer hover:bg-slate-50">
                                <Filter size={12}/> Filtros
                            </div>
                         )}
                         {(activeTab === 'relatorios' || activeTab === 'pilotos' || activeTab === 'agenda') && (
                            <button className="h-8 px-3 rounded-lg border border-sky-100 bg-sky-50 text-sky-600 text-xs flex items-center gap-1 font-medium shadow-sm hover:bg-sky-100 transition-colors">
                                <Download size={12}/> Exportar
                            </button>
                         )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1 relative">
                    {/* LOGICA DE TROCA DE TELAS */}

                    {/* 1. TELA DASHBOARD (Painel de Gestão - Formulário Detalhado) */}
                    {activeTab === "dashboard" && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 h-full">
                            
                            {/* Header Interno com Botão Exportar */}
                            <div className="flex justify-between items-center mb-1">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Shield size={20} className="text-slate-700"/> Painel de Gestão
                                </h2>
                                <button className="h-8 px-4 rounded-lg bg-sky-500 text-white text-xs font-bold flex items-center gap-1 hover:bg-sky-600 shadow-sm transition-colors">
                                    <FileDown size={14}/> Exportar Excel
                                </button>
                            </div>

                            {/* Barra de Filtros */}
                            <div className="bg-white rounded-lg border border-slate-200 p-3 flex justify-between items-center shadow-sm cursor-pointer hover:bg-slate-50">
                                <div className="flex items-center gap-2 text-sm font-bold text-sky-600">
                                    <Filter size={16}/> Filtros de Busca
                                </div>
                                <ChevronRight size={16} className="text-slate-400 rotate-90"/>
                            </div>

                            {/* Card Principal - Formulário UVIS Teste QA */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row gap-6">
                                
                                {/* Coluna Esquerda: Informações Gerais */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-base font-bold text-sky-700">UVIS Teste QA</h3>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase">Aprovado</span>
                                            <span className="px-2 py-0.5 bg-slate-500 text-white text-[10px] font-bold rounded uppercase">Sul</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-xs text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={14} className="text-sky-500"/> 08/01/2026 às 13:00
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-sky-500"/> Avenida Paulista, 09 - Bela Vista
                                        </div>
                                        <div className="pl-6 text-slate-400">CEP: 01310-930</div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-sky-500 text-white rounded text-xs font-bold hover:bg-sky-600 shadow-sm">
                                            <Edit size={12}/> Editar
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600 shadow-sm">
                                            <Trash2 size={12}/> Deletar
                                        </button>
                                    </div>
                                </div>

                                {/* Coluna Central: Detalhes Técnicos */}
                                <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6">
                                    {/* Input de Coordenadas */}
                                    <div className="relative">
                                        <input type="text" value="-23.5581919, -46.6598461" readOnly className="w-full h-9 pl-3 pr-8 rounded border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none"/>
                                        <div className="absolute right-2 top-2 text-red-400 cursor-pointer"><Map size={16}/></div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-1 text-xs">
                                        <span className="text-slate-500">Tipo:</span> <span className="font-bold text-slate-800">Culex</span>
                                        <span className="text-slate-500">Altura:</span> <span className="font-bold text-slate-800">10m</span>
                                        <span className="text-slate-500">Foco:</span> <span className="font-bold text-slate-800">Imóvel Abandonado</span>
                                    </div>

                                    <div>
                                        <span className="text-xs text-slate-500 block mb-1">Apoio CET?</span>
                                        <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase">Não</span>
                                    </div>

                                    <div>
                                        <span className="text-xs text-slate-500 block mb-1">Observação</span>
                                        <input type="text" placeholder="OBS" className="w-full h-8 px-3 rounded border border-slate-200 bg-slate-50 text-xs focus:border-sky-500 focus:outline-none"/>
                                    </div>
                                </div>

                                {/* Coluna Direita: Ações e Status */}
                                <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6">
                                    <div className="flex gap-2">
                                        <input type="text" value="-23.5581919" readOnly className="w-1/2 h-9 px-3 rounded border border-slate-200 bg-slate-50 text-xs text-slate-600"/>
                                        <input type="text" value="-46.6598461" readOnly className="w-1/2 h-9 px-3 rounded border border-slate-200 bg-slate-50 text-xs text-slate-600"/>
                                    </div>
                                    <input type="text" value="BR-2025-XX80" readOnly className="w-full h-9 px-3 rounded border border-slate-200 bg-slate-50 text-xs text-slate-600"/>

                                    <div className="border border-slate-200 rounded-lg p-3 space-y-3">
                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1">Status</span>
                                            <div className="w-full h-8 px-3 rounded border border-slate-200 bg-white text-xs flex items-center justify-between cursor-pointer">
                                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Aprovar</div>
                                                <ChevronRight size={12} className="rotate-90 text-slate-400"/>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1">Piloto responsável</span>
                                            <div className="w-full h-8 px-3 rounded border border-slate-200 bg-white text-xs flex items-center justify-between cursor-pointer">
                                                <span>piloto 1 (LESTE)</span>
                                                <ChevronRight size={12} className="rotate-90 text-slate-400"/>
                                            </div>
                                        </div>

                                        <button className="w-full h-8 rounded border border-slate-300 bg-slate-50 text-slate-600 text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-100">
                                            <Paperclip size={12}/> Anexar
                                        </button>

                                        <button className="w-full h-8 rounded bg-sky-500 text-white text-xs font-bold hover:bg-sky-600 shadow-sm flex items-center justify-center gap-1">
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                       </motion.div>
                    )}
                    
                    {/* 2. TELA RELATÓRIOS (Baseada na Imagem 1) */}
                    {activeTab === "relatorios" && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 h-full">
                            {/* Cards de Estatísticas */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                              <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</div>
                                <div className="text-xl md:text-3xl font-bold text-slate-800 mt-1">5</div>
                              </div>
                              <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Aprovadas</div>
                                <div className="text-xl md:text-3xl font-bold text-slate-800 mt-1">1</div>
                              </div>
                              <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Em Análise</div>
                                <div className="text-xl md:text-3xl font-bold text-slate-800 mt-1">1</div>
                              </div>
                              <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Recusadas</div>
                                <div className="text-xl md:text-3xl font-bold text-slate-800 mt-1">0</div>
                              </div>
                            </div>

                            {/* Área de Gráficos */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
                              {/* Gráfico de Rosca */}
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                  <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2"><Sparkles size={14} className="text-sky-500"/> Status</h3>
                                  <div className="flex-1 flex items-center justify-center relative py-4">
                                    <div className="w-28 h-28 rounded-full border-4 border-slate-100" style={{ background: 'conic-gradient(#0ea5e9 0% 20%, #f59e0b 20% 40%, #e2e8f0 40% 100%)' }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                                          <span className="text-[10px] text-slate-400">Total</span>
                                          <span className="text-sm font-bold text-slate-800">5</span>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                                     <div className="flex items-center gap-1 text-[9px] text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>Aprovado (1)</div>
                                     <div className="flex items-center gap-1 text-[9px] text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>Análise (1)</div>
                                     <div className="flex items-center gap-1 text-[9px] text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>Pendente (3)</div>
                                  </div>
                              </div>
                              {/* Gráfico de Barras Horizontais */}
                              <div className="md:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                  <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2"><MapPin size={14} className="text-sky-500"/> Solicitações por Região</h3>
                                  <div className="flex-1 flex flex-col justify-center gap-4">
                                      <div className="flex items-center gap-3">
                                         <span className="text-xs font-medium text-slate-500 w-10">Oeste</span>
                                         <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                             <div className="h-full bg-sky-500 w-[80%] rounded-full"></div>
                                         </div>
                                         <span className="text-xs font-bold text-slate-700">4</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                         <span className="text-xs font-medium text-slate-500 w-10">Sul</span>
                                         <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                             <div className="h-full bg-sky-500 w-[20%] rounded-full"></div>
                                         </div>
                                         <span className="text-xs font-bold text-slate-700">1</span>
                                      </div>
                                      <div className="flex items-center gap-3 opacity-50">
                                         <span className="text-xs font-medium text-slate-500 w-10">Norte</span>
                                         <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                             <div className="h-full bg-slate-200 w-[0%] rounded-full"></div>
                                         </div>
                                         <span className="text-xs font-bold text-slate-700">0</span>
                                      </div>
                                  </div>
                              </div>
                            </div>
                       </motion.div>
                    )}

                    {/* 3. TELA AGENDA (Baseada na Imagem 3 - Calendário) */}
                    {activeTab === "agenda" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                            {/* Cabeçalho do Calendário */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                                <div className="flex gap-1">
                                    <button className="p-1 rounded hover:bg-slate-100 text-slate-500"><ChevronRight size={16} className="rotate-180"/></button>
                                    <button className="p-1 rounded hover:bg-slate-100 text-slate-500"><ChevronRight size={16}/></button>
                                    <button className="px-3 py-1 rounded border border-slate-200 text-xs font-medium text-slate-600 ml-2 hover:bg-slate-50">Hoje</button>
                                </div>
                                <h3 className="text-sm font-bold text-slate-800 capitalize">Janeiro de 2026</h3>
                                <div className="flex bg-slate-100 p-0.5 rounded-lg">
                                    <button className="px-3 py-1 bg-white rounded-md shadow-sm text-xs font-bold text-sky-700">Mês</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-700">Lista</button>
                                </div>
                            </div>
                            
                            {/* Grid do Calendário */}
                            <div className="flex-1 overflow-auto bg-slate-50">
                                <div className="grid grid-cols-7 gap-px bg-slate-200 border-b border-slate-200">
                                    {['DOM.', 'SEG.', 'TER.', 'QUA.', 'QUI.', 'SEX.', 'SÁB.'].map(day => (
                                        <div key={day} className="bg-slate-50 py-2 text-center text-[10px] font-bold text-slate-400 uppercase">{day}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 grid-rows-5 gap-px bg-slate-200 h-full min-h-[400px]">
                                    {/* Dias do Mês (Exemplo Simplificado) */}
                                    {Array.from({ length: 35 }).map((_, i) => {
                                        const day = i - 3; // Ajuste para começar no dia certo
                                        const isToday = day === 12;
                                        const hasEvent1 = day === 7;
                                        const hasEvent2 = day === 10;
                                        return (
                                        <div key={i} className={`bg-white p-2 flex flex-col relative ${day < 1 || day > 31 ? 'bg-slate-50/50 text-slate-300' : ''}`}>
                                            <span className={`text-xs font-medium mb-1 ${isToday ? 'bg-sky-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-600'}`}>
                                                {day > 0 && day <= 31 ? day : ''}
                                            </span>
                                            {/* Eventos Fake */}
                                            {hasEvent1 && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="px-2 py-1 rounded bg-sky-100 text-sky-700 text-[9px] font-bold truncate border border-sky-200">12:45 Terreno Baldi</div>
                                                    <div className="px-2 py-1 rounded bg-sky-100 text-sky-700 text-[9px] font-bold truncate border border-sky-200">13:00 Imóvel Abandon.</div>
                                                </div>
                                            )}
                                             {hasEvent2 && (
                                                <div className="px-2 py-1 rounded bg-sky-100 text-sky-700 text-[9px] font-bold truncate border border-sky-200">11:00 Piscina / Caixa D</div>
                                            )}
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* 4. TELA PILOTOS (Baseada na Imagem 4) */}
                    {activeTab === "pilotos" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                             <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-sm font-bold text-slate-700">Total de registros: 5</h3>
                             </div>
                             <div className="flex-1 overflow-auto">
                                <table className="w-full text-left text-xs md:text-sm">
                                    <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                                        <tr>
                                            <th className="px-4 py-3">ID</th>
                                            <th className="px-4 py-3">Nome</th>
                                            <th className="px-4 py-3 hidden md:table-cell">Região</th>
                                            <th className="px-4 py-3 hidden md:table-cell">Telefone</th>
                                            <th className="px-4 py-3 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 bg-white">
                                        {[
                                            { id: "#1", name: "piloto 1", region: "LESTE", phone: "(99) 99999-9999" },
                                            { id: "#2", name: "piloto 2", region: "NORTE", phone: "(35) 90000-0000" },
                                            { id: "#3", name: "piloto 3", region: "OESTE", phone: "(22) 22222-2222" },
                                            { id: "#4", name: "piloto 4", region: "LESTE", phone: "(35) 99999-2222" },
                                            { id: "#5", name: "Piloto 5", region: "OESTE", phone: "(11) 99999-9999" },
                                        ].map((piloto, i) => (
                                        <tr key={piloto.id} className={`hover:bg-sky-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30'}`}>
                                            <td className="px-4 py-3 font-mono text-sky-600 font-bold">{piloto.id}</td>
                                            <td className="px-4 py-3 font-bold text-slate-700">{piloto.name}</td>
                                            <td className="px-4 py-3 hidden md:table-cell"><span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase">{piloto.region}</span></td>
                                            <td className="px-4 py-3 text-slate-500 hidden md:table-cell font-medium">{piloto.phone}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="flex items-center gap-1 px-2 py-1 bg-teal-50 text-teal-600 border border-teal-100 rounded text-[10px] font-bold hover:bg-teal-100 transition-colors"><Edit size={10}/> Editar</button>
                                                    <button className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 border border-red-100 rounded text-[10px] font-bold hover:bg-red-100 transition-colors"><Trash2 size={10}/> Excluir</button>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </motion.div>
                    )}
                    </div>

                  </div>
                </div>
            </AnimatedImageFrame>
        </div>
      </Section>

      {/* BENTO GRID DE RECURSOS */}
      {/* BENTO GRID DE RECURSOS (8 ITENS - BASEADO NA SUA IMAGEM) */}
      <Section id="recursos">
        <div className="text-center mb-16">
            <Reveal width="100%">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  Tudo que sua operação precisa
              </h2>
            </Reveal>
            <Reveal width="100%" delay={0.1}>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
                  Ferramentas construídas especificamente para gestores de frotas e pilotos.
              </p>
            </Reveal>
        </div>

        {/* Grid ajustado para 4 colunas (lg) ou 2 colunas (sm) para caber 8 itens perfeitamente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <FeatureCard
                title="Mapeamento Inteligente"
                desc="Planejamento automático de rotas e áreas de cobertura."
                icon={MapPin}
                delay={0}
            />
            
            <FeatureCard
                title="Analytics Avançado"
                desc="Relatórios detalhados e métricas em tempo real de todas as operações."
                icon={BarChart3}
                delay={0.1}
            />

            <FeatureCard
                title="Cloud Computing"
                desc="Acesse seus dados de qualquer lugar, com sincronização automática."
                icon={Cloud}
                delay={0.2}
            />

            <FeatureCard
                title="Processamento Rápido"
                desc="Tecnologia de ponta para processamento de dados instantâneo."
                icon={Zap}
                delay={0.7}
            />

            <FeatureCard
                title="App Mobile"
                desc="Controle completo através de aplicativo iOS e Android."
                icon={Smartphone}
                delay={0.4}
            />

            <FeatureCard
                title="Otimização de Tempo"
                desc="Reduza até 60% do tempo de planejamento e operação."
                icon={Clock}
                delay={0.5}
            />

            <FeatureCard
                title="Multi-usuário"
                desc="Gestão de equipes com diferentes níveis de permissão."
                icon={Users}
                delay={0.6}
            />

            <FeatureCard
                title="Segurança Total"
                desc="Criptografia de ponta a ponta e backup automático dos dados."
                icon={ShieldCheck}
                delay={0.3}
            />
            
        </div>
      </Section>

      {/* SOLUÇÕES (Zig Zag) */}
      <Section id="solucoes" className="bg-white">
        <div className="space-y-32">
            
            <SolutionBlock 
                kicker="Agricultura de Precisão"
                title="Pulverização Agrícola Controlada"
                desc="Elimine planilhas e mensagens de WhatsApp. Tenha um fluxo padronizado de solicitação de voos, com cálculo de área, insumos e relatórios de aplicação automática."
                imageSrc="/images/drone-agro.png" // Descomente e coloque o caminho da sua imagem
                bullets={[
                    "Registro de condições climáticas",
                    "Mapeamento de área aplicada",
                    "Controle de estoque de insumos",
                    "Histórico de produtividade por piloto"
                ]}
            />
            
            <SolutionBlock 
                reverse
                kicker="Gestão Pública"
                title="Combate à Dengue & Inspeções"
                desc="Ferramenta essencial para prefeituras e órgãos de saúde. Mapeie focos, gere evidências visuais e acompanhe o progresso das equipes de campo em tempo real."
                imageSrc="/images/drone-dengue.png" // Descomente e coloque o caminho da sua imagem
                bullets={[
                    "Mapa de calor de focos",
                    "Registro fotográfico antes/depois",
                    "Divisão por bairros e zonas",
                    "Relatórios de conformidade para o estado"
                ]}
            />
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section id="contato" className="pb-10">
        <Reveal width="100%">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-20 text-center sm:px-12 md:py-28 shadow-2xl">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/30 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/30 blur-[100px] rounded-full" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                      Pronto para profissionalizar sua operação?
                  </h2>
                  <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
                      Junte-se a empresas que reduziram em 40% o tempo administrativo de suas frotas de drones.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-14 rounded-full bg-white px-8 text-lg font-bold text-slate-900 transition hover:bg-sky-50"
                      >
                          Solicitar Demonstração
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-14 rounded-full border border-white/20 px-8 text-lg font-bold text-white transition hover:bg-white/10"
                      >
                          Falar com Consultor
                      </motion.button>
                  </div>
                  <p className="mt-8 text-sm text-slate-500">
                      Sem cartão de crédito necessário para teste de 14 dias.
                  </p>
              </div>
          </div>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <Container>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-slate-900"/>
                    <span className="font-bold text-slate-900">IJA System</span>
                </div>
                <div className="text-sm text-slate-500">
                    © 2026 IJA System. Feito com tecnologia de ponta.
                </div>
                <div className="flex gap-6">
                   <div className="w-5 h-5 bg-slate-200 rounded-full hover:bg-sky-500 transition-colors cursor-pointer"/>
                   <div className="w-5 h-5 bg-slate-200 rounded-full hover:bg-sky-500 transition-colors cursor-pointer"/>
                   <div className="w-5 h-5 bg-slate-200 rounded-full hover:bg-sky-500 transition-colors cursor-pointer"/>
                </div>
            </div>
        </Container>
      </footer>
    </main>
  )
}