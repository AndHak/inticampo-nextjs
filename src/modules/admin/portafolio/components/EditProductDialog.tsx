"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Loader2, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,

  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { updateProduct } from "../actions/productActions";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
  phone: z.string().min(1, "Debes seleccionar un número"),
  wpMessage: z.string().min(1, "El mensaje es obligatorio"),
  categoryId: z.string().min(1, "Debes seleccionar una categoría"),
  image: z.instanceof(File).optional(),
});

interface EditProductDialogProps {
  product: any;
  categories: { id: string; name: string }[];
}

export function EditProductDialog({ product, categories }: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(product.imagePath);

  // Helper to parse WhatsApp Link
  const parseWpLink = (link: string) => {
    try {
      const url = new URL(link);
      const phoneRaw = url.searchParams.get("phone") || "";
      const phone = phoneRaw.replace("57", "");
      const wpMessage = url.searchParams.get("text") || "";
      return { phone, wpMessage };
    } catch {
      return { phone: "3013588333", wpMessage: "¡Hola! Me interesa este producto." };
    }
  };

  const { phone, wpMessage } = parseWpLink(product.whatsappLink);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description || "",
      phone: phone || "3013588333",
      wpMessage: wpMessage || "¡Hola! Me interesa este producto.",
      categoryId: product.categoryId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    const encodedMessage = encodeURIComponent(values.wpMessage);
    const whatsappLink = `https://api.whatsapp.com/send?phone=57${values.phone}&text=${encodedMessage}`;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description || "");
    formData.append("whatsappLink", whatsappLink);
    formData.append("categoryId", values.categoryId);
    if (values.image) {
      formData.append("image", values.image);
    }

    const result = await updateProduct(product.id, formData);

    setIsLoading(false);
    if (result.success) {
      setOpen(false);
      toast.success("Producto actualizado", {
        description: `${values.name} ha sido modificado.`,
        icon: <CheckCircle2 className="text-green-500" />
      });
    } else {
      toast.error("Error al actualizar", {
        description: result.error,
        icon: <AlertCircle className="text-red-500" />
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-[#1a4a2e]">Editar Producto</DialogTitle>
          <DialogDescription>
            Modifica los detalles del producto en el portafolio.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">Nombre del Producto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Fertilizante Orgánico" {...field} className="rounded-xl h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl h-11">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Breve descripción del producto" {...field} className="rounded-xl h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">Número de WhatsApp</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-11">
                          <SelectValue placeholder="Selecciona un número" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3013588333">3013588333</SelectItem>
                        <SelectItem value="3005468008">3005468008</SelectItem>
                        <SelectItem value="3188778621">3188778621</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wpMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">Mensaje predeterminado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. ¡Hola! Me interesa..." {...field} className="rounded-xl h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">Imagen del Producto (Max 5MB)</FormLabel>
                   <FormDescription>Deja este campo vacío para mantener la imagen actual.</FormDescription>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <div className="relative group cursor-pointer transition-transform active:scale-[0.99]">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                              const reader = new FileReader();
                              reader.onloadend = () => setPreview(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                           onBlur={fieldProps.onBlur}
                           name={fieldProps.name}
                           ref={fieldProps.ref}
                        />
                         <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 group-hover:border-[#1a4a2e]/30 group-hover:bg-[#1a4a2e]/5 transition-all duration-300 bg-gray-50/50">
                          {preview ? (
                             <div className="relative w-full group/preview">
                              <img src={preview} alt="Preview" className="w-full h-48 object-contain rounded-2xl" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                <span className="text-white text-xs font-bold uppercase tracking-widest">Cambiar imagen</span>
                              </div>
                            </div>
                          ) : (
                            <>
                               <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#1a4a2e] group-hover:scale-110 transition-all duration-500">
                                <ImageIcon size={32} />
                              </div>
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-sm font-bold text-gray-700">Sube una nueva imagen</span>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-tighter">PNG, JPG o WEBP hasta 5MB</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl h-12 bg-[#1a4a2e] text-white hover:bg-green-800 font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Actualizando...
                </>
              ) : (
                "Actualizar Producto"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
