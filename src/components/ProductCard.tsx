import Link from "next/link";
import ProductMedia from "@/components/ProductMedia";
import RatingStars from "@/components/RatingStars";
import AddToCart from "@/components/AddToCart";
import {
  type Product,
  discountPercent,
  formatToman,
  faNumber,
} from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-latte bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-latte"
      >
        <ProductMedia product={product} />
        <div className="absolute top-3 right-3 flex flex-col items-start gap-2">
          {off > 0 && (
            <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
              ٪{faNumber(off)} تخفیف
            </span>
          )}
          {product.badge && (
            <span className="rounded-full bg-caramel px-2.5 py-1 text-xs font-bold text-white">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-medium text-caramel">
          {product.brand}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 min-h-12 font-bold leading-6 transition hover:text-caramel-dark"
        >
          {product.name}
        </Link>
        {product.intensity !== undefined && (
          <span className="text-xs text-taiga">
            شدت طعم: {faNumber(product.intensity)} از ۱۰
          </span>
        )}
        <RatingStars rating={product.rating} reviews={product.reviews} />
        <div className="mt-auto pt-2">
          {product.oldPrice && (
            <div className="text-xs text-taiga line-through">
              {formatToman(product.oldPrice)}
            </div>
          )}
          <div className="text-lg font-extrabold text-espresso">
            {formatToman(product.price)}
          </div>
          <div className="mt-3">
            <AddToCart slug={product.slug} className="w-full !py-2.5 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
