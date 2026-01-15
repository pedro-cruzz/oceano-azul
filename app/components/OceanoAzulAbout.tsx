"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Zap,
  Droplets,
  Map,
  Shield,
  Leaf,
  Cloud,
  MapPin,
  Bot,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Reveal, Container, Section, AnimatedImageFrame } from "./ui-kit"; // Importando do passo 1

export default function OceanoAzulAboutView({
  onBack,
}: {
  onBack: () => void;
  onNavigateToSystem: () => void;
}) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* NAVBAR SIMPLIFICADA */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
        <Container>
          <div className="flex items-center justify-between">
            <div className="relative w-40 h-12 cursor-pointer" onClick={onBack}>
              <Image
                src="/images/oceano-azul-logo-sem-fundo.png"
                alt="Oceano Azul"
                fill
                className="object-contain object-left"
              />
            </div>
            <button
              onClick={onBack}
              className="text-sm font-bold text-slate-600 hover:text-blue-600 flex items-center gap-2"
            >
              <ArrowRight className="rotate-180" size={16} /> Voltar para Início
            </button>
          </div>
        </Container>
      </nav>

      {/* HEADER INSTITUCIONAL */}
      <section className="pt-40 pb-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <Reveal width="100%">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100 uppercase tracking-wider mx-auto">
                <ShieldCheck size={12} /> Sobre Nós
              </span>
            </Reveal>
            <Reveal delay={0.1} width="100%">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Liderança em Drones e <br />
                <span className="text-blue-600">Inteligência Artificial</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Desde 2009, transformamos setores estratégicos com tecnologia de
                ponta, unindo serviços especializados e distribuição de
                equipamentos de última geração.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ESTATÍSTICAS & HISTÓRIA */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Nossa História e Expertise
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Somos uma empresa consolidada na área de serviços, distribuição
                de drones e inteligência artificial. Nossa trajetória é marcada
                pela inovação e pela busca constante por soluções disruptivas.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Contamos com uma <strong>equipe multidisciplinar</strong> com
                ampla experiência em tecnologia e estratégia, atuando em áreas
                críticas como infraestrutura, mineração, aeroespacial, agrícola
                e financeira.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">2009</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Fundação
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">+50</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Colaboradores
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">Brasil</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">
                    Atuação Nacional
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="relative h-[500px]">
              <AnimatedImageFrame className="h-full shadow-2xl bg-slate-200">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center text-white/20">
                  <Users size={64} />
                </div>
              </AnimatedImageFrame>
            </div>
          </div>
        </Container>
      </Section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="text-center mb-16 flex flex-col items-center">
            <Reveal width="100%">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Onde Atuamos
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Presente em empresas privadas, estatais e no governo
                (prefeituras), entregando resultados precisos.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Zap, label: "Energia" },
              { icon: Droplets, label: "Óleo & Gás" },
              { icon: Map, label: "Infraestrutura" },
              { icon: Shield, label: "Defesa" },
              { icon: Leaf, label: "Agricultura" },
              { icon: Cloud, label: "Ambiental" },
            ].map((area, i) => (
              <Reveal key={i} delay={i * 0.1} width="100%">
                <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-blue-600 hover:border-blue-500 transition-all group cursor-default">
                  <area.icon
                    size={24}
                    className="text-blue-400 group-hover:text-white transition-colors"
                  />
                  <span className="font-bold text-sm">{area.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SERVIÇOS DETALHADOS */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                  Tecnologia Disruptiva
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-slate-600 mb-6">
                  Utilizamos drones de última geração para resolver desafios
                  complexos das grandes empresas. Nossa tecnologia permite
                  acesso a áreas difíceis, coleta de dados precisa e segurança
                  operacional.
                </p>
              </Reveal>
              <ul className="space-y-4">
                {[
                  "Monitoramento e Inspeção Técnica",
                  "Mapeamento Aéreo de Alta Precisão",
                  "Pulverização Agrícola e Urbana",
                  "Inteligência Artificial aplicada a imagens",
                ].map((item, i) => (
                  <Reveal key={i} delay={0.2 + i * 0.1}>
                    <li className="flex items-center gap-3 font-bold text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      {item}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AnimatedImageFrame className="aspect-square bg-slate-100 rounded-2xl">
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <MapPin size={32} />
                </div>
              </AnimatedImageFrame>
              <AnimatedImageFrame className="aspect-square bg-slate-100 rounded-2xl mt-8">
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Bot size={32} />
                </div>
              </AnimatedImageFrame>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA CONTATO */}
      <section className="py-20 bg-blue-600 text-white">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-extrabold mb-2">
                Pronto para inovar?
              </h2>
              <p className="text-blue-100 text-lg">
                Fale com nossa equipe técnica hoje mesmo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-blue-700 px-6 py-3 rounded-xl border border-blue-500">
                <Phone size={20} />
                <div>
                  <div className="text-xs text-blue-200 uppercase font-bold">
                    Ligue agora
                  </div>
                  <div className="font-bold">+55 (16) 3947-4613</div>
                </div>
              </div>
              <button className="px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
