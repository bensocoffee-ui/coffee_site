import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import WaterfallShowcase from "@/components/WaterfallShowcase";
import CuratedShowcase from "@/components/CuratedShowcase";
import CoffeeQuiz from "@/components/CoffeeQuiz";
import TrustValueBar from "@/components/TrustValueBar";
import { blogPosts, products } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Lifestyle Banner */}
      <HeroSlider />

      {/* 2. Onyx-style 3-Category Waterfall Showcase */}
      <WaterfallShowcase />

      {/* 3. Curated Bestsellers & Featured Collection */}
      <CuratedShowcase products={products} />

      {/* 4. Interactive Coffee Taste Finder Quiz */}
      <CoffeeQuiz />

      {/* 5. Luxury SEO Articles Section (مجله بنسو کافی) */}
      <section className="mx-auto mt-20 max-w-7xl px-4" id="magazine">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-latte pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-caramel">
              دانش تخصصی قهوه
            </span>
            <h2 className="mt-1 text-2xl font-black text-espresso sm:text-3xl">
              از مجله تخصصی Benso Coffee
            </h2>
            <p className="mt-2 text-sm text-taiga">
              راهنماهای جامع باریستا، تکنیک‌های نگهداری دستگاه و شناخت اصالت کپسول‌های سوئیسی
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 self-start rounded-xl border border-sand bg-white px-5 py-2.5 text-xs font-bold text-espresso transition hover:border-caramel hover:bg-latte sm:self-auto sm:text-sm"
          >
            <span>ورود به کاتالوگ فروشگاه</span>
            <span>←</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((b) => (
            <article
              key={b.slug}
              className="group flex flex-col rounded-3xl border border-latte bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-caramel hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-latte px-3.5 py-1 text-xs font-bold text-espresso border border-sand">
                  ☕ راهنمای تخصصی
                </span>
                <span className="text-xs text-taiga">⏱ {b.readTime}</span>
              </div>

              <h3 className="mt-5 text-lg font-black leading-snug text-espresso transition group-hover:text-caramel-dark">
                {b.title}
              </h3>

              <p className="mt-3 flex-1 text-xs leading-relaxed text-taiga">
                {b.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-latte pt-4 text-xs">
                <span className="font-medium text-taiga">{b.date}</span>
                <span className="font-bold text-caramel transition group-hover:translate-x-[-4px]">
                  مطالعه کامل مقاله ←
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Minimal Trust & Value Proposition Bar */}
      <TrustValueBar />
    </>
  );
}
