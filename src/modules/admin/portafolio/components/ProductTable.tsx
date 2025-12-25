"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia
} from "@/shared/components/ui/empty";
import { PackageSearch, ExternalLink } from "lucide-react";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";

interface ProductTableProps {
  products: any[];
  categories: { id: string; name: string }[];
}

export function ProductTable({ products, categories }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <Empty className="mt-8 border-2 border-dashed border-gray-100 bg-gray-50/50">
        <EmptyMedia variant="icon">
          <PackageSearch className="text-gray-400" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No se encontraron productos</EmptyTitle>
          <EmptyDescription>
            Intenta ajustar los filtros o agrega un nuevo producto al portafolio.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-12">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow className="hover:bg-transparent border-gray-100">
            <TableHead className="w-[100px] font-bold text-[#1a4a2e]">Imagen</TableHead>
            <TableHead className="font-bold text-[#1a4a2e]">Nombre</TableHead>
            <TableHead className="font-bold text-[#1a4a2e]">Categoría</TableHead>
            <TableHead className="font-bold text-[#1a4a2e]">WhatsApp</TableHead>
            <TableHead className="text-right font-bold text-[#1a4a2e]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-green-50/20 border-gray-100 transition-colors">
              <TableCell className="py-4">
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-50">
                  <img src={product.imagePath} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </TableCell>
              <TableCell className="font-bold text-gray-800">
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className="text-xs font-medium text-gray-400">/{product.slug}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider">
                  {product.category?.name || 'Sin categoría'}
                </span>
              </TableCell>
              <TableCell>
                <a 
                  href={product.whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ExternalLink size={14} />
                  Ver Link
                </a>
              </TableCell>
              <TableCell className="text-right">
                 <div className="flex items-center justify-end gap-2">
                    <EditProductDialog product={product} categories={categories} />
                    <DeleteProductDialog productId={product.id} productName={product.name} />
                 </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
