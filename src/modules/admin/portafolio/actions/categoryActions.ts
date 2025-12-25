"use server";

import { db } from "@/shared/lib/db";

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function seedCategories() {
  const categoriesToSeed = [
    { name: "Bioestimulantes", slug: "bioestimulantes" },
    { name: "Coadyuvantes", slug: "coadyuvantes" },
    { name: "Fertilizantes Edaficos", slug: "fertilizantes_edaficos" },
    { name: "Fertilizantes Foliares", slug: "fertilizantes_foliares" },
    { name: "Fungicidas", slug: "fungicidas" },
    { name: "Herbicidas", slug: "herbicidas" },
    { name: "Insecticidas", slug: "insecticidas" },
    { name: "Maquinaria Agricola", slug: "maquinaria_agricola" },
  ];

  for (const cat of categoriesToSeed) {
    await db.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
  }
}


