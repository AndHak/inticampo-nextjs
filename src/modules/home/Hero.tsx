"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Sprout, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.from(".hero-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-zinc-50 pt-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50/50 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-4 md:px-16 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="hero-content flex flex-col items-start gap-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-widest border border-green-200">
            <Sprout size={14} />
            {t("company_name")}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-[#1a4a2e] leading-tight tracking-tighter">
            {t("slogan")}
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            {t("intro_phrase")}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="/portafolio" className="bg-[#1a4a2e] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-green-800 transition-all group active:scale-95 shadow-xl shadow-green-900/10">
              {t("btn_portfolio")}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="bg-white text-[#1a4a2e] px-8 py-4 rounded-xl font-bold border-2 border-green-100 hover:bg-green-50 transition-all active:scale-95">
              {t("btn_about")}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12 w-full pt-12 border-t border-green-100">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-black text-[#1a4a2e] uppercase tracking-wider">{t("feature1")}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <TrendingUp size={20} />
              </div>
              <span className="text-xs font-black text-[#1a4a2e] uppercase tracking-wider">{t("feature2")}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <Sprout size={20} />
              </div>
              <span className="text-xs font-black text-[#1a4a2e] uppercase tracking-wider">{t("feature3")}</span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="hero-image relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
            {/* Using a placeholder for now, ideally an image of a lush crop or Inticampo products */}
            <img 
              src="/img/inticampotienda.jpeg" 
              alt="Inticampo Agriculture" 
              className="w-full h-full object-cover hover:scale-105 duration-300 transition-all"
            />
          </div>
          {/* Floating card */}
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-green-50 max-w-[240px] animate-bounce-subtle">
            <p className="text-sm font-bold text-gray-800 italic">
              &quot;{t("quote")}&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
