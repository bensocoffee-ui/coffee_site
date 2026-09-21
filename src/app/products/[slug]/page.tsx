import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductMedia from "@/components/ProductMedia";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import RatingStars from "@/components/RatingStars";
import AddToCart from "@/components/AddToCart";
import {
  discountPercent,
  formatToman,
  faNumber,
  getCategory,
  getProduct,
  products,
} from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.name,
    description: product.desc.slice(0, 150),
  };
}

export default async function ProductPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const off = discountPercent(product);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-8 text-sm text-taiga">
        <Link href="/" className="hover:text-caramel-dark">خانه</Link>
        {" / "}
        <Link href="/products" className="hover:text-caramel-dark">فروشگاه</Link>
        {category && (
          <>
            {" / "}
            <Link href={`/products?cat=${category.slug}`} className="hover:text-caramel-dark">
              {category.title}
            </Link>
          </>
        )}
        {" / "}
        <span className="font-bold text-espresso">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        {/* visual */}
        <ProductGallery product={product} discount={off} />

        {/* info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-lg bg-latte px-3 py-1 font-bold text-taiga">
              برند: {product.brand}
            </span>
            {product.badge && (
              <span className="rounded-lg bg-caramel px-3 py-1 font-bold text-white">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-extrabold leading-relaxed sm:text-3xl">
            {product.name}
          </h1>

          <RatingStars rating={product.rating} reviews={product.reviews} size="md" />

          <p className="leading-8 text-mocha">{product.desc}</p>

          {product.intensity !== undefined && (
            <div>
              <p className="mb-2 text-sm font-bold">
                شدت طعم: {faNumber(product.intensity)} از ۱۰
              </p>
              <div className="h-2.5 w-full max-w-64 rounded-full bg-latte">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-caramel to-espresso"
                  style={{ width: `${product.intensity * 10}%` }}
                />
              </div>
            </div>
          )}

          <ul className="grid gap-2.5 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm leading-6 text-mocha">
                <span className="mt-0.5 text-emerald-600">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-latte bg-white p-5">
            {product.category.startsWith("machine") || product.category === "accessory" || product.price === 0 ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-taiga">وضعیت قیمت:</span>
                    <div className="text-2xl font-black text-caramel-dark">
                      برای قیمت تماس بگیرید
                    </div>
                  </div>
                  <span className="rounded-full bg-latte px-3 py-1 text-xs font-bold text-espresso border border-sand">
                    {product.category.startsWith("machine") ? "۱۸ ماه گارانتی تعویض" : "اصالت تضمینی"}
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href="tel:09307021608"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-espresso py-3.5 text-sm font-bold text-white transition hover:bg-mocha"
                  >
                    <span>📞 استعلام تلفنی و سفارش:</span>
                    <span dir="ltr">09307021608</span>
                  </a>
                  <a
                    href="https://t.me/bensocoffee"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-sand bg-latte px-6 py-3.5 text-sm font-bold text-espresso transition hover:bg-sand"
                  >
                    <span>پیام در تلگرام</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    {product.oldPrice && (
                      <div className="text-sm text-taiga line-through">
                        {formatToman(product.oldPrice)}
                      </div>
                    )}
                    <div className="text-2xl font-black text-espresso">
                      {formatToman(product.price)}
                    </div>
                    <span className="text-xs text-taiga font-medium">بسته ۱۰ عددی کپسول</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">موجود در انبار مشهد ✓</span>
                </div>
                <div className="mt-5">
                  <AddToCart slug={product.slug} withQty />
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs text-taiga sm:grid-cols-4">
            <div className="rounded-xl border border-latte bg-white p-3 font-semibold">⚡ تحویل ۲ ساعته مشهد</div>
            <div className="rounded-xl border border-latte bg-white p-3 font-semibold">🛡️ ۱۸ ماه گارانتی تعویض</div>
            <div className="rounded-xl border border-latte bg-white p-3 font-semibold">☕ تست حضوری در کافه</div>
            <div className="rounded-xl border border-latte bg-white p-3 font-semibold">💳 پرداخت در محل و شتابی</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
            <span className="inline-block h-7 w-2 rounded-full bg-caramel" />
            محصولات مشابه
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
