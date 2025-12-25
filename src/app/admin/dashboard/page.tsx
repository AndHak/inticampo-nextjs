import React from 'react'
import { cn } from "@/shared/lib/utils"

const Dashboard = () => {

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black text-[#1a4a2e] tracking-tight">Dashboard</h1>
        <p className="text-gray-500 font-medium text-lg">Bienvenido al panel de administración de Inticampo.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Visitas", color: "bg-blue-50" },
          { label: "Proyectos", color: "bg-green-50" },
          { label: "Servicios", color: "bg-amber-50" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all group">
            <div className={cn("w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110", item.color)} />
            <div className="h-4 w-24 bg-gray-50 rounded-full mb-3" />
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-black text-[#1a4a2e]">{Math.floor(Math.random() * 100)}</span>
               <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default Dashboard
