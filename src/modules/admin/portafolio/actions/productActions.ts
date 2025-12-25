"use server";

import { db } from "@/shared/lib/db";
import { supabase } from "@/shared/lib/supabase";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getProducts(categoryId?: string, search?: string) {
  try {
    const products = await db.product.findMany({
      where: {
        AND: [
          categoryId ? { categoryId } : {},
          search ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ]
          } : {}
        ]
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function addProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const whatsappLink = formData.get("whatsappLink") as string;
    const categoryId = formData.get("categoryId") as string;
    const file = formData.get("image") as File;

    if (!name || !categoryId || !file || !whatsappLink) {
      return { success: false, error: "Todos los campos obligatorios deben ser completados" };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "La imagen no debe superar los 5MB" };
    }

    // Get category to find the folder (slug)
    const category = await db.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return { success: false, error: "Categoría no encontrada" };
    }

    const folder = category.slug; // bioestimulantes, etc.
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${generateSlug(name)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portafolio_inticampo') 
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase Storage Error:", uploadError);
      return { success: false, error: "Error al subir la imagen a Supabase" };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portafolio_inticampo')
      .getPublicUrl(filePath);

    const product = await db.product.create({
      data: {
        name,
        slug: generateSlug(name),
        description,
        whatsappLink,
        imagePath: publicUrl,
        categoryId,
      }
    });

    revalidatePath("/admin/portafolio");
    return { success: true, product };

  } catch (error: any) {
    console.error("Error adding product:", error);
    if (error.code === 'P2002') {
      return { success: false, error: "Ya existe un producto con este nombre (slug duplicado)" };
    }
    return { success: false, error: "Error interno al guardar el producto" };
  }
}

function getPathFromUrl(url: string) {
  // Pattern: .../portafolio_inticampo/[folder]/[filename]
  const parts = url.split("portafolio_inticampo/");
  if (parts.length > 1) {
    return parts[1];
  }
  return null;
}

export async function deleteProduct(id: string) {
  try {
    const product = await db.product.findUnique({ where: { id } });
    if (!product) return { success: false, error: "Producto no encontrado" };

    // Delete from storage
    const storagePath = getPathFromUrl(product.imagePath);
    if (storagePath) {
      await supabase.storage.from("portafolio_inticampo").remove([storagePath]);
    }

    // Delete from DB
    await db.product.delete({ where: { id } });

    revalidatePath("/admin/portafolio");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Error al eliminar el producto" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const whatsappLink = formData.get("whatsappLink") as string;
    const categoryId = formData.get("categoryId") as string;
    const file = formData.get("image") as File | null;

    const existingProduct = await db.product.findUnique({ where: { id } });
    if (!existingProduct) return { success: false, error: "Producto no encontrado" };

    let imagePath = existingProduct.imagePath;

    if (file && file.size > 0) {
      // Delete old image
      const oldPath = getPathFromUrl(existingProduct.imagePath);
      if (oldPath) {
        await supabase.storage.from("portafolio_inticampo").remove([oldPath]);
      }

      // Upload new image
      const category = await db.category.findUnique({ where: { id: categoryId } });
      if (!category) return { success: false, error: "Categoría no encontrada" };

      const folder = category.slug;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${generateSlug(name)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('portafolio_inticampo')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portafolio_inticampo')
        .getPublicUrl(filePath);
      
      imagePath = publicUrl;
    }

    await db.product.update({
      where: { id },
      data: {
        name,
        slug: generateSlug(name),
        description,
        whatsappLink,
        imagePath,
        categoryId,
      }
    });

    revalidatePath("/admin/portafolio");
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Error al actualizar el producto" };
  }
}

