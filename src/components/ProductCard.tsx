import Link from "next/link";
import Image from "next/image";
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
        {product.sleeve_img ? (
          <>
            {/* تصویر اصلی: اسلیو ۱۰ تایی */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#fdfbf9] p-3">
              <Image
                src={product.sleeve_img}
                alt={`${product.name} - بسته ۱۰ عددی`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2.5 left-2.5 z-10 rounded-md bg-stone-900/80 px-2 py-0.5 text-[10px] font-bold text-amber-300 shadow backdrop-blur-sm">
                بسته ۱۰ عددی 📦
              </span>
            </div>

            {/* تصویر دوم در هاور: تک کپسول */}
            {product.img && (
              <div className="absolute inset-0 z-[1] flex items-center justify-center bg-[#fcfaf7] p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Image
                  src={product.img}
                  alt={`${product.name} - تک کپسول`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute bottom-2.5 left-2.5 z-10 rounded-md bg-espresso/90 px-2 py-0.5 text-[10px] font-bold text-latte shadow backdrop-blur-sm">
                  نمای کپسول
                </span>
              </div>
            )}
          </>
        ) : (
          <ProductMedia product={product} />
        )}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-start gap-2">
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
          {product.category.startsWith("machine") || product.category === "accessory" || product.price === 0 ? (
            <>
              <div className="text-base font-black text-caramel-dark">
                برای قیمت تماس بگیرید
              </div>
              <span className="text-[11px] text-taiga">
                {product.category.startsWith("machine") ? "۱۸ ماه گارانتی تعویض بنسو" : "اصالت ۱۰۰٪ کالا"}
              </span>
              <div className="mt-3">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-espresso/20 bg-latte py-2 text-xs font-bold text-espresso transition hover:bg-sand"
                >
                  <span>مشاهده و استعلام</span>
                  <span>📞</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {product.oldPrice && (
                <div className="text-xs text-taiga line-through">
                  {formatToman(product.oldPrice)}
                </div>
              )}
              <div className="text-lg font-extrabold text-espresso">
                {formatToman(product.price)}
              </div>
              <span className="text-[11px] font-medium text-taiga">
                بسته ۱۰ عددی کپسول
              </span>
              <div className="mt-3">
                <AddToCart slug={product.slug} className="w-full !py-2.5 text-sm" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
