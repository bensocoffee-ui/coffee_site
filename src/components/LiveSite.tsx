"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/lib/data";

export type PublicSite = Record<string, string>;

let cache: PublicSite | null = null;
let inflight: Promise<PublicSite> | null = null;

/** داده عمومی سایت را می‌گیرد (یک بار در هر بازدید) */
function usePublicSite(): PublicSite {
  const [data, setData] = useState<PublicSite | null>(cache);

  useEffect(() => {
    if (cache) return;
    if (!inflight) {
      inflight = fetch("/api/public/site")
        .then((r) => r.json())
        .then((j) => {
          const s = (j?.site ?? {}) as PublicSite;
          cache = s;
          return s;
        })
        .catch(() => ({}));
    }
    inflight.then((s) => setData(s));
  }, []);

  return data ?? {};
}

/** نوار اطلاعیه بالای سایت — متنش بدون بیلد مجدد، زنده بروز می‌شود */
export function AnnouncementBar() {
  const live = usePublicSite();
  const text = live.announcement ?? siteContent.announcement;
  return (
    <div className="bg-espresso px-4 py-2 text-center text-xs text-cream sm:text-sm">
      {text}
    </div>
  );
}

/** بلوک اطلاعات تماس فوتر — زنده */
export function FooterContactInfo() {
  const live = usePublicSite();
  const c = { ...siteContent, ...live };

  return (
    <ul className="space-y-2.5 text-sm text-cream/80">
      <li>📱 موبایل: {c.phoneMobile}</li>
      <li>☎️ پشتیبانی: {c.phoneSupport}</li>
      <li>
        ✉️{" "}
        <a href={`mailto:${c.email}`} className="transition hover:text-white">
          {c.email}
        </a>
      </li>
      <li>
        💬{" "}
        <a
          href={`https://wa.me/98${String(c.whatsapp).replace(/^0/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-white"
        >
          واتس‌اپ
        </a>
        {" / "}
        تلگرام: {c.telegram}
      </li>
      <li>📍 {c.address}</li>
      <li>🕘 {c.workingHours}</li>
    </ul>
  );
}

/** کارت‌های اطلاعات تماس در صفحه تماس با ما — زنده */
export function ContactCards() {
  const live = usePublicSite();
  const c = { ...siteContent, ...live };
  const wa = `https://wa.me/98${String(c.whatsapp).replace(/^0/, "")}`;

  const cards = [
    {
      icon: "📱",
      title: "موبایل",
      value: c.phoneMobile,
      href: `tel:${c.phoneMobile}`,
    },
    {
      icon: "☎️",
      title: "تلفن پشتیبانی",
      value: c.phoneSupport,
      href: `tel:${String(c.phoneSupport).replace(/-/g, "")}`,
    },
    { icon: "💬", title: "واتس‌اپ", value: c.whatsapp, href: wa },
    { icon: "✈️", title: "تلگرام", value: c.telegram },
    {
      icon: "✉️",
      title: "ایمیل",
      value: c.email,
      href: `mailto:${c.email}`,
    },
    { icon: "📍", title: "نشانی فروشگاه", value: c.address },
    { icon: "🕘", title: "ساعات کاری", value: c.workingHours },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex items-start gap-4 rounded-2xl border border-latte bg-white p-5"
        >
          <span className="text-3xl">{card.icon}</span>
          <div>
            <p className="font-bold">{card.title}</p>
            {card.href ? (
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-1 inline-block text-sm font-medium text-caramel-dark transition hover:text-caramel hover:underline"
              >
                {card.value}
              </a>
            ) : (
              <p className="mt-1 text-sm leading-7 text-taiga">{card.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
