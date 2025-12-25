"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ProductCardProps {
  product: {
    name: string;
    description: string | null;
    imagePath: string;
    whatsappLink: string;
  };
  themeColor: string;
  categoryName: string;
}

export const ProductCard = ({ product, themeColor, categoryName }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-[2.5rem] p-4 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Category Tag */}
      <div className={cn(
        "absolute top-6 left-6 z-10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-white/20",
        themeColor
      )}>
        {categoryName}
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gray-50 mb-6">
        <img
          src={product.imagePath}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-2 pb-2">
        <h3 className="text-xl font-black text-[#1a4a2e] mb-2 leading-tight group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-gray-500 line-clamp-2 mb-6 flex-1">
          {product.description || "Producto de alta calidad para optimizar tus cultivos con Inticampo."}
        </p>

        {/* Action Button */}
        <a
          href={product.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-between w-full p-4 rounded-2xl text-white font-bold transition-all active:scale-95 group/btn overflow-hidden relative",
            themeColor
          )}
        >
          <div className="flex items-center gap-2 relative z-10">
            <MessageCircle size={20} />
            <span>Consultar</span>
          </div>
          <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform relative z-10" />
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:animate-shimmer" />
        </a>
      </div>
    </motion.div>
  );
};
