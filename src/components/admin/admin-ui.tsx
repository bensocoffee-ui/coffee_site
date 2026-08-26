"use client";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-taiga">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-latte px-3 py-2 text-sm outline-none focus:border-caramel";

export type RawItem = Record<string, unknown> & {
  slug: string;
  name?: string;
  category?: string;
  priceTry?: number;
  intensity?: number | null;
  badge?: string | null;
  desc?: string;
  features?: string[];
  img?: string | null;
  rating?: number;
  reviews?: number;
  brand?: string;
  hidden?: boolean;
};

export type SiteData = Record<string, string | number>;

export const ADMIN_CATEGORIES = [
  { slug: "capsule-original", title: "کپسول اورجینال لاین" },
  { slug: "capsule-vertuo", title: "کپسول ورتو لاین" },
  { slug: "machine-original", title: "دستگاه اورجینال" },
  { slug: "machine-vertuo", title: "دستگاه ورتو" },
  { slug: "accessory", title: "اکسسوری" },
];
