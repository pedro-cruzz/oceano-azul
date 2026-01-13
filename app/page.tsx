"use client"

import React, { useState } from "react"
import Image from "next/image"
// ADICIONADO: Hooks para a física do drone
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useForm, ValidationError } from '@formspree/react';
import {
  // Ícones
  ArrowRight, Menu, X, Phone, Mail, Facebook, Instagram, Linkedin,
  LayoutDashboard, FileDown, CalendarDays, Users, Bell, Search, Filter,
  Plus, Edit, Trash2, MapPin, Map, Shield, Zap, Sparkles, BarChart3,
  Bot, ShieldCheck, Cloud, Smartphone, Clock, Leaf, Droplets, Timer,
  Target, TrendingUp, Download, CheckCircle2, DollarSign, ChevronRight,
  Paperclip
} from "lucide-react"

// ==============================================================================
// 1. UTILITÁRIOS (ANIMAÇÕES E LAYOUT)
// ==============================================================================

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
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
}

function Section({ id, children, className = "" }: { id?: string, children: React.ReactNode, className?: string }) {
  return (
    <section id={id} className={`py-20 md:py-32 relative overflow-hidden ${className}`}>
      {children}
    </section>
  )
}

function FeatureCard({ icon: Icon, title, desc, delay = 0 }: { icon: any, title: string, desc: string, delay?: number }) {
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
  )
}

