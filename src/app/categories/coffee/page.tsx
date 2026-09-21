import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دسته‌بندی قهوه و کپسول | Benso Coffee",
  description: "انتخاب کپسول‌های نسپرسو لاین اوریجینال و ورتو با روست تازه و ضمانت اصالت بنسو کافی",
};

export default function CoffeeCategoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-taiga">
        <Link href="/" className="transition hover:text-caramel">
          خانه
        </Link>
        <span>/</span>
        <span className="font-bold text-espresso">دسته‌بندی قهوه و کپسول</span>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-caramel/20 px-3.5 py-1 text-xs font-extrabold text-caramel">
          دنیای طعم‌های اصیل
        </span>
        <h1 className="mt-2 text-3xl font-black text-espresso sm:text-4xl">
          انتخاب لاین کپسول و قهوه
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-taiga">
          دستگاه شما از کدام سیستم پشتیبانی می‌کند؟ برای ورود به ویترین طعم‌ها، لاین سازگار با دستگاه خود را انتخاب کنید.
        </p>
      </div>

      {/* 2 Primary Core Sub-categories */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Sub-category 1: Original Line */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sand bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-caramel hover:shadow-xl">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-espresso px-3 py-1 text-xs font-bold text-caramel">
                ▲ شکل کپسول: مخروطی کلاسیک
              </span>
              <span className="text-xs font-semibold text-taiga">پرفروش‌ترین سیستم</span>
            </div>

            <h2 className="text-2xl font-black text-espresso">
              کپسول‌های لاین اوریجینال (Original Line)
            </h2>
            <p className="mt-3 text-sm leading-7 text-taiga">
              مخصوص دستگاه‌های کلاسیک نسپرسو (Essenza Mini, Inissia, Pixie, CitiZ, Lattissima). عصاره‌گیری با فشار استاندارد ۱۹ بار با کرمای متراکم و طعم غلیظ اسپرسو.
            </p>

            <ul className="mt-5 space-y-2 text-xs text-taiga">
              <li className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>سایزهای نوشیدنی: ریسترتو (۲۵ml)، اسپرسو (۴۰ml)، لونگو (۱۱۰ml)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>بیش از ۳۵ طعم متنوع از لاین‌های ایتالیایی، باریستا و بدون کافئین</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>سازگار با انواع فوم‌ساز شیر و نوشیدنی‌های لاته و کاپوچینو</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-latte/60">
              <Image
                src="/images/showcase/cioccolatino-hero.png"
                alt="کپسول‌های اوریجینال لاین نسپرسو"
                fill
                className="object-contain p-4 transition duration-500 group-hover:scale-105"
              />
            </div>

            <Link
              href="/products?cat=capsule-original"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-espresso py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-caramel"
            >
              <span>مشاهده تمام کپسول‌های اوریجینال</span>
              <span>←</span>
            </Link>
          </div>
        </div>

        {/* Sub-category 2: Vertuo Line */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sand bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-caramel hover:shadow-xl">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-caramel px-3 py-1 text-xs font-bold text-white">
                ● شکل کپسول: گنبدی بارکددار
              </span>
              <span className="text-xs font-semibold text-taiga">فناوری نوین سانتریفیوژن</span>
            </div>

            <h2 className="text-2xl font-black text-espresso">
              کپسول‌های لاین ورتو (Vertuo Line)
            </h2>
            <p className="mt-3 text-sm leading-7 text-taiga">
              مخصوص دستگاه‌های سری ورتو (Vertuo Next, Vertuo Pop, VertuoPlus, Vertuo Creatista). استخراج با چرخش ۴۰۰۰ دور بر دقیقه برای فوم و کرمای ضخیم و بی‌نظیر.
            </p>

            <ul className="mt-5 space-y-2 text-xs text-taiga">
              <li className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>۵ سایز نوشیدنی: اسپرسو (۴۰ml)، دابل اسپرسو (۸۰ml)، گرن لونگو (۱۵۰ml)، ماگ (۲۳۰ml) و کاراف (۵۳۵ml)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>تنظیم خودکار دما، سرعت و حجم توسط بارکد هوشمند کپسول</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>مناسب عاشقان ماگ‌های بزرگ قهوه روزانه با کرمای مخملی</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-latte/60">
              <Image
                src="/images/showcase/p020-01.png"
                alt="کپسول‌های ورتو لاین نسپرسو"
                fill
                className="object-contain p-4 transition duration-500 group-hover:scale-105"
              />
            </div>

            <Link
              href="/products?cat=capsule-vertuo"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-espresso py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-caramel"
            >
              <span>مشاهده تمام کپسول‌های ورتو</span>
              <span>←</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Future Roadmap / Planned Categories */}
      <div className="mt-14 rounded-3xl border border-dashed border-sand bg-latte/40 p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-caramel text-xs text-white">
            ★
          </span>
          <h3 className="text-base font-extrabold text-espresso">
            کالکشن‌های در حال اضافه شدن به سبد بنسو کافی
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-taiga">
          به زودی برندها و لاین‌های تکمیلی نیز مستقیماً به این دسته‌بندی متصل خواهند شد:
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-sand/70 bg-white p-4">
            <span className="text-xs font-bold text-caramel">لاین استارباکس (Starbucks)</span>
            <p className="mt-1 text-[11px] text-taiga">کپسول‌های رسمی استارباکس برای اوریجینال و ورتو (به زودی)</p>
          </div>

          <div className="rounded-2xl border border-sand/70 bg-white p-4">
            <span className="text-xs font-bold text-caramel">دانه و پودر لاوازا (Lavazza)</span>
            <p className="mt-1 text-[11px] text-taiga">دانه‌های اسپرسو و ترکیبات محبوب لاوازا ایتالیا (به زودی)</p>
          </div>

          <div className="rounded-2xl border border-sand/70 bg-white p-4">
            <span className="text-xs font-bold text-caramel">دان قهوه اسپشیالتی بنسو</span>
            <p className="mt-1 text-[11px] text-taiga">روست تازه هفتگی تک‌خاستگاه اتیوپی، کلمبیا و برزیل (به زودی)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
