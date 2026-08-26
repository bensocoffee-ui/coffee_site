import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { blogPosts, categories, products } from "@/lib/data";

const trust = [
  { icon: "🛡️", title: "گارانتی ۱۸ ماهه", text: "خدمات پس از فروش معتبر برای همه دستگاه‌ها" },
  { icon: "🔄", title: "۷ روز مهلت تست", text: "بازگشت بی‌قید و شرط کالا تا یک هفته" },
  { icon: "✅", title: "ضمانت اصالت کالا", text: "تمامی محصولات اورجینال و دارای شناسه اصالت" },
  { icon: "💳", title: "پرداخت در محل", text: "امکان پرداخت هنگام تحویل در تهران و کرج" },
];

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="flex items-center gap-3 text-xl font-extrabold sm:text-2xl">
        <span className="inline-block h-7 w-2 rounded-full bg-caramel" />
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="rounded-lg border border-sand bg-white px-4 py-2 text-sm font-bold transition hover:border-caramel hover:text-caramel-dark"
        >
          مشاهده همه ←
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const machines = products.filter((p) =>
    p.category.startsWith("machine"),
  );
  const capsules = products.filter((p) => p.category.startsWith("capsule"));
  const accessories = products.filter((p) => p.category === "accessory");
  const deals = products.filter((p) => p.oldPrice);
  const presentCategories = categories.filter((c) =>
    products.some((p) => p.category === c.slug),
  );
  const catIcon = (g: string) =>
    g === "machine" ? "☕" : g === "capsule" ? "🟤" : "🎁";

  return (
    <>
      <HeroSlider />

      {/* trust badges */}
      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div
              key={t.title}
              className="flex items-start gap-3 rounded-2xl border border-latte bg-white p-5"
            >
              <span className="text-3xl">{t.icon}</span>
              <div>
                <p className="font-bold">{t.title}</p>
                <p className="mt-1 text-xs leading-6 text-taiga">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* categories */}
      <section className="mx-auto mt-14 max-w-7xl px-4">
        <SectionHeader title="دسته‌بندی فروشگاه" href="/products" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {presentCategories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/products?cat=${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-latte bg-gradient-to-bl from-espresso to-mocha p-6 text-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="absolute -bottom-4 -left-2 select-none text-6xl opacity-20 transition group-hover:scale-125">
                {catIcon(c.group)}
              </span>
              <p className="text-sm font-extrabold leading-7 sm:text-base">
                {c.title}
              </p>
              <p className="mt-2 text-xs text-caramel">خرید کنید ←</p>
            </Link>
          ))}
        </div>
      </section>

      {/* machines */}
      {machines.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4">
          <SectionHeader
            title="دستگاه‌های قهوه‌ساز کپسولی"
            href="/products?cat=machine-original"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {machines.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* capsules banner + grid */}
      {capsules.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4">
          <SectionHeader
            title="کپسول قهوه نسپرسو — اورجینال لاین"
            href="/products"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {capsules.slice(0, 8).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* accessories */}
      {accessories.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4">
          <SectionHeader title="اکسسوری قهوه" href="/products?cat=accessory" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {accessories.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* special offers */}
      {deals.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4">
          <SectionHeader title="پیشنهادهای شگفت‌انگیز" href="/products" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {deals.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* blog */}
      <section className="mx-auto mt-16 max-w-7xl px-4">
        <SectionHeader title="از مجله Benso Coffee" />
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((b) => (
            <article
              key={b.slug}
              className="flex flex-col rounded-2xl border border-latte bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="w-fit rounded-full bg-latte px-3 py-1 text-xs font-bold text-taiga">
                مجله قهوه
              </span>
              <h3 className="mt-4 font-bold leading-7">{b.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-taiga">{b.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-taiga">
                <span>{b.date}</span>
                <span>⏱ {b.readTime} مطالعه</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
