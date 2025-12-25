"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { deleteProduct } from "../actions/productActions";
import { toast } from "sonner";

interface DeleteProductDialogProps {
  productId: string;
  productName: string;
}

export function DeleteProductDialog({ productId, productName }: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    const result = await deleteProduct(productId);
    setIsLoading(false);
    
    if (result.success) {
      setOpen(false);
      toast.success("Producto eliminado", {
        description: `${productName} ha sido borrado del portafolio y del storage.`,
        icon: <CheckCircle2 className="text-green-500" />
      });
    } else {
      toast.error("Error al eliminar", {
        description: result.error,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-3xl">
        <DialogHeader className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-xl font-black text-gray-900">¿Eliminar producto?</DialogTitle>
            <DialogDescription className="font-medium text-gray-500 px-4">
              Esta acción eliminará permanentemente a <span className="font-bold text-gray-800">"{productName}"</span> y su imagen del almacenamiento. Esta acción no se puede deshacer.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl flex-1 h-11 border-gray-200"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="rounded-xl flex-1 h-11 bg-red-600 hover:bg-red-700 font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Eliminando...
              </>
            ) : (
              "Sí, eliminar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
