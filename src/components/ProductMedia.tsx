import Image from "next/image";
import ProductVisual from "@/components/ProductVisual";
import type { Product } from "@/lib/data";

export default function ProductMedia({
  product,
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw",
}: {
  product: Product;
  sizes?: string;
}) {
  if (product.img) {
    return (
      <Image
        src={product.img}
        alt={product.name}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <ProductVisual
      type={product.art.type}
      from={product.art.from}
      to={product.art.to}
      className="absolute inset-0"
    />
  );
}
