"use client";

import React from 'react';
import Bioestimulantes from './components/Bioestimulantes';
import Coadyuvantes from './components/Coadyuvantes';
import FertilizantesEdaficos from './components/FertilizantesEdaficos';
import FertilizantesFoliares from './components/FertilizantesFoliares';
import Fungicidas from './components/Fungicidas';
import Herbicidas from './components/Herbicidas';
import Insecticidas from './components/Insecticidas';
import Maquinaria from './components/Maquinaria';

interface PortafolioProps {
  categoriesWithProducts: any[];
}

const Portafolio = ({ categoriesWithProducts }: PortafolioProps) => {
  // Helper to get products by category slug
  const getProducts = (slug: string) => {
    return categoriesWithProducts.find(c => c.slug === slug)?.products || [];
  };

  return (
    <div className="bg-[#fcfdfc] min-h-screen">
      {/* Hero Section for Public Portfolio */}
      <div className="bg-[#1a4a2e] pt-32 pb-20 px-4 md:px-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Portafolio de Soluciones</h1>
          <p className="text-lg md:text-xl font-medium text-green-100/80 leading-relaxed">
            Explora nuestra amplia gama de productos diseñados para potenciar el rendimiento y la salud de tus cultivos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-16 pb-32">
        <Bioestimulantes products={getProducts("bioestimulantes")} />
        <Coadyuvantes products={getProducts("coadyuvantes")} />
        <FertilizantesEdaficos products={getProducts("fertilizantes_edaficos")} />
        <FertilizantesFoliares products={getProducts("fertilizantes_foliares")} />
        <Fungicidas products={getProducts("fungicidas")} />
        <Herbicidas products={getProducts("herbicidas")} />
        <Insecticidas products={getProducts("insecticidas")} />
        <Maquinaria products={getProducts("maquinaria_agricola")} />
      </div>
    </div>
  );
};

export default Portafolio;