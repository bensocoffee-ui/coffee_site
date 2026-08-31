"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { categoryGroups, products } from "@/lib/data";
import { AnnouncementBar } from "@/components/LiveSite";

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-espresso text-xl">
        ☕
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold">Benso Coffee</span>
        <span className="block text-[10px] tracking-widest text-taiga">
          BENSO COFFEE
        </span>
      </span>
    </Link>
  );
}

function SearchBox({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
  }

  return (
    <form onSubmit={submit} className={`flex items-center ${className}`}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="جستجوی محصول، برند یا دسته‌بندی…"
        className="w-full rounded-r-xl border border-latte bg-white px-4 py-2.5 text-sm outline-none placeholder:text-taiga/60 focus:border-caramel"
      />
      <button
        type="submit"
        className="rounded-l-xl bg-caramel px-4 py-2.5 text-sm font-bold text-white transition hover:bg-caramel-dark"
        aria-label="جستجو"
      >
        🔍
      </button>
    </form>
  );
}

export default function Header() {
  const { count } = useCart();
  const [openMobile, setOpenMobile] = useState(false);

  const availableGroups = useMemo(
    () =>
      categoryGroups
        .map((g) => ({
          ...g,
          items: g.items.filter((c) => products.some((p) => p.category === c.slug)),
        }))
        .filter((g) => g.items.length > 0),
    [],
  );

  const groups: Record<string, string> = {
    machine: "دستگاه قهوه‌ساز",
    capsule: "کپسول قهوه",
    accessory: "اکسسوری",
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <AnnouncementBar />

      <div className="border-b border-latte bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button
            type="button"
            onClick={() => setOpenMobile((v) => !v)}
            className="rounded-lg p-2 text-xl lg:hidden"
            aria-label="منو"
          >
            ☰
          </button>
          <Logo />
          <SearchBox className="mx-auto hidden w-full max-w-xl md:flex" />
          <Link
            href="/account"
            className="hidden items-center gap-1.5 rounded-xl border border-sand bg-white px-3 py-2.5 text-sm font-bold transition hover:border-caramel md:flex"
          >
            👤 حساب کاربری
          </Link>
          <Link
            href="/cart"
            className="relative ms-auto flex items-center gap-2 rounded-xl border border-sand bg-white px-4 py-2.5 text-sm font-bold transition hover:border-caramel md:ms-0"
          >
            🛒 سبد خرید
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-espresso px-1.5 text-xs font-extrabold text-white">
              {count}
            </span>
          </Link>
        </div>

        <nav className="mx-auto hidden max-w-7xl items-stretch gap-1 px-4 pb-1 lg:flex">
          <Link
            href="/products"
            className="rounded-t-lg px-4 py-2.5 text-sm font-bold transition hover:bg-latte hover:text-caramel-dark"
          >
            همه محصولات
          </Link>
          {availableGroups.map((g) => (
            <div key={g.key} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-t-lg px-4 py-2.5 text-sm font-bold transition group-hover:bg-latte group-hover:text-caramel-dark"
              >
                {groups[g.key]} <span className="text-[10px]">▾</span>
              </button>
              <div className="invisible absolute start-0 top-full z-50 min-w-56 rounded-b-xl rounded-tl-xl border border-latte bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                {g.items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products?cat=${c.slug}`}
                    className="block px-5 py-2.5 text-sm transition hover:bg-cream hover:text-caramel-dark"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/about"
            className="rounded-t-lg px-4 py-2.5 text-sm font-bold transition hover:bg-latte hover:text-caramel-dark"
          >
            درباره ما
          </Link>
          <Link
            href="/contact"
            className="rounded-t-lg px-4 py-2.5 text-sm font-bold transition hover:bg-latte hover:text-caramel-dark"
          >
            تماس با ما
          </Link>
        </nav>
      </div>

      {openMobile && (
        <div className="border-b border-latte bg-white px-4 py-4 lg:hidden">
          <SearchBox />
          <div className="mt-4 space-y-4">
          {availableGroups.map((g) => (
              <div key={g.key}>
                <p className="mb-1.5 font-bold text-caramel-dark">{groups[g.key]}</p>
                {g.items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products?cat=${c.slug}`}
                    onClick={() => setOpenMobile(false)}
                    className="block py-1.5 ps-3 text-sm text-mocha"
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex gap-4 border-t border-latte pt-3 text-sm font-bold">
              <Link href="/about" onClick={() => setOpenMobile(false)}>درباره ما</Link>
              <Link href="/contact" onClick={() => setOpenMobile(false)}>تماس با ما</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
