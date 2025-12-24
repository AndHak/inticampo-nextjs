"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone, Instagram, Facebook, Send } from "lucide-react";

const Contact = () => {
  const t = useTranslations("contact");
  const tn = useTranslations("navbar");

  return (
    <section id="contacto" className="py-24 bg-zinc-50 border-t border-zinc-200">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">{t("label")}</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a4a2e] tracking-tighter mb-8 leading-tight">
              {t("title")}
            </h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-zinc-100 flex items-center justify-center text-green-700 group-hover:bg-[#1a4a2e] group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#1a4a2e] mb-1">{t("location_label")}</h4>
                  <p className="text-lg font-bold text-gray-800 leading-snug">
                    {tn("location")}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-zinc-100 flex items-center justify-center text-green-700 group-hover:bg-[#1a4a2e] group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#1a4a2e] mb-1">{t("email_label")}</h4>
                  <p className="text-lg font-bold text-gray-800 leading-snug">
                    {tn("email")}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-zinc-100 flex items-center justify-center text-green-700 group-hover:bg-[#1a4a2e] group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#1a4a2e] mb-1">{t("whatsapp_label")}</h4>
                  <p className="text-lg font-bold text-gray-800 leading-snug">
                    {tn("whatsapp")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center hover:bg-[#1a4a2e] hover:text-white transition-all cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center hover:bg-[#1a4a2e] hover:text-white transition-all cursor-pointer">
                <Facebook size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-green-900/5 border border-zinc-100">
            <h3 className="text-2xl font-black text-[#1a4a2e] mb-8">{t("form_title")}</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">{t("form_name")}</label>
                  <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 font-medium outline-none focus:border-green-500 transition-colors" placeholder={t("form_name_placeholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">{t("form_email")}</label>
                  <input type="email" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 font-medium outline-none focus:border-green-500 transition-colors" placeholder={t("form_email_placeholder")} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">{t("form_category")}</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 font-medium outline-none focus:border-green-500 transition-colors">
                   <option>{t("form_category_opt1")}</option>
                   <option>{t("form_category_opt2")}</option>
                   <option>{t("form_category_opt3")}</option>
                   <option>{t("form_category_opt4")}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-1">{t("form_message")}</label>
                <textarea rows={4} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 font-medium outline-none focus:border-green-500 transition-colors" placeholder={t("form_message_placeholder")}></textarea>
              </div>
              <button disabled className="w-full bg-[#1a4a2e] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-800 transition-all shadow-xl shadow-green-900/10">
                {t("form_submit")} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
