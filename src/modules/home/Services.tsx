"use client";

import { useTranslations } from "next-intl";
import { Search, FlaskConical, Droplets, Users, ChevronRight } from "lucide-react";

const Services = () => {
  const t = useTranslations("services");

  const icons = [
    <Users key="icon1" size={24} />,
    <Search key="icon2" size={24} />,
    <FlaskConical key="icon3" size={24} />,
    <Droplets key="icon4" size={24} />
  ];

  return (
    <section id="servicios" className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">{t("label")}</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a4a2e] tracking-tighter">
              {t("title")}
            </h2>
          </div>
          <p className="text-gray-600 font-medium max-w-sm">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group bg-white p-8 rounded-3xl border border-zinc-200 hover:border-green-500 transition-all hover:-translate-y-2 hover:shadow-xl shadow-green-900/5 flex flex-col gap-6">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center group-hover:bg-[#1a4a2e] group-hover:text-white transition-colors shadow-sm">
                {icons[i-1]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {t(`item${i}`)}
              </h3>
              <div className="mt-auto flex items-center gap-2 text-green-700 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                {t("learn_more")} <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
