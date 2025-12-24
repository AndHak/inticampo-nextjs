"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, MapPin, Phone, Menu, X, Landmark, Languages, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { setLanguage } from "@/i18n/funcs/setLanguage";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "#inicio" },
    { name: t("about"), href: "#nosotros" },
    { name: t("services"), href: "#servicios" },
    { name: t("portfolio"), href: "#portafolio" },
    { name: t("contact"), href: "#contacto" },
  ];

  const handleLanguageChange = async (newLocale: string) => {
    await setLanguage(newLocale);
    router.refresh();
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:flex w-full bg-[#1a4a2e] text-white py-2 px-16 justify-between items-center text-xs border-b border-green-800/30">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-green-400" />
            <span>{t("location")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-green-400" />
            <span>{t("email")}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border-r border-green-800/50 pr-6">
            <Phone size={14} className="text-green-400" />
            <span>WhatsApp: {t("whatsapp")}</span>
          </div>
          
          {/* Language Switcher Desktop TopBar */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 hover:text-green-400 transition-colors outline-none cursor-pointer">
              <Languages size={14} />
              <span className="uppercase font-bold">{locale}</span>
              <ChevronDown size={10} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-zinc-200">
              <DropdownMenuItem 
                className="font-bold text-xs uppercase cursor-pointer hover:bg-zinc-50"
                onClick={() => handleLanguageChange("es")}
              >
                {t("lang_es")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="font-bold text-xs uppercase cursor-pointer hover:bg-zinc-50"
                onClick={() => handleLanguageChange("en")}
              >
                {t("lang_en")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed lg:sticky top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md shadow-lg py-3" 
            : "bg-white py-5 lg:bg-transparent lg:py-8"
        }`}
      >
        <div className="px-4 md:px-16 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#1a4a2e] p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Landmark className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter ${isScrolled ? "text-[#1a4a2e]" : "text-[#1a4a2e]"}`}>
                INTI CAMPO
              </span>
              <span className="text-[10px] leading-tight font-bold text-green-700 tracking-[0.2em] uppercase">
                SOLUCIONES AGRO
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-green-600 ${
                  isScrolled ? "text-gray-800" : "text-gray-900"
                }`}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-[#1a4a2e] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#25633e] transition-all shadow-md hover:shadow-green-900/20 active:scale-95">
              {t("contact")}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 text-[#1a4a2e] outline-none">
                <Languages size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-zinc-200">
                <DropdownMenuItem onClick={() => handleLanguageChange("es")} className="font-bold text-xs uppercase cursor-pointer">ES</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="font-bold text-xs uppercase cursor-pointer">EN</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button
              className="p-2 text-[#1a4a2e]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-[80px] bg-white transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center gap-8 py-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-black text-[#1a4a2e] uppercase tracking-tighter"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-[#1a4a2e] text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest shadow-xl">
              {t("contact")}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
