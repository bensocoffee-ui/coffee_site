import { generatedProducts } from "./products.generated";
import { generatedExtraProducts } from "./products.extra.generated";
import rateData from "./rate.json";
import adminProductsJson from "../../admin-data/products.json";
import siteDataJson from "../../admin-data/site.json";

export type ArtType =
  | "capsule"
  | "machine"
  | "frother"
  | "stand"
  | "cup"
  | "kit";

export type Category = {
  slug: string;
  title: string;
  group: "machine" | "capsule" | "accessory";
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  priceTry?: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  intensity?: number;
  badge?: string;
  desc: string;
  features: string[];
  art: { type: ArtType; from: string; to: string };
  img?: string;
  /** ناموجود موقت — از سایت حذف می‌شود ولی در پنل قابل بازگشت است */
  hidden?: boolean;
};

export const categories: Category[] = [
  { slug: "machine-original", title: "دستگاه قهوه اورجینال لاین", group: "machine" },
  { slug: "machine-vertuo", title: "دستگاه قهوه ورتو لاین", group: "machine" },
  { slug: "machine-dolce", title: "دستگاه دولچه گوستو", group: "machine" },
  { slug: "capsule-original", title: "کپسول اورجینال لاین", group: "capsule" },
  { slug: "capsule-vertuo", title: "کپسول ورتو لاین", group: "capsule" },
  { slug: "capsule-dolce", title: "کپسول دولچه گوستو", group: "capsule" },
  { slug: "accessory", title: "اکسسوری قهوه", group: "accessory" },
];

export const categoryGroups = [
  {
    key: "machine" as const,
    label: "دستگاه قهوه‌ساز",
    items: categories.filter((c) => c.group === "machine"),
  },
  {
    key: "capsule" as const,
    label: "کپسول قهوه",
    items: categories.filter((c) => c.group === "capsule"),
  },
  {
    key: "accessory" as const,
    label: "اکسسوری",
    items: categories.filter((c) => c.group === "accessory"),
  },
];

/** نرخ تبدیل لیر ترکیه به تومان — توسط scripts/update-rate.js هفتگی بروز می‌شود */
export const exchangeRate = rateData.rate as number;
export const exchangeRateUpdatedAt = rateData.updatedAt as string;

const roundToman = (try_: number) =>
  Math.max(1000, Math.round((try_ * exchangeRate) / 1000) * 1000);

type RawProduct = Omit<Product, "price" | "art"> & {
  art: { type: string; from: string; to: string };
  priceTry?: number;
};

/** محصولات از پنل مدیریتی (admin-data/products.json) — در نبود آن، داده تولیدی اولیه */
const rawProducts: RawProduct[] = (adminProductsJson as RawProduct[]).length
  ? (adminProductsJson as RawProduct[])
  : [...generatedProducts, ...generatedExtraProducts];

export const products: Product[] = rawProducts
  .map((p) => ({
    ...p,
    art: { ...p.art, type: p.art.type as ArtType },
    price: p.priceTry ? roundToman(p.priceTry) : 0,
  }))
  .filter((p) => !p.hidden);

/** همه محصولات حتی مخفی‌ها — فقط برای پنل مدیریت */
export const allProducts: Product[] = rawProducts.map((p) => ({
  ...p,
  art: { ...p.art, type: p.art.type as ArtType },
  price: p.priceTry ? roundToman(p.priceTry) : 0,
}));

export const siteContent = siteDataJson as SiteContent;

export type SiteContent = {
  passwordHash: string;
  announcement: string;
  phoneMobile: string;
  phoneSupport: string;
  email: string;
  whatsapp: string;
  telegram: string;
  address: string;
  workingHours: string;
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function discountPercent(p: Product) {
  if (!p.oldPrice) return 0;
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}

const faNumFormatter = new Intl.NumberFormat("fa-IR");

export function formatToman(n: number) {
  return `${faNumFormatter.format(n)} تومان`;
}

export function faNumber(n: number | string) {
  return faNumFormatter.format(Number(n));
}

export const FREE_SHIPPING_THRESHOLD = 5000000;

export const blogPosts = [
  {
    slug: "intensity-guide",
    title: "راهنمای کامل شدت طعم (Intensity) در کپسول‌های قهوه",
    excerpt:
      "عددی که روی بسته کپسول می‌بینید دقیقاً چه معنایی دارد؟ یاد بگیرید بر اساس ذائقه‌تان کپسول درست را انتخاب کنید.",
    date: "۱۴ مرداد ۱۴۰۵",
    readTime: "۶ دقیقه",
  },
  {
    slug: "machine-care",
    title: "۵ اشتباه رایج که عمر دستگاه قهوه‌ساز کپسولی را کم می‌کند",
    excerpt:
      "از آب سخت گرفته تا فراموش کردن رسوب‌گیری دوره‌ای؛ این اشتباهات ساده را امروز کنار بگذارید.",
    date: "۲ مرداد ۱۴۰۵",
    readTime: "۴ دقیقه",
  },
  {
    slug: "latte-vs-cappuccino",
    title: "لاته، کاپوچینو یا ماکیاتو؟ تفاوت‌ها را یک‌بار برای همیشه بدانید",
    excerpt:
      "نسبت شیر، فوم و اسپرسو چه فرقی می‌کند؟ راهنمای تصویری ما منوی کافه را برایتان رمزگشایی می‌کند.",
    date: "۲۵ تیر ۱۴۰۵",
    readTime: "۵ دقیقه",
  },
];
