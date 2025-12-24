"use client";

import { useTranslations } from "next-intl";
import { Target, Eye, Award, CheckCircle2 } from "lucide-react";

const About = () => {
  const t = useTranslations("about");

  return (
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-green-600 font-black uppercase tracking-[0.3em] text-xs mb-4">{t("section_label")}</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a4a2e] tracking-tighter mb-6">{t("section_title")}</h2>
          <div className="w-24 h-1 bg-[#1a4a2e] rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Mission */}
          <div className="group bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 hover:border-green-200 transition-all hover:shadow-2xl hover:shadow-green-900/5 flex flex-col gap-6">
            <div className="w-16 h-16 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#1a4a2e]">{t("mission_title")}</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
              {t("mission_text")}
            </p>
          </div>

          {/* Vision */}
          <div className="group bg-[#1a4a2e] p-10 rounded-[2.5rem] text-white transition-all hover:shadow-2xl hover:shadow-black/20 flex flex-col gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white text-[#1a4a2e] flex items-center justify-center shadow-lg group-hover:-rotate-6 transition-transform">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-black">{t("vision_title")}</h3>
            <p className="text-green-50/80 leading-relaxed font-medium">
              {t("vision_text")}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <div className="bg-zinc-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <Award className="text-green-400" size={32} />
                <h3 className="text-3xl font-black tracking-tight">{t("values_title")}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="text-green-400 shrink-0" />
                    <span className="text-xl font-bold uppercase tracking-widest">{t(`value${i}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
