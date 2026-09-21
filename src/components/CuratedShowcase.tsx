"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@/lib/data";

export default function CuratedShowcase({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState<"all" | "capsule" | "machine" | "accessory">("all");

  const curatedList = useMemo(() => {
    // Pick top high-demand products
    const capsules = products.filter((p) => p.category.startsWith("capsule")).slice(0, 8);
    const machines = products.filter((p) => p.category.startsWith("machine")).slice(0, 4);
    const accessories = products.filter((p) => p.category === "accessory").slice(0, 4);

    if (activeTab === "capsule") return capsules;
    if (activeTab === "machine") return machines;
    if (activeTab === "accessory") return accessories;

    // "all": balanced blend of top capsules, machines, and accessories (8 items)
    return [
      ...capsules.slice(0, 4),
      ...machines.slice(0, 2),
      ...accessories.slice(0, 2),
    ];
  }, [products, activeTab]);

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4" id="bestsellers">
      <div className="mb-8 text-center">
        <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-caramel">
          پیش‌نمایش منتخب‌ها
        </span>
        <h2 className="mt-1 text-2xl font-black text-espresso sm:text-3xl">
          محبوب‌ترین‌های این فصل
        </h2>
        <p className="mt-2 text-sm text-taiga">
          گلچینی از کپسول‌های پرفروش، دستگاه‌های پرچمدار و اکسسوری‌های منتخب بنسو کافی
        </p>

        {/* Filter Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "all"
                ? "bg-espresso text-white shadow-md"
                : "border border-sand bg-white text-taiga hover:border-caramel hover:text-espresso"
            }`}
          >
            همه برگزیده‌ها
          </button>
          <button
            onClick={() => setActiveTab("capsule")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "capsule"
                ? "bg-espresso text-white shadow-md"
                : "border border-sand bg-white text-taiga hover:border-caramel hover:text-espresso"
            }`}
          >
            پرفروش‌ترین کپسول‌ها
          </button>
          <button
            onClick={() => setActiveTab("machine")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "machine"
                ? "bg-espresso text-white shadow-md"
                : "border border-sand bg-white text-taiga hover:border-caramel hover:text-espresso"
            }`}
          >
            دستگاه‌های سوئیسی
          </button>
          <button
            onClick={() => setActiveTab("accessory")}
            className={`rounded-full px-5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "accessory"
                ? "bg-espresso text-white shadow-md"
                : "border border-sand bg-white text-taiga hover:border-caramel hover:text-espresso"
            }`}
          >
            اکسسوری و ماگ
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {curatedList.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-7 py-3 text-sm font-bold text-espresso shadow-sm transition hover:border-caramel hover:bg-latte"
        >
          <span>مشاهده تمام محصولات در کاتالوگ بنسو</span>
          <span>←</span>
        </Link>
      </div>
    </section>
  );
}
