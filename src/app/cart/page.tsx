"use client";

import Link from "next/link";
import { useState } from "react";
import ProductMedia from "@/components/ProductMedia";
import { useCart } from "@/components/CartProvider";
import {
  FREE_SHIPPING_THRESHOLD,
  formatToman,
  getProduct,
} from "@/lib/data";

export default function CartPage() {
  const { items, total, setQty, remove, clear } = useCart();
  const [ordered, setOrdered] = useState(false);

  const shipping = total >= FREE_SHIPPING_THRESHOLD || total === 0 ? 0 : 450000;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-7xl">🛒</p>
        <h1 className="mt-6 text-2xl font-extrabold">سبد خرید شما خالی است!</h1>
        <p className="mt-3 leading-8 text-taiga">
          هنوز محصولی انتخاب نکرده‌اید. از میان کپسول‌های قهوه، دستگاه‌های
          قهوه‌ساز کپسولی و اکسسوری‌ها دیدن کنید.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-espresso px-8 py-3.5 font-bold text-white transition hover:bg-mocha"
        >
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-extrabold sm:text-3xl">سبد خرید</h1>

      {/* free shipping progress */}
      <div className="mb-8 rounded-2xl border border-latte bg-white p-5">
        {remaining > 0 ? (
          <p className="text-sm font-bold">
            🚚 تنها <span className="text-caramel-dark">{formatToman(remaining)}</span> تا
            ارسال رایگان فاصله دارید!
          </p>
        ) : (
          <p className="text-sm font-bold text-emerald-700">
            🎉 سفارش شما شامل ارسال رایگان است!
          </p>
        )}
        <div className="mt-3 h-2.5 w-full rounded-full bg-latte">
          <div
            className="h-full rounded-full bg-gradient-to-l from-caramel to-espresso transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* items */}
        <div className="space-y-4">
          {items.map((item) => {
            const p = getProduct(item.slug);
            if (!p) return null;
            return (
              <div
                key={item.slug}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-latte bg-white p-4 sm:flex-nowrap"
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="group shrink-0 overflow-hidden rounded-xl bg-latte"
                >
                  <span className="relative block h-24 w-24">
                    <ProductMedia product={p} sizes="96px" />
                  </span>
                </Link>
                <div className="min-w-40 flex-1">
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-bold transition hover:text-caramel-dark"
                  >
                    {p.name}
                  </Link>
                  <p className="mt-1 text-xs text-taiga">برند: {p.brand}</p>
                  <button
                    type="button"
                    onClick={() => remove(p.slug)}
                    className="mt-2 text-xs font-bold text-red-600 transition hover:text-red-800"
                  >
                    🗑 حذف از سبد
                  </button>
                </div>
                <div className="flex items-center rounded-xl border border-sand">
                  <button
                    type="button"
                    onClick={() => setQty(p.slug, item.qty - 1)}
                    className="px-3.5 py-2 font-bold text-taiga transition hover:text-caramel"
                    aria-label="کاهش تعداد"
                  >
                    −
                  </button>
                  <span className="min-w-9 text-center font-extrabold">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(p.slug, item.qty + 1)}
                    className="px-3.5 py-2 font-bold text-taiga transition hover:text-caramel"
                    aria-label="افزایش تعداد"
                  >
                    +
                  </button>
                </div>
                <div className="min-w-32 text-end text-sm font-black">
                  {formatToman(p.price * item.qty)}
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={clear}
            className="text-sm font-bold text-taiga underline-offset-4 transition hover:text-red-600 hover:underline"
          >
            خالی کردن کل سبد خرید
          </button>
        </div>

        {/* summary */}
        <aside className="self-start rounded-2xl border border-latte bg-white p-6 lg:sticky lg:top-40">
          <h2 className="font-extrabold">خلاصه سفارش</h2>
          <dl className="mt-5 space-y-3.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-taiga">مجموع کالاها</dt>
              <dd className="font-bold">{formatToman(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-taiga">هزینه ارسال</dt>
              <dd className="font-bold">
                {shipping === 0 ? (
                  <span className="text-emerald-700">رایگان</span>
                ) : (
                  formatToman(shipping)
                )}
              </dd>
            </div>
            <div className="border-t border-dashed border-sand pt-4">
              <div className="flex justify-between text-base">
                <dt className="font-bold">مبلغ قابل پرداخت</dt>
                <dd className="font-black text-caramel-dark">
                  {formatToman(total + shipping)}
                </dd>
              </div>
            </div>
          </dl>

          {ordered ? (
            <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center text-sm font-bold leading-7 text-emerald-800">
              ✓ سفارش آزمایشی شما ثبت شد!
              <span className="block text-xs font-normal text-emerald-700">
                (این یک دمو است و درگاه پرداخت واقعی متصل نیست)
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setOrdered(true)}
              className="mt-6 w-full rounded-xl bg-espresso py-4 font-extrabold text-white transition hover:bg-mocha active:scale-[.98]"
            >
              ادامه فرایند خرید
            </button>
          )}

          <Link
            href="/products"
            className="mt-3 block w-full rounded-xl border border-sand py-3 text-center text-sm font-bold transition hover:border-caramel"
          >
            ← ادامه خرید
          </Link>
        </aside>
      </div>
    </div>
  );
}
