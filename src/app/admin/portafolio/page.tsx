import { getCategories, seedCategories } from "@/modules/admin/portafolio/actions/categoryActions";
import { getProducts } from "@/modules/admin/portafolio/actions/productActions";
import { PortafolioContent } from "@/modules/admin/portafolio/components/PortafolioContent";

export default async function PortafolioPage() {
  // Ensure categories exist
  await seedCategories();
  
  const categories = await getCategories();
  const initialProducts = await getProducts();

  return (
    <PortafolioContent 
      categories={categories} 
      initialProducts={initialProducts} 
    />
  );
}