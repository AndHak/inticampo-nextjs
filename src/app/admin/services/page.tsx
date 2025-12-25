import React from 'react'

const Services = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-[#1a4a2e]">Servicios</h1>
        <p className="text-gray-500 font-medium">Gestiona los servicios ofrecidos por la empresa.</p>
      </div>
      
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[400px] flex items-center justify-center">
        <p className="text-gray-400 font-bold">Módulo de servicios en construcción</p>
      </div>
    </div>
  )
}

export default Services