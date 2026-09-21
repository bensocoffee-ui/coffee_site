"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    kicker: "🍂 کالکشن منتخب پاییزه بنسو",
    title: "عصر جدید عطر و اصالت در فنجان شما",
    text: "دست‌چین تازه‌ترین کپسول‌های اسپشیالتی و پرچمداران دستگاه‌های سوئیسی با ۱۸ ماه گارانتی تعویض بنسو کافی.",
    cta: "مشاهده ویترین محصولات",
    href: "/products",
    bg: "linear-gradient(120deg, #140C07 0%, #2b1d13 55%, #503a28 100%)",
    img: "/images/hero/athens-freddo-lifestyle.jpg",
    emoji: "☕",
  },
  {
    kicker: "پرفروش‌ترین کپسول‌ها",
    title: "تنوع بی‌نظیر طعم‌های ایتالیایی و ورتو",
    text: "بیش از ۴۰ طعم اختصاصی؛ از رست غلیظ ناپولی تا نت‌های کاراملی و شکلاتی باریستا کریشنز.",
    cta: "خرید آنلاین کپسول",
    href: "/products?cat=capsule",
    bg: "linear-gradient(120deg, #3d2c1e 0%, #7a5230 60%, #c68a3b 100%)",
    img: "/images/hero/hero-beans.jpg",
    emoji: "🟤",
  },
  {
    kicker: "دستگاه‌های لاته و کاپوچینو",
    title: "طراحی لوکس سوئیسی با ۱۸ ماه گارانتی",
    text: "از مدل‌های جمع‌وجور خانگی تا پرچمداران تمام‌اتوماتیک مخزن‌دار؛ آماده‌سازی با یک لمس.",
    cta: "مشاهده دستگاه‌ها",
    href: "/products?cat=machine",
    bg: "linear-gradient(120deg, #1f2937 0%, #44403c 60%, #a8a29e 100%)",
    img: "/images/hero/hero-latte-art.jpg",
    emoji: "✨",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative mx-auto mt-6 max-w-7xl px-4">
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{ background: slides[index].bg }}
      >
        <Image
          key={slides[index].img}
          src={slides[index].img}
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="animate-fade-up object-cover opacity-65"
          priority={index === 0}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(18,11,5,.35) 0%, rgba(18,11,5,.82) 55%, rgba(18,11,5,.94) 100%)",
          }}
        />
        <div
          className="relative flex min-h-80 flex-col items-start justify-center gap-4 p-10 text-white sm:min-h-[420px] sm:p-16 animate-fade-up"
          key={index}
        >
          <span className="rounded-full border border-caramel/40 bg-caramel/20 px-4 py-1.5 text-xs font-bold text-caramel backdrop-blur-sm">
            {slides[index].kicker}
          </span>
          <h1 className="max-w-xl text-3xl font-extrabold leading-snug sm:text-5xl sm:leading-[1.35]">
            {slides[index].title}
          </h1>
          <p className="max-w-lg text-sm leading-7 text-white/85 sm:text-base">
            {slides[index].text}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Link
              href={slides[index].href}
              className="rounded-xl bg-caramel px-7 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-caramel-dark active:scale-95"
            >
              {slides[index].cta}
            </Link>
            <Link
              href="#bestsellers"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              پرفروش‌ترین‌های این فصل
            </Link>
          </div>
        </div>
        <span className="pointer-events-none absolute -left-8 top-1/2 hidden -translate-y-1/2 select-none text-[180px] opacity-15 blur-[1px] lg:block">
          {slides[index].emoji}
        </span>

        <div className="absolute bottom-5 start-0 end-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`اسلاید ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-caramel" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
