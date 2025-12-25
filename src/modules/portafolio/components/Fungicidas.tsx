import React from 'react';
import { ProductCard } from './ProductCard';

const Fungicidas = ({ products }: { products: any[] }) => {
  if (products.length === 0) return null;
  return (
    <section id="fungicidas" className="py-20 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl md:text-5xl font-black text-[#1a4a2e] tracking-tighter">Fungicidas</h2>
        <div className="h-2 w-24 bg-violet-500 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} themeColor="bg-violet-500" categoryName="Fungicida" />
        ))}
      </div>
    </section>
  );
};

export default Fungicidas;