import HeroSlider from "@/components/HeroSlider";
import WaterfallShowcase from "@/components/WaterfallShowcase";
import CuratedShowcase from "@/components/CuratedShowcase";
import TrustValueBar from "@/components/TrustValueBar";
import { products } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Lifestyle Banner */}
      <HeroSlider />

      {/* 2. Onyx-style 3-Category Waterfall Showcase */}
      <WaterfallShowcase />

      {/* 3. Curated Bestsellers & Featured Collection */}
      <CuratedShowcase products={products} />

      {/* 4. Minimal Trust & Value Proposition Bar */}
      <TrustValueBar />
    </>
  );
}
