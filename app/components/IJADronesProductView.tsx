"use client";

import React from "react";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Reveal, Container, Section, AnimatedImageFrame } from "./ui-kit"; // Ajuste o caminho do seu UI-KIT se necessário/ ==============================================================================

export default function IJADronesProductView({
  onBack,
}: {
  onBack: () => void;
}) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    "Gestão de Pilotos Ilimitada",
    "Mapeamento de Polígonos KML",
    "Relatórios em PDF Automáticos",
    "App Offline para Android/iOS",
    "Suporte 24/7",
    "Armazenamento em Nuvem Seguro",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 h-20 flex items-center">
        <Container>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={onBack}
            >
              <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="font-bold text-xl text-slate-800">
                IJA System
              </span>
            </div>
            <button
              onClick={onBack}
              className="text-sm font-bold text-slate-600 hover:text-sky-600 flex items-center gap-2"
            >
              <ArrowRight className="rotate-180" size={16} /> Voltar
            </button>
          </div>
        </Container>
      </nav>

      {/* HERO SIMPLIFICADO */}
      <section className="pt-32 pb-16 bg-white text-center">
        <Container>
          <Reveal width="100%">
            <span className="text-sky-600 font-bold tracking-wider uppercase text-xs mb-4 block">
              Nossos Planos
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Escolha o plano ideal para <br /> sua operação de drones
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              De produtores rurais independentes a grandes prefeituras. Temos a
              escala certa para você.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* TABELA DE PREÇOS (CARDS) */}
      <Section className="bg-slate-50 py-10">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* PLANO START */}
            <Reveal delay={0.1} className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full hover:border-sky-200 transition-all">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase">
                    Produtor Rural
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Start
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-slate-900">
                    R$ 299
                  </span>
                  <span className="text-slate-500">/mês</span>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Para quem está começando a digitalizar a operação agrícola.
                </p>
                <button className="w-full py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-sky-600 hover:text-sky-600 transition-colors mb-8">
                  Começar Agora
                </button>

                <ul className="space-y-4">
                  {features.slice(0, 3).map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-sky-600 shrink-0"
                      />{" "}
                      {feat}
                    </li>
                  ))}
                  <li
                    key="disabled"
                    className="flex items-center gap-3 text-sm text-slate-300 line-through"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-slate-200 shrink-0"
                    />{" "}
                    App Offline
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* PLANO PRO (DESTAQUE) */}
            <Reveal className="h-full -mt-4 md:-mt-8">
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-sky-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  MAIS POPULAR
                </div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-sky-900/50 text-sky-400 text-xs font-bold rounded-full uppercase border border-sky-800">
                    Empresas
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Profissional
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    R$ 599
                  </span>
                  <span className="text-slate-400">/mês</span>
                </div>
                <p className="text-slate-400 text-sm mb-8">
                  Gestão completa para prestadores de serviço e frotas médias.
                </p>
                <button className="w-full py-3 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-500 transition-colors shadow-lg shadow-sky-900/50 mb-8">
                  Testar Grátis
                </button>

                <ul className="space-y-4">
                  {features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-sky-400 shrink-0"
                      />{" "}
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* PLANO ENTERPRISE */}
            <Reveal delay={0.2} className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full hover:border-sky-200 transition-all">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full uppercase">
                    Governo
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Enterprise
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold text-slate-900">
                    Sob Consulta
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Para prefeituras e grandes operações de combate à dengue.
                </p>
                <button className="w-full py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-purple-600 hover:text-purple-600 transition-colors mb-8">
                  Falar com Consultor
                </button>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                    <CheckCircle2
                      size={16}
                      className="text-purple-600 shrink-0"
                    />{" "}
                    Tudo do plano Pro +
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2
                      size={16}
                      className="text-purple-600 shrink-0"
                    />{" "}
                    API de Integração
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2
                      size={16}
                      className="text-purple-600 shrink-0"
                    />{" "}
                    Servidor Dedicado
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2
                      size={16}
                      className="text-purple-600 shrink-0"
                    />{" "}
                    Treinamento Presencial
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ - PERGUNTAS FREQUENTES */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">
                Dúvidas Frequentes
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  p: "O sistema funciona sem internet?",
                  r: "Sim! Nosso aplicativo mobile armazena todos os dados localmente e sincroniza assim que houver conexão.",
                },
                {
                  p: "Quantos pilotos posso cadastrar?",
                  r: "No plano Start até 2 pilotos. No Profissional e Enterprise, o cadastro é ilimitado.",
                },
                {
                  p: "Emite relatórios para órgãos ambientais?",
                  r: "Sim, os relatórios gerados seguem o padrão exigido pela maioria dos órgãos reguladores.",
                },
                {
                  p: "Preciso de um drone específico?",
                  r: "Não. O IJA System é agnóstico ao hardware. Você lança os dados de qualquer modelo de drone.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1} width="100%">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-sky-50 transition-colors">
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-200 text-sky-700 flex items-center justify-center text-xs">
                        ?
                      </span>
                      {item.p}
                    </h4>
                    <p className="text-slate-600 text-sm pl-8">{item.r}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <Container>
          <h2 className="text-3xl font-bold mb-6">Ainda tem dúvidas?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Nossa equipe técnica é formada por pilotos e engenheiros prontos
            para ajudar.
          </p>
          <button className="px-8 py-3 bg-sky-600 text-white rounded-full font-bold hover:bg-sky-500 transition-all">
            Agendar Demonstração Guiada
          </button>
        </Container>
      </section>
    </div>
  );
}
