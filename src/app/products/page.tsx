import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "فروشگاه",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-sm text-taiga">
        خانه / فروشگاه
      </nav>
      <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">همه محصولات</h1>
      <p className="mb-8 text-sm leading-7 text-taiga">
        کپسول قهوه، دستگاه قهوه‌ساز کپسولی و اکسسوری‌های مرتبط را جستجو و فیلتر
        کنید.
      </p>

      <Suspense
        fallback={<p className="py-20 text-center text-taiga">در حال بارگذاری…</p>}
      >
        <ShopClient />
      </Suspense>
    </div>
  );
}
