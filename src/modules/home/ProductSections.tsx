"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { 
  Droplets, 
  Sprout, 
  CloudRain, 
  Truck, 
  Plus, 
  Minus,
  CheckCircle,
  PackageCheck,
  ChevronRight,
  Turtle
} from "lucide-react";

const ProductSections = () => {
  const t = useTranslations("sections");
  const tp = useTranslations("portfolio");

  const sections = [
    {
      id: "cojuvant",
      title: t("cojuvant.title"),
      icon: <div className="relative"><Turtle className="text-blue-500" size={32} /><Droplets className="absolute -top-2 -right-2 text-blue-300" size={16} /></div>,
      short: t("cojuvant.short_desc"),
      long: t("cojuvant.long_desc"),
      tagline: t("cojuvant.tagline"),
      products: Object.values(t.raw("cojuvant.products")),
      color: "bg-blue-50",
      accent: "text-blue-700",
      border: "border-blue-100",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "edaphic",
      title: t("edaphic.title"),
      icon: <Sprout className="text-green-600" size={32} />,
      short: t("edaphic.short_desc"),
      long: t("edaphic.long_desc"),
      products: Object.values(t.raw("edaphic.products")),
      color: "bg-green-50",
      accent: "text-green-700",
      border: "border-green-100",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "foliar",
      title: t("foliar.title"),
      icon: <CloudRain className="text-teal-600" size={32} />,
      short: t("foliar.short_desc"),
      long: t("foliar.long_desc"),
      products: Object.values(t.raw("foliar.products")),
      color: "bg-teal-50",
      accent: "text-teal-700",
      border: "border-teal-100",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "machinery",
      title: t("machinery.title"),
      icon: <Truck className="text-orange-600" size={32} />,
      short: t("machinery.short_desc"),
      long: t("machinery.long_desc"),
      products: Object.values(t.raw("machinery.products")),
      color: "bg-orange-50",
      accent: "text-orange-700",
      border: "border-orange-100",
      image: "https://images.unsplash.com/photo-1530268577195-392da2685794?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="portafolio" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-16">
        <div className="text-center mb-16">
          <span className="text-green-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">{tp("label")}</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a4a2e] tracking-tighter mb-4">
            {tp("title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {Object.values(tp.raw("categories")).map((cat: any) => (
              <span key={cat} className="px-4 py-2 bg-zinc-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1a4a2e] border border-zinc-200">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={`group flex flex-col rounded-[2.5rem] overflow-hidden border transition-all duration-500 ${section.border} ${expanded === section.id ? "ring-2 ring-offset-4 ring-[#1a4a2e]" : ""}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={section.image} alt={section.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8`}>
                   <div className="flex items-center gap-4 text-white">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                         {section.icon}
                      </div>
                      <h3 className="text-3xl font-black tracking-tight">{section.title}</h3>
                   </div>
                </div>
              </div>

              <div className="p-8 flex flex-col gap-6 bg-white">
                <p className={`text-lg font-black leading-tight ${section.accent}`}>
                  {section.short}
                </p>
                
                <p className="text-gray-600 font-medium">
                  {section.long}
                </p>

                <div className="pt-6 border-t border-zinc-100">
                  <button 
                    onClick={() => setExpanded(expanded === section.id ? null : section.id)}
                    className={`flex items-center justify-between w-full font-black text-xs uppercase tracking-widest transition-all ${section.accent}`}
                  >
                    <span>{tp("view_products")}</span>
                    {expanded === section.id ? <Minus size={16} /> : <Plus size={16} />}
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ${expanded === section.id ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="grid gap-3">
                      {section.products.map((prod: any) => (
                        <div key={prod} className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-md transition-all">
                          <PackageCheck size={18} className={section.accent} />
                          <span className="text-sm font-bold text-gray-800">{prod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LINEA INTI - CALIDAD */}
        <div className="mt-20 bg-gradient-to-br from-[#1a4a2e] to-zinc-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
              <span className="text-green-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">{tp("exclusive")}</span>
              <h3 className="text-4xl font-black mb-6 leading-tight">
                {t("proprietary.title")}
              </h3>
              <p className="text-green-50/70 font-medium text-lg leading-relaxed">
                {tp("proprietary_description")}
              </p>
              <button className="mt-8 bg-white text-[#1a4a2e] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:translate-x-2 transition-transform">
                 {tp("contact_advisor")} <ChevronRight size={16} />
              </button>
            </div>

            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4 w-full">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center font-black">
                    {i}
                  </div>
                  <span className="text-sm font-bold tracking-tight">
                    {t(`proprietary.p${i}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSections;
