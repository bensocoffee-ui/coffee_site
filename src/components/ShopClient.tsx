"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  categoryGroups,
  categories,
  discountPercent,
  products,
} from "@/lib/data";

type SortKey = "newest" | "cheap" | "expensive" | "popular";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "newest", label: "جدیدترین" },
  { key: "popular", label: "محبوب‌ترین" },
  { key: "cheap", label: "ارزان‌ترین" },
  { key: "expensive", label: "گران‌ترین" },
];

export default function ShopClient() {
  const router = useRouter();
  const params = useSearchParams();
  const cat = params.get("cat") ?? "";
  const group = params.get("group") ?? "";
  const q = params.get("q") ?? "";
  const [sort, setSort] = useState<SortKey>("newest");

  function navigate(sp: URLSearchParams) {
    const qs = sp.toString();
    router.push(qs ? `/products?${qs}` : "/products");
  }

  function applyCat(slug: string) {
    const sp = new URLSearchParams(params.toString());
    if (slug) sp.set("cat", slug);
    else sp.delete("cat");
    navigate(sp);
  }

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    const sp = new URLSearchParams(params.toString());
    if (val) sp.set("q", val);
    else sp.delete("q");
    navigate(sp);
  }

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat) list = list.filter((p) => p.category === cat);
    else if (group) list = list.filter((p) => p.category.startsWith(group));
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.brand.toLowerCase().includes(needle),
      );
    }
    switch (sort) {
      case "cheap":
        list.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        list.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        list.sort((a, b) => discountPercent(b) - discountPercent(a));
    }
    return list;
  }, [cat, q, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* sidebar filters */}
      <aside className="space-y-6 self-start rounded-2xl border border-latte bg-white p-5 lg:sticky lg:top-40">
        <form onSubmit={submitSearch}>
          <label htmlFor="shop-q" className="mb-2 block text-sm font-bold">
            جستجو در فروشگاه
          </label>
          <input
            id="shop-q"
            name="q"
            key={q}
            defaultValue={q}
            placeholder="نام محصول یا برند…"
            className="w-full rounded-xl border border-latte px-4 py-2.5 text-sm outline-none focus:border-caramel"
          />
        </form>

        <div>
          <p className="mb-3 text-sm font-bold">دسته‌بندی‌ها</p>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => applyCat("")}
              className={`block w-full rounded-lg px-3 py-2 text-start text-sm transition ${
                cat === "" ? "bg-espresso text-white" : "hover:bg-cream"
              }`}
            >
              همه محصولات
            </button>
            {categoryGroups.map((g) => {
              const items = g.items.filter((c) =>
                products.some((p) => p.category === c.slug),
              );
              if (items.length === 0) return null;
              return (
                <div key={g.key} className="pt-2">
                  <p className="px-3 pb-1 text-xs font-bold text-caramel-dark">{g.label}</p>
                  {items.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => applyCat(c.slug)}
                      className={`block w-full rounded-lg px-3 py-2 text-start text-sm transition ${
                        cat === c.slug ? "bg-espresso text-white" : "hover:bg-cream"
                      }`}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-cream p-4 text-xs leading-6 text-taiga">
          💡 برای انتخاب کپسول مناسب، به عدد شدت طعم (۱ تا ۱۰) دقت کنید؛ اعداد
          بالاتر یعنی طعم غلیظ‌تر و تلخ‌تر.
        </div>
      </aside>

      {/* product grid */}
      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-taiga">
            {filtered.length} محصول یافت شد
            {cat && ` در «${categories.find((c) => c.slug === cat)?.title}»`}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-taiga">مرتب‌سازی:</span>
            {sortOptions.map((o) => (
              <button
                key={o.key}
                type="button"
                onClick={() => setSort(o.key)}
                className={`rounded-lg px-3 py-1.5 transition ${
                  sort === o.key
                    ? "bg-caramel text-white"
                    : "border border-sand bg-white hover:border-caramel"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sand bg-white p-16 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-4 font-bold">محصولی مطابق جستجوی شما پیدا نشد</p>
            <p className="mt-2 text-sm text-taiga">
              عبارت دیگری را امتحان کنید یا فیلتر دسته‌بندی را بردارید.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
