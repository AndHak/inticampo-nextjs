import Hero from "@/modules/home/Hero";
import About from "@/modules/home/About";
import Services from "@/modules/home/Services";
import ProductSections from "@/modules/home/ProductSections";
import Contact from "@/modules/home/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Services />
      <ProductSections />
      <Contact />
    </main>
  );
}
