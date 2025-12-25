"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Loader2, RefreshCw } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { AddProductDialog } from "./AddProductDialog";
import { ProductTable } from "./ProductTable";
import { getProducts } from "../actions/productActions";

interface PortafolioContentProps {
  categories: { id: string; name: string }[];
  initialProducts: any[];
}

export function PortafolioContent({ categories, initialProducts }: PortafolioContentProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilteredProducts = useCallback(async () => {
    setIsLoading(true);
    const filteredProducts = await getProducts(
      categoryId === "all" ? undefined : categoryId,
      search || undefined
    );
    setProducts(filteredProducts);
    setIsLoading(false);
  }, [categoryId, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchFilteredProducts]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-[#1a4a2e] tracking-tight">Portafolio</h1>
          <p className="text-gray-500 font-medium text-lg">Administra los productos de Inticampo.</p>
        </div>
        <AddProductDialog categories={categories} />
      </div>

      <div className="bg-white/70 backdrop-blur-xl p-4 rounded-[2rem] border border-white shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1a4a2e] transition-colors" size={20} />
          <Input
            placeholder="Buscar por nombre o descripción..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 rounded-2xl h-14 bg-gray-50/50 border-none group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-green-100 transition-all w-full text-base font-medium shadow-none"
          />
        </div>
        
        <div className="w-full md:w-72 group">
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="h-14 rounded-2xl bg-gray-50/50 border-none group-hover:bg-gray-100/50 transition-all font-bold text-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#1a4a2e]">
                  <Filter size={16} />
                </div>
                <SelectValue placeholder="Todas las categorías" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-none shadow-2xl">
              <SelectItem value="all" className="rounded-xl font-bold">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="rounded-xl font-medium">
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="ghost" 
          onClick={() => {
            setSearch("");
            setCategoryId("all");
          }}
          className="rounded-2xl h-14 px-8 font-black text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest text-xs"
        >
          Limpiar
        </Button>
      </div>


      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="animate-spin text-[#1a4a2e]" size={32} />
              <span className="text-sm font-bold text-[#1a4a2e] tracking-widest uppercase">Cargando portafolio...</span>
            </div>
          </div>
        )}
        <ProductTable products={products} categories={categories} />

      </div>
    </div>
  );
}
