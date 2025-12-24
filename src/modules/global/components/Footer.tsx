"use client";

import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-zinc-900 py-12 text-center text-zinc-500 text-xs font-black uppercase tracking-[0.2em] border-t border-white/5">
      © {new Date().getFullYear()} INTICAMPO SAS ZOMAC. {t("rights")}
    </footer>
  );
};

export default Footer;