function SolutionBlock({ kicker, title, desc, bullets, reverse, imageSrc }: { kicker: string, title: string, desc: string, bullets: string[], reverse?: boolean, imageSrc?: string }) {
  return (
    <div className={`flex flex-col gap-12 lg:flex-row lg:items-center ${reverse ? "lg:flex-row-reverse" : ""}`}>
      <div className="flex-1">
        <Reveal><span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-1 text-xs font-semibold text-sky-700 backdrop-blur-sm"><Zap size={12}/>{kicker}</span></Reveal>
        <Reveal delay={0.1}><h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h3></Reveal>
        <Reveal delay={0.2}><p className="mt-4 text-lg text-slate-600 leading-relaxed">{desc}</p></Reveal>
        <div className="mt-8 space-y-4">
          {bullets.map((b, i) => (
            <Reveal key={b} delay={0.3 + (i * 0.1)}>
              <div className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600"><CheckCircle2 size={12} /></div>
                <span>{b}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <div className="mt-8">
            <button className="text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1">Explorar detalhes <ChevronRight size={14}/></button>
          </div>
        </Reveal>
      </div>
      <div className="flex-1 relative">
        <AnimatedImageFrame className="aspect-[4/3] w-full shadow-2xl bg-slate-100 border border-slate-200">
            {imageSrc ? (
               <Image src={imageSrc} alt={title} fill className="object-cover" />
            ) : (
              <div className="relative h-full w-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                  <span className="text-slate-400 font-medium flex items-center gap-2"><Cloud size={20}/> Imagem Ilustrativa</span>
              </div>
            )}
        </AnimatedImageFrame>
      </div>
    </div>
  )
}

// ==============================================================================
// 2. VIEW: IJA DRONES (O SOFTWARE/SaaS) - COMPLETO
// ==============================================================================

function IjaDronesView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [state, handleSubmit] = useForm("mojjqbek");

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs md:text-sm transition-all ${
        activeTab === id ? "bg-sky-50 border border-sky-100 text-sky-700" : "text-slate-500 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} /><span className="hidden md:block">{label}</span>
    </button>
  )

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* NAVBAR IGUAL OCEANO AZUL (BRANCO) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 h-20">
        <Container>
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 hover:bg-sky-200 transition-colors">
                        <ArrowRight className="rotate-180" size={18}/>
                    </div>
                    <span className="font-bold text-slate-700 hover:text-sky-600 transition-colors">Voltar para AgroAzul</span>
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                    <span className="text-sm font-medium text-slate-500">IJA System v2.0</span>
                    <button className="bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-sky-600/20 hover:bg-sky-700 transition-all">
                        Acessar Sistema
                    </button>
                </div>
                <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu/></button>
            </div>
        </Container>
      </nav>

      {/* HERO SECTION IJA DRONES (COM FOTO FLUTUANTE) */}
      <section className="pt-32 pb-16 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
         <Container>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 text-center lg:text-left z-10">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold mb-6 border border-sky-100">
                            <Zap size={12}/> Software de Gestão Especializado
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                            O sistema operacional da sua <span className="text-sky-600">frota de drones.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Centralize operações, automatize relatórios e ganhe visibilidade total. 
                            De pulverização agrícola a inspeções urbanas em uma única plataforma.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="px-8 py-3.5 bg-sky-600 text-white rounded-full font-bold shadow-lg hover:bg-sky-700 transition-all">Agendar Demo</button>
                            <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all">Ver Recursos</button>
                        </div>
                    </Reveal>
                </div>

                {/* Lado Direito: Imagem do Drone "Flutuando" */}
                <div className="flex-1 relative w-full flex justify-center items-center">
                    <Reveal delay={0.4} className="relative w-full max-w-2xl aspect-square">
                        {/* Efeito de brilho no fundo */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-100/50 rounded-full blur-3xl -z-10"></div>
                        
                        {/* Movimento de Flutuar */}
                        <motion.div 
                            animate={{ y: [0, -25, 0] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                            className="relative w-full h-full"
                        >
                            <div className="relative w-full h-full bg-slate-200 rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex items-center justify-center">
                                
                                {/* 1. Ícone de Fallback (Aparece se a imagem falhar) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 z-0">
                                    <Cloud size={64} className="mb-2 opacity-50"/>
                                    <span className="text-xs font-bold">A imagem não carregou</span>
                                    <span className="text-[10px]">Verifique se o arquivo está em: public/drone.png</span>
                                </div>

                                {/* 2. A Imagem Real (Cobre o ícone se carregar) */}
                                <Image 
                                    src="/drone.png"  // <--- CAMINHO SIMPLIFICADO
                                    alt="Drone IJA System"
                                    fill 
                                    className="object-cover z-10" // z-10 garante que fique por cima do texto
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </motion.div>
                    </Reveal>
                </div>
            </div>
         </Container>
      </section>

      {/* TÍTULO ANTES DO MOCKUP */}
      <section className="py-10 bg-slate-50">
          <Container>
              <div className="text-center max-w-3xl mx-auto mb-12">
                  <Reveal><h2 className="text-3xl font-bold text-slate-900 mb-4">Poder e Controle na Palma da Mão</h2></Reveal>
                  <Reveal delay={0.1}><p className="text-slate-600">Nossa interface foi desenhada para facilitar a vida do gestor. Acompanhe cada detalhe da operação em tempo real.</p></Reveal>
              </div>
          </Container>
      </section>

      {/* MOCKUP INTERATIVO */}
      <div className="max-w-7xl mx-auto px-4 mb-32 -mt-8">
        <AnimatedImageFrame className="shadow-2xl border border-slate-200 bg-white">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-4">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-amber-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/></div>
                <div className="flex-1 bg-white border border-slate-200 h-6 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-mono">app.ijasystem.com/{activeTab}</div>
                <div className="w-10 flex justify-end text-slate-300"><Bell size={14} /></div>
            </div>

            <div className="flex h-[700px] bg-slate-50/30 text-left">
                <div className="w-16 md:w-56 bg-white border-r border-slate-200 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-8 text-slate-800 font-bold"><div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center text-white"><Zap size={16} fill="currentColor"/></div><span className="hidden md:inline">IJA System</span></div>
                        <div className="space-y-1">
                            <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
                            <SidebarItem id="relatorios" icon={FileDown} label="Relatórios" />
                            <SidebarItem id="agenda" icon={CalendarDays} label="Agenda" />
                            <SidebarItem id="pilotos" icon={Users} label="Pilotos" />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"><div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-xs font-bold text-sky-700">PH</div><div className="text-xs"><div className="font-bold text-slate-700">Pedro H.</div><div className="text-slate-400">Admin</div></div></div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
                        <div className="flex gap-2">
                             {activeTab === 'pilotos' ? (
                                <button className="h-8 px-3 rounded-lg bg-sky-600 text-white text-xs flex items-center gap-1 font-medium shadow-sm hover:bg-sky-700 transition-colors"><Plus size={12}/> Novo Piloto</button>
                            ) : (
                                <button className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 shadow-sm flex items-center gap-2"><Filter size={14}/> Filtros</button>
                            )}
                            {(activeTab === 'dashboard' || activeTab === 'relatorios' || activeTab === 'pilotos') && <button className="h-8 px-3 bg-sky-50 border border-sky-100 rounded-lg text-xs font-medium text-sky-600 shadow-sm flex items-center gap-2"><Download size={14}/> Exportar</button>}
                        </div>
                    </div>
                    
                    <div className="flex-1 min-h-0 relative">
                        {activeTab === 'dashboard' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 h-full">
                                <div className="flex justify-between items-center mb-1">
                                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Shield size={20} className="text-slate-700"/> Detalhes da Ocorrência</h2>
                                </div>
                                <div className="bg-white rounded-lg border border-slate-200 p-3 flex justify-between items-center shadow-sm cursor-pointer hover:bg-slate-50">
                                    <div className="flex items-center gap-2 text-sm font-bold text-sky-600"><Filter size={16}/> Filtros de Busca</div>
                                    <ChevronRight size={16} className="text-slate-400 rotate-90"/>
                                </div>
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h3 className="text-base font-bold text-sky-700">UVIS Teste QA</h3>
                                            <div className="flex gap-2 mt-2">
                                                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase">Aprovado</span>
                                                <span className="px-2 py-0.5 bg-slate-500 text-white text-[10px] font-bold rounded uppercase">Sul</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-xs text-slate-600">
                                            <div className="flex items-center gap-2"><CalendarDays size={14} className="text-sky-500"/> 08/01/2026 às 13:00</div>
                                            <div className="flex items-center gap-2"><MapPin size={14} className="text-sky-500"/> Av. Paulista, 09 - Bela Vista</div>
                                            <div className="pl-6 text-slate-400">CEP: 01310-930</div>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <button className="flex items-center gap-1 px-3 py-1.5 bg-sky-500 text-white rounded text-xs font-bold hover:bg-sky-600 shadow-sm"><Edit size={12}/> Editar</button>
                                            <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded text-xs font-bold hover:bg-red-600 shadow-sm"><Trash2 size={12}/> Deletar</button>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6 text-xs">
                                        <div className="relative"><input type="text" value="-23.55819, -46.65984" readOnly className="w-full h-9 pl-3 pr-8 rounded border border-slate-200 bg-slate-50 text-slate-700"/><div className="absolute right-2 top-2 text-red-400"><Map size={16}/></div></div>
                                        <div className="grid grid-cols-2 gap-y-1"><span className="text-slate-500">Tipo:</span> <span className="font-bold text-slate-800">Culex</span><span className="text-slate-500">Foco:</span> <span className="font-bold text-slate-800">Imóvel Abandonado</span></div>
                                    </div>
                                    <div className="flex-1 space-y-3 border-l border-slate-100 pl-0 md:pl-6">
                                        <div className="border border-slate-200 rounded-lg p-3 space-y-3">
                                            <div><span className="text-xs text-slate-500 block mb-1">Status</span><div className="w-full h-8 px-3 rounded border border-slate-200 bg-white text-xs flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Aprovar</div><ChevronRight size={12} className="rotate-90 text-slate-400"/></div></div>
                                            <button className="w-full h-8 rounded bg-sky-500 text-white text-xs font-bold hover:bg-sky-600 shadow-sm">Salvar</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'relatorios' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5 h-full">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="text-[10px] font-bold text-slate-400">TOTAL</div><div className="text-2xl font-bold text-slate-800">5</div></div>
                                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="text-[10px] font-bold text-slate-400">APROVADAS</div><div className="text-2xl font-bold text-slate-800">1</div></div>
                                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="text-[10px] font-bold text-slate-400">EM ANÁLISE</div><div className="text-2xl font-bold text-slate-800">1</div></div>
                                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="text-[10px] font-bold text-slate-400">RECUSADAS</div><div className="text-2xl font-bold text-slate-800">0</div></div>
                                </div>
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500"><tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Tipo</th><th className="px-4 py-3">Status</th></tr></thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr><td className="px-4 py-3 text-slate-500">#RP-001</td><td className="px-4 py-3">Vistoria</td><td className="px-4 py-3"><span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold text-[9px]">Aprovado</span></td></tr>
                                            <tr><td className="px-4 py-3 text-slate-500">#RP-002</td><td className="px-4 py-3">Mapeamento</td><td className="px-4 py-3"><span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold text-[9px]">Análise</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'agenda' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                                    <div className="flex gap-1"><button className="p-1 text-slate-500"><ChevronRight size={16} className="rotate-180"/></button><button className="p-1 text-slate-500"><ChevronRight size={16}/></button></div>
                                    <h3 className="text-sm font-bold text-slate-800">Janeiro 2026</h3>
                                    <button className="px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">Hoje</button>
                                </div>
                                <div className="flex-1 bg-slate-50 grid grid-cols-7 gap-px">
                                    {[...Array(35)].map((_, i) => (
                                        <div key={i} className="bg-white p-1 min-h-[40px]">
                                            <span className="text-[10px] text-slate-400 font-medium">{i > 2 && i < 34 ? i - 2 : ''}</span>
                                            {i === 12 && <div className="mt-1 bg-sky-100 text-sky-700 text-[8px] font-bold px-1 rounded truncate">Vistoria Sul</div>}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'pilotos' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                                 <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center"><h3 className="text-sm font-bold text-slate-700">Total: 5</h3></div>
                                 <div className="flex-1 overflow-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]"><tr><th className="px-4 py-3">Nome</th><th className="px-4 py-3">Região</th><th className="px-4 py-3 text-right">Ações</th></tr></thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {[1,2,3,4,5].map((i) => (
                                            <tr key={i}>
                                                <td className="px-4 py-3 font-bold text-slate-700">Piloto {i}</td>
                                                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold text-slate-500">NORTE</span></td>
                                                <td className="px-4 py-3 text-right"><button className="text-sky-600 font-bold hover:underline">Editar</button></td>
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

      <Section id="recursos">
        <Container>
            <div className="text-center mb-16">
                <Reveal><h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Tudo que sua operação precisa</h2></Reveal>
                <Reveal delay={0.1}><p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">Ferramentas construídas especificamente para gestores de frotas e pilotos.</p></Reveal>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard title="Mapeamento Inteligente" desc="Planejamento automático de rotas e áreas." icon={MapPin} delay={0} />
                <FeatureCard title="Analytics Avançado" desc="Relatórios e métricas em tempo real." icon={BarChart3} delay={0.1} />
                <FeatureCard title="Cloud Computing" desc="Dados sincronizados e acessíveis." icon={Cloud} delay={0.2} />
                <FeatureCard title="Segurança Total" desc="Criptografia e backups automáticos." icon={ShieldCheck} delay={0.3} />
                <FeatureCard title="App Mobile" desc="Controle via app iOS e Android." icon={Smartphone} delay={0.4} />
                <FeatureCard title="Otimização de Tempo" desc="Reduza até 60% do tempo de gestão." icon={Clock} delay={0.5} />
                <FeatureCard title="Multi-usuário" desc="Gestão de equipes e permissões." icon={Users} delay={0.6} />
                <FeatureCard title="Processamento Rápido" desc="Dados processados instantaneamente." icon={Zap} delay={0.7} />
            </div>
        </Container>
      </Section>

      <Section id="solucoes" className="bg-white">
        <Container>
            <div className="space-y-32">
                <SolutionBlock 
                    kicker="Agricultura de Precisão" title="Pulverização Agrícola Controlada" desc="Tenha um fluxo padronizado de solicitação de voos, com cálculo de área, insumos e relatórios."
                    imageSrc="" bullets={["Registro de condições climáticas", "Mapeamento de área aplicada", "Controle de estoque de insumos", "Produtividade por piloto"]}
                />
                <SolutionBlock 
                    reverse kicker="Gestão Pública" title="Combate à Dengue & Inspeções" desc="Ferramenta essencial para prefeituras. Mapeie focos, gere evidências visuais e acompanhe o progresso."
                    imageSrc="" bullets={["Mapa de calor de focos", "Registro fotográfico", "Divisão por bairros", "Relatórios de conformidade"]}
                />
            </div>
        </Container>
      </Section>

      <Section className="pb-10">
        <Reveal width="100%">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-20 text-center shadow-2xl mx-6">
              <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Pronto para profissionalizar sua operação?</h2>
                  <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">Junte-se a empresas que reduziram em 40% o tempo administrativo.</p>
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button className="h-14 rounded-full bg-white px-8 text-lg font-bold text-slate-900 transition hover:bg-sky-50">Solicitar Demonstração</button>
                  </div>
              </div>
          </div>
        </Reveal>
      </Section>

      <footer className="bg-[#0f172a] text-slate-300 pt-20 pb-10">
        <Container>
            <div className="grid md:grid-cols-4 gap-12 mb-16">
                <div><div className="flex items-center gap-2 mb-6"><div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">IJ</div><span className="text-2xl font-bold text-white tracking-tight">IJA<span className="text-sky-500">System</span></span></div><p className="text-sm text-slate-400 mb-6">Soluções tecnológicas avançadas para o mercado de drones e aviação agrícola.</p><div className="flex gap-4"><a href="#" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><Facebook size={18}/></a><a href="#" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><Instagram size={18}/></a><a href="#" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><Linkedin size={18}/></a></div></div>
                <div><h4 className="font-bold text-white mb-6">Produto</h4><ul className="space-y-3 text-sm"><li><a href="#" className="hover:text-sky-400 transition-colors">Funcionalidades</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Planos e Preços</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Para Pilotos</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Para Empresas</a></li></ul></div>
                <div><h4 className="font-bold text-white mb-6">Empresa</h4><ul className="space-y-3 text-sm"><li><a href="#" className="hover:text-sky-400 transition-colors">Sobre Nós</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Blog</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Carreiras</a></li><li><button onClick={onBack} className="hover:text-sky-400 transition-colors flex items-center gap-1">Voltar para Oceano Azul <ArrowRight size={12}/></button></li></ul></div>
                <div><h4 className="font-bold text-white mb-6">Suporte</h4><ul className="space-y-3 text-sm"><li><a href="#" className="hover:text-sky-400 transition-colors">Central de Ajuda</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Documentação API</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Status do Sistema</a></li><li><a href="#" className="hover:text-sky-400 transition-colors">Contato</a></li></ul></div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>&copy; 2026 IJA System. Todos os direitos reservados.</p>
                <div className="flex gap-6"><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></div>
            </div>
        </Container>
      </footer>
    </div>
  )
}

// ==============================================================================
// 3. VIEW: OCEANO AZUL (HOME INSTITUCIONAL) - HERO INTERATIVO (DRONE)
// ==============================================================================

function OceanoAzulView({ onNavigateToSystem }: { onNavigateToSystem: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [state, handleSubmit] = useForm("mojjqbek");

  // Lógica de Física do Drone
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useSpring(x, { stiffness: 50, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 50, damping: 15 })
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100 h-30"
      >
        <Container>
            <div className="flex items-center justify-between h-30">
                {/* Substitua o trecho antigo por este: */}
                <div className="relative w-60 h-24">
                    <a href="#"> <Image 
                        src="/images/oceano-azul-logo-sem-fundo.png" // Coloque o nome exato do seu arquivo que está na pasta public
                        alt="Logo oeceano azul"
                        fill
                        className="object-contain object-left" // Garante que a logo não distorça e alinhe à esquerda
                        />
                    </a>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="#inicio" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Início</a>
                    <a href="#servicos" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Serviços</a>
                    <a href="#beneficios" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Benefícios</a>
                    <a href="#contato" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Contato</a>
                    
                    <button 
                        onClick={onNavigateToSystem}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all"
                    >
                        IJA Drones <ArrowRight size={14}/>
                    </button>

                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                        Solicitar Orçamento
                    </button>
                </div>

                <button className="md:hidden text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X/> : <Menu/>}
                </button>
            </div>
            
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 py-4 space-y-4">
                    <a href="#inicio" className="block font-medium text-slate-600">Início</a>
                    <a href="#servicos" className="block font-medium text-slate-600">Serviços</a>
                    <button onClick={onNavigateToSystem} className="w-full text-left font-bold text-blue-600 py-2 flex items-center gap-2">IJA Drones <ArrowRight size={14}/></button>
                </div>
            )}
        </Container>
      </motion.nav>

      {/* HERO SECTION COM DRONE INTERATIVO */}
      <section id="inicio" className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden">
         <Container>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                <div className="flex-1 text-center lg:text-left z-10">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 tracking-wide uppercase border border-blue-100 h-7">
                            <Sparkles size={12}/> Serviços Profissionais de Pulverização
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                            Pulverização com Drones <br/><span className="text-blue-600">Rápida e Eficiente</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Especialistas em pulverização agrícola e urbana com drones de última geração. Atendemos produtores rurais e órgãos públicos no combate à dengue.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                Solicitar Orçamento <ArrowRight size={16}/>
                            </button>
                            <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all">
                                Nossos Serviços
                            </button>
                        </div>
                    </Reveal>
                </div>
                
                {/* LADO DIREITO: ÁREA INTERATIVA DO DRONE (COM ESTADO LIGAR/DESLIGAR) */}
                <div 
                    className="flex-1 w-full h-[400px] lg:h-[500px] relative flex items-center justify-center cursor-crosshair perspective-1000 group"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)} // Liga o drone
                    onMouseLeave={() => {
                        setIsHovering(false); // Desliga o drone
                        x.set(0); // Volta pro centro X
                        y.set(0); // Volta pro centro Y
                    }}
                >
                    {/* Fundo Decorativo (Aparece suavemente ao interagir) */}
                    <motion.div 
                        animate={{ opacity: isHovering ? 0.6 : 0.2, scale: isHovering ? 1.05 : 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-[3rem] -z-10 blur-3xl pointer-events-none"
                    ></motion.div>
                    
                    {/* SOMBRA NO CHÃO (Dinâmica: diminui e afasta quando o drone sobe) */}
                    <motion.div 
                        animate={{ 
                            opacity: isHovering ? 0.5 : 0.8, 
                            scale: isHovering ? 0.8 : 1, 
                            y: isHovering ? 80 : 60 // Sombra desce quando drone sobe
                        }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-12 bg-blue-900/20 blur-2xl rounded-[100%] pointer-events-none"
                    ></motion.div>

                    {/* DRONE DINÂMICO QUE SEGUE O MOUSE */}
                    <motion.div 
                        style={{ 
                            x: mouseX, 
                            y: mouseY, 
                            rotateX: rotateX, 
                            rotateY: rotateY, 
                            z: 0 
                        }}
                        animate={{ 
                            y: isHovering ? -30 : 0, // Drone levanta voo (-30px) quando ativo
                            scale: isHovering ? 1.1 : 1 // Aproxima levemente
                        }}
                        transition={{ duration: 0.6, ease: "backOut" }} // Efeito de "pulo" ao ligar
                        className="relative w-full max-w-md aspect-square z-20 pointer-events-none flex items-center justify-center"
                    >
                        {/* --- INÍCIO DO VISUAL "DRONE HOLOGRÁFICO" --- */}
                        <div className="relative w-80 h-80">
                            
                            {/* Estrutura Central (Corpo) */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-b from-blue-500 to-blue-700 rounded-3xl shadow-lg shadow-blue-500/50 z-20 flex items-center justify-center border border-blue-400/50 transition-all duration-500 ${isHovering ? 'brightness-110' : 'brightness-75 grayscale'}`}>
                                {/* Núcleo Pulsante (Só pulsa se ligado) */}
                                <motion.div 
                                    animate={isHovering ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] } : { scale: 1, opacity: 0 }} 
                                    transition={{ duration: 1.5, repeat: Infinity }} 
                                    className="w-12 h-12 bg-blue-300 rounded-full blur-md absolute"
                                ></motion.div>
                                <Bot size={64} className="text-white drop-shadow-lg relative z-10" strokeWidth={1.5} />
                            </div>

                            {/* Braços de Conexão (Visuais) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-200/30 rounded-full z-10"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-2 bg-blue-200/30 rotate-45 z-10"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-2 bg-blue-200/30 -rotate-45 z-10"></div>

                            {/* --- HÉLICES E LUZES (Propellers & LEDs) --- */}
                            {/* Nota: As hélices agora têm rotação condicional (isHovering ? 360 : 0) */}
                            
                            {/* Topo Esquerda */}
                            <div className="absolute top-0 left-0 w-36 h-36 flex items-center justify-center">
                                <motion.div 
                                    animate={isHovering ? { rotate: 360 } : { rotate: 0 }} 
                                    transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }} 
                                    className="w-full h-full rounded-full bg-gradient-to-tr from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                                ></motion.div>
                            </div>
                            
                            {/* Topo Direita */}
                            <div className="absolute top-0 right-0 w-36 h-36 flex items-center justify-center">
                                <motion.div 
                                    animate={isHovering ? { rotate: -360 } : { rotate: 0 }} 
                                    transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }} 
                                    className="w-full h-full rounded-full bg-gradient-to-tl from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                                ></motion.div>
                            </div>

                            {/* Base Esquerda */}
                            <div className="absolute bottom-0 left-0 w-36 h-36 flex items-center justify-center">
                                <motion.div 
                                    animate={isHovering ? { rotate: -360 } : { rotate: 0 }} 
                                    transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }} 
                                    className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                                ></motion.div>
                                <div className={`absolute w-3 h-3 bg-blue-100 rounded-full shadow-[0_0_15px_3px_rgba(219,234,254,0.6)] z-30 bottom-10 left-10 transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>

                            {/* Base Direita */}
                            <div className="absolute bottom-0 right-0 w-36 h-36 flex items-center justify-center">
                                <motion.div 
                                    animate={isHovering ? { rotate: 360 } : { rotate: 0 }} 
                                    transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }} 
                                    className="w-full h-full rounded-full bg-gradient-to-bl from-blue-400/40 via-transparent to-transparent blur-[2px] border border-blue-300/20"
                                ></motion.div>
                                <div className={`absolute w-3 h-3 bg-blue-100 rounded-full shadow-[0_0_15px_3px_rgba(219,234,254,0.6)] z-30 bottom-10 right-10 transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>
                        </div>
                        {/* --- FIM DO VISUAL "DRONE HOLOGRÁFICO" --- */}

                    </motion.div>
                </div>
            </div>
         </Container>
      </section>

      {/* SERVIÇOS (LAYOUT ZIG-ZAG GRANDE RESTAURADO) */}
      <section id="servicos" className="py-20 bg-slate-50">
         <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
                <Reveal>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4 uppercase h-7">Nossos Serviços</span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Soluções profissionais <span className="text-blue-600">para cada necessidade</span></h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate-500">Atendemos produtores rurais e órgãos públicos com serviços especializados.</p>
                </Reveal>
            </div>

            <div className="space-y-24">
                {/* Serviço 1: Agro */}
                <Reveal>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Leaf size={24}/>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Pulverização Agrícola</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Aplicação precisa de defensivos e fertilizantes em lavouras. Cobertura uniforme e economia de até 90% de água comparado aos métodos tradicionais.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-blue-600"/> Sem amassamento da cultura</li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-blue-600"/> Aplicação em áreas de difícil acesso</li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm"><CheckCircle2 size={16} className="text-blue-600"/> Redução de deriva</li>
                            </ul>
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
                                Solicitar Orçamento
                            </button>
                        </div>
                        <div className="order-1 md:order-2">
                             <AnimatedImageFrame className="h-80 shadow-lg bg-slate-200">
                                 <Image 
                                src="/images/drone-agro.png" // Coloque aqui o nome do seu arquivo que está na pasta public
                                alt="pulverização agrícola com drones"
                                fill // Faz a imagem preencher todo o container
                                className="object-cover" // Garante que a imagem cubra a área sem distorcer (corta o excesso)
                            />
                             </AnimatedImageFrame>
                        </div>
                    </div>
                </Reveal>

                {/* Serviço 2: Dengue */}
                <Reveal delay={0.2}>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <AnimatedImageFrame className="h-80 shadow-lg bg-slate-200">
                             <Image 
                                src="/images/drone-dengue.png" // Coloque aqui o nome do seu arquivo que está na pasta public
                                alt="Controle de Dengue e Monitoramento Urbano"
                                fill // Faz a imagem preencher todo o container
                                className="object-cover" // Garante que a imagem cubra a área sem distorcer (corta o excesso)
                            />
                        </AnimatedImageFrame>
                        <div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Target size={24}/>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Controle de Dengue</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Pulverização urbana especializada no combate ao mosquito Aedes aegypti. Parceria com prefeituras e órgãos de saúde pública.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-slate-600 text-sm"><ShieldCheck size={16} className="text-blue-600"/> Cobertura urbana total</li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm"><ShieldCheck size={16} className="text-blue-600"/> Segurança para a população</li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm"><ShieldCheck size={16} className="text-blue-600"/> Mapeamento de focos</li>
                            </ul>
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors">
                                Solicitar Orçamento
                            </button>
                        </div>
                    </div>
                </Reveal>
            </div>
         </Container>
      </section>

     
      {/* BENEFÍCIOS - CARDS COM MESMA ALTURA (CORRIGIDO) */}
      <section id="beneficios" className="py-20 bg-slate-50">
         <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
                <Reveal>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mb-4 uppercase h-7">Vantagens</span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Por Que Escolher a <span className="text-blue-600">Oceano Azul?</span></h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate-500">Benefícios comprovados que fazem a diferença no seu negócio.</p>
                </Reveal>
            </div>

            {/* 1. items-stretch: Garante que as colunas do grid tenham a mesma altura */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {[
                    { title: "Economia de Tempo", icon: Clock, desc: "Até 60x mais rápido que pulverização tradicional." },
                    { title: "Redução de Custos", icon: DollarSign, desc: "Menos desperdício de insumos e mão de obra." },
                    { title: "Sustentabilidade", icon: Leaf, desc: "Economia de até 90% de água nas aplicações." },
                    { title: "Precisão Máxima", icon: Target, desc: "Aplicação uniforme em terrenos irregulares." },
                    { title: "Maior Produtividade", icon: TrendingUp, desc: "Melhor aproveitamento dos defensivos." },
                    { title: "Segurança", icon: Users, desc: "Menor exposição do trabalhador a agrotóxicos." },
                    { title: "Equipe Certificada", icon: Shield, desc: "Pilotos competentes e habilitados pela DECEA." },
                    { title: "Cobertura Regional", icon: MapPin, desc: "Atendimento em toda sua região, garantindo cobertura completa." },
                ].map((item, i) => (
                    // 2. Passamos className="h-full" para o Reveal
                    // IMPORTANTE: O componente Reveal precisa aceitar e aplicar essa classe na div principal dele
                    <Reveal key={i} delay={i * 0.05} className="h-full" width="100%">
                        
                        {/* 3. Card com h-full e flex flex-col para ocupar tudo e alinhar */}
                        <div className="h-full p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 shrink-0">
                                <item.icon size={20}/>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed flex-1">{item.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
         </Container>
      </section>
            
      {/* CTA AZUL (EQUIPE) - CORREÇÃO DEFINITIVA DE LARGURA */}
      <section className="py-16 bg-slate-50">
         
         {/* Container livre para ocupar toda a largura */}
         <div className="w-full px-4 md:px-6">
            
            {/* ADICIONEI width="100%" AQUI PARA FORÇAR A LARGURA */}
            <Reveal width="100%" className="relative rounded-[2.5rem] overflow-hidden bg-blue-700 py-16 md:py-20 px-6 shadow-xl mx-auto w-full max-w-[1280px]">

                {/* 1. IMAGEM DE FUNDO */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/equipe-bg.png" 
                        alt="Equipe Profissional Oceano Azul"
                        fill
                        className="object-cover opacity-70 mix-blend-overlay"
                    />
                </div>

                {/* 2. OVERLAY GRADIENTE */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-blue-700/80 to-blue-800/90 z-10"></div>

                {/* 3. CONTEÚDO */}
                <div className="relative z-20 text-center text-white max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Equipe Profissional e Certificada
                    </h2>
                    
                    <p className="text-blue-50/90 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                        Conte com especialistas experientes e equipamentos de última geração para garantir os melhores resultados.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-3 bg-white text-blue-700 rounded-full font-bold text-sm md:text-base hover:bg-blue-50 transition-all shadow-md">
                            Agendar Visita Técnica
                        </button>
                        
                        <button className="px-8 py-3 border border-white text-white rounded-full font-bold text-sm md:text-base hover:bg-white/10 transition-all">
                            Falar com Especialista
                        </button>
                    </div>
                </div>
            </Reveal>
         </div>
      </section>

      {/* FORMULÁRIO DE CONTATO */}
      <section id="contato" className="py-24 bg-white">
          <Container>
              {/* Usei 'items-center' para alinhar verticalmente pelo centro, se preferir topo use 'items-start' */}
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* ESQUERDA: 5 Colunas */}
                  <div className="lg:col-span-5">
                      <Reveal>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100">
                              <Mail size={12}/> Entre em Contato
                          </div>
                      </Reveal>
                      <Reveal delay={0.1}>
                          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                              Solicite um Orçamento <span className="text-blue-600">Sem Compromisso</span>
                          </h2>
                          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                              Nossa equipe está pronta para atender você e apresentar a melhor solução para suas necessidades.
                          </p>
                      </Reveal>
                      
                      <div className="space-y-8">
                          <Reveal delay={0.2}>
                              <div className="flex items-start gap-5">
                                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                                      <Mail size={22}/>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 text-lg">Email</h4>
                                      <p className="text-slate-500 mt-1">contato@oceanoazul.com.br</p>
                                  </div>
                              </div>
                          </Reveal>
                          <Reveal delay={0.3}>
                              <div className="flex items-start gap-5">
                                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                                      <Phone size={22}/>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 text-lg">WhatsApp</h4>
                                      <p className="text-slate-500 mt-1">+55 (11) 98765-4321</p>
                                  </div>
                              </div>
                          </Reveal>
                          <Reveal delay={0.4}>
                              <div className="flex items-start gap-5">
                                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100">
                                      <MapPin size={22}/>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 text-lg">Localização</h4>
                                      <p className="text-slate-500 mt-1">São Paulo, Brasil</p>
                                  </div>
                              </div>
                          </Reveal>
                      </div>
                  </div>

                  {/* BLOCO REVEAL COMPLETO COM FORMSPREE */}
                  <Reveal delay={0.2} className="lg:col-span-5 lg:col-start-8 w-full bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                      
                      {/* ESTADO 1: MENSAGEM DE SUCESSO (Aparece se state.succeeded for true) */}
                      {state.succeeded ? (
                          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-fade-in">
                              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                                  {/* Ícone de Check */}
                                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </div>
                              <h3 className="text-2xl font-bold text-slate-800 mb-2">Mensagem Enviada!</h3>
                              <p className="text-slate-500 max-w-xs mx-auto mb-8">
                                  Obrigado pelo contato. Nossa equipe analisará sua solicitação e responderá em breve.
                              </p>
                              <button 
                                  onClick={() => window.location.reload()} 
                                  className="text-blue-600 font-bold hover:text-blue-700 hover:underline text-sm transition-colors"
                              >
                                  Enviar outra mensagem
                              </button>
                          </div>
                      ) : (
                          
                          /* ESTADO 2: O FORMULÁRIO DE CONTATO */
                          <form onSubmit={handleSubmit} className="space-y-5 w-full">
                              
                              {/* Campo: Nome */}
                              <div>
                                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Nome Completo</label>
                                  <input 
                                      id="name"
                                      type="text" 
                                      name="name" 
                                      required
                                      placeholder="Seu nome" 
                                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                                  />
                                  <ValidationError prefix="Nome" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                              </div>
                              
                              {/* Campo: Email */}
                              <div>
                                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Email</label>
                                  <input 
                                      id="email"
                                      type="email" 
                                      name="email" 
                                      required
                                      placeholder="seu@email.com" 
                                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                                  />
                                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                              </div>
                              
                              {/* Grid: Telefone e Interesse */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Telefone</label>
                                      <input 
                                          id="phone"
                                          type="tel" 
                                          name="phone" 
                                          placeholder="(00) 00000-0000" 
                                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                                      />
                                  </div>
                                  <div>
                                      <label htmlFor="interest" className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Interesse</label>
                                      <select 
                                          id="interest"
                                          name="interest" 
                                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-600 cursor-pointer"
                                      >
                                          <option value="">Selecione...</option>
                                          <option value="Pulverização Agrícola">Pulverização Agrícola</option>
                                          <option value="Controle de Dengue">Controle de Dengue</option>
                                          <option value="Mapeamento Aéreo">Mapeamento Aéreo</option>
                                          <option value="Outros">Outros</option>
                                      </select>
                                  </div>
                              </div>
                              
                              {/* Campo: Mensagem */}
                              <div>
                                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Mensagem</label>
                                  <textarea 
                                      id="message"
                                      name="message" 
                                      required
                                      rows={4} 
                                      placeholder="Conte-nos sobre sua necessidade..." 
                                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 resize-none"
                                  ></textarea>
                                  <ValidationError prefix="Mensagem" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                              </div>
                              
                              {/* Botão de Enviar com Loading */}
                              <button 
                                  type="submit" 
                                  disabled={state.submitting}
                                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                              >
                                  {state.submitting ? (
                                      <>
                                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                          <span>Enviando...</span>
                                      </>
                                  ) : (
                                      "Enviar Mensagem"
                                  )}
                              </button>
                          </form>
                      )}
                  </Reveal>
                  
              </div>
          </Container>
      </section>

{/* FOOTER COMPACTO E VISUALMENTE IDÊNTICO À REFERÊNCIA */}
      <footer className="bg-[#0f172a] text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <Container>
            {/* Grid ajustado: gap-8 para ficar mais próximo, mb-12 para reduzir altura total */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 items-start">

                {/* COLUNA 1: MARCA, TEXTO E REDES SOCIAIS (Ocupa 4 colunas) */}
                <div className="lg:col-span-4 flex flex-col items-start">
                    
                    {/* LOGO: Tamanho equilibrado para não esticar o footer */}
                    <div className="relative w-auto h-16 mb-5">
                         <img
                            src="/images/oceano-azul-logo-sem-fundo.png"
                            alt="Oceano Azul"
                            className="w-full h-full object-contain object-left"
                         />
                    </div>

                    <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
                        Especialistas em pulverização com drones para agricultura e controle urbano. Tecnologia e precisão a seu serviço.
                    </p>
                    
                    {/* REDES SOCIAIS - AZUL VIBRANTE (Igual à foto de referência) */}
                    <div className="flex gap-3">
                        <a href="https://www.instagram.com/oceanoazul.drones?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="blank_" className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-900/20">
                            <Instagram size={18}/>
                        </a>
                        <a href="https://www.linkedin.com/company/agroazul/" target="blank_" className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-900/20">
                            <Linkedin size={18}/>
                        </a>
                    </div>
                </div>

                {/* ESPAÇO VAZIO (2 colunas) para separar a logo dos links */}
                <div className="hidden lg:block lg:col-span-2"></div>

                {/* COLUNA 2: SERVIÇOS */}
                <div className="lg:col-span-2">
                    <h4 className="font-bold text-white mb-5 text-base">Serviços</h4>
                    <ul className="space-y-3 text-sm font-medium text-slate-400">
                        <li><a href="#servicos" className="hover:text-white transition-colors block">Pulverização Agrícola</a></li>
                        <li><a href="#servicos" className="hover:text-white transition-colors block">Controle de Dengue</a></li>
                        <li><a href="#contato" className="hover:text-white transition-colors block">Consultoria Técnica</a></li>
                        <li><a href="#contato" className="hover:text-white transition-colors block">Orçamentos</a></li>
                    </ul>
                </div>

                {/* COLUNA 3: EMPRESA */}
                <div className="lg:col-span-2">
                    <h4 className="font-bold text-white mb-5 text-base">Empresa</h4>
                    <ul className="space-y-3 text-sm font-medium text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors block">Sobre Nós</a></li>
                        <li><a href="#" className="hover:text-white transition-colors block">Equipe</a></li>
                        <li><a href="#" className="hover:text-white transition-colors block">Certificações</a></li>
                        <li>
                            <button onClick={onNavigateToSystem} className="hover:text-white transition-colors flex items-center gap-1 group">
                                IJA Drones <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                            </button>
                        </li>
                    </ul>
                </div>

                {/* COLUNA 4: SUPORTE */}
                <div className="lg:col-span-2">
                    <h4 className="font-bold text-white mb-5 text-base">Suporte</h4>
                    <ul className="space-y-3 text-sm font-medium text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors block">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors block">Área de Cobertura</a></li>
                        <li><a href="#" className="hover:text-white transition-colors block">Contato</a></li>
                        <li><a href="#" className="hover:text-white transition-colors block">Blog</a></li>
                    </ul>
                </div>
            </div>

            {/* BARRA INFERIOR (COPYRIGHT) */}
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>&copy; 2026 Oceano Azul. Todos os direitos reservados.</p>
                <div className="flex gap-6 font-medium">
                    <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                    <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                    <a href="#" className="hover:text-white transition-colors">Cookies</a>
                </div>
            </div>
        </Container>
      </footer>
    </div>
  )
}

// ==============================================================================
// 4. COMPONENTE PRINCIPAL (CONTROLADOR)
// ==============================================================================

export default function Page() {
  const [currentView, setCurrentView] = useState<'home' | 'system'>('home')

  return (
    <AnimatePresence mode="wait">
      {currentView === 'home' ? (
        <motion.div 
            key="home"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            <OceanoAzulView onNavigateToSystem={() => setCurrentView('system')} />
        </motion.div>
      ) : (
        <motion.div 
            key="system"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            <IjaDronesView onBack={() => setCurrentView('home')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}