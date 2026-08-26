import type { Metadata } from "next";

export const metadata: Metadata = { title: "درباره ما" };

const stats = [
  { num: "+۱۲٬۰۰۰", label: "سفارش موفق" },
  { num: "+۴۰", label: "تنوع طعم کپسول" },
  { num: "۹۸٪", label: "رضایت مشتریان" },
  { num: "۲۴/۷", label: "پشتیبانی آنلاین" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">درباره Benso Coffee</h1>
      <p className="mt-6 leading-9 text-mocha">
        Benso Coffee از یک ایده ساده شروع شد: «هر کسی در خانه‌اش حق دارد یک فنجان
        قهوه بی‌نقص بنوشد.» ما مجموعه‌ای دقیق و تخصصی از دستگاه‌های قهوه‌ساز
        کپسولی، کپسول‌های اصل و اکسسوری‌های حرفه‌ای را گرد آورده‌ایم تا تجربه
        کافه را به آشپزخانه شما بیاوریم.
      </p>
      <p className="mt-4 leading-9 text-mocha">
        تیم ما قبل از عرضه هر محصولی، آن را ماه‌ها تست می‌کند؛ از پایداری دما و
        فشار پمپ گرفته تا کیفیت کرما و طعم نهایی نوشیدنی. اگر محصولی در قفسه‌های
        ماست، یعنی خودمان هم آن را دوست داریم.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-latte bg-white p-6 text-center"
          >
            <p className="text-2xl font-black text-caramel-dark">{s.num}</p>
            <p className="mt-2 text-xs font-bold text-taiga">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-espresso p-8 text-cream">
        <h2 className="text-xl font-extrabold text-caramel">تعهد ما</h2>
        <ul className="mt-5 space-y-3 text-sm leading-8">
          <li>✅ فروش فقط محصولات اصل با شناسه اصالت</li>
          <li>🛡️ گارانتی واقعی و خدمات پس از فروش پاسخ‌گو</li>
          <li>📦 بسته‌بندی ایمن و ارسال سریع به سراسر ایران</li>
          <li>💬 مشاوره صادقانه؛ حتی اگر یعنی بگوییم این محصول برای شما نیست!</li>
        </ul>
      </div>
    </div>
  );
}
