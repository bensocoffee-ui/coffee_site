import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دسته‌بندی دستگاه‌های تخصصی | Benso Coffee",
  description: "خرید دستگاه‌های قهوه‌ساز سوئیسی نسپرسو اوریجینال و ورتو با ۱۸ ماه گارانتی تعویض و خدمات بنسو کافی",
};

export default function MachinesCategoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-taiga">
        <Link href="/" className="transition hover:text-caramel">
          خانه
        </Link>
        <span>/</span>
        <span className="font-bold text-espresso">دسته‌بندی دستگاه‌ها</span>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-caramel/20 px-3.5 py-1 text-xs font-extrabold text-caramel">
          مهندسی سوئیسی · گارانتی ۱۸ ماهه
        </span>
        <h1 className="mt-2 text-3xl font-black text-espresso sm:text-4xl">
          دستگاه‌های تخصصی نسپرسو
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-taiga">
          دستگاه‌های اسپرسوساز خانگی و حرفه‌ای را بر اساس سیستم عصاره‌گیری و نوشیدنی‌های دلخواه خود انتخاب کنید.
        </p>
      </div>

      {/* 2 Core Machine Categories */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        {/* Sub-category 1: Original Machines */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sand bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-caramel hover:shadow-xl">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-espresso px-3 py-1 text-xs font-bold text-caramel">
                سیستم فشار ۱۹ بار
              </span>
              <span className="text-xs font-semibold text-taiga">۱۸ ماه گارانتی معتبر</span>
            </div>

            <h2 className="text-2xl font-black text-espresso">
              دستگاه‌های لاین اوریجینال (Original Machines)
            </h2>
            <p className="mt-3 text-sm leading-7 text-taiga">
              ایده‌آل برای طرفداران اسپرسوی کلاسیک غلیظ ایتالیایی، کاپوچینو و لاته. طراحی کامپکت با تنوع بسیار بالا از مدل‌های تک‌کاره تا تمام اتوماتیک با مخزن شیر.
            </p>

            <div className="mt-5 space-y-2 text-xs text-taiga">
              <div className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span><strong>مدل‌های شاخص:</strong> Lattissima One، Essenza Mini، CitiZ Platinum، Pixie</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>عصاره‌گیری سریع در ۲۵ ثانیه با دمای پایدار</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>فراوانی و تنوع فوق‌العاده کپسول‌ها در سراسر بازار ایران</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl bg-latte/60">
              <Image
                src="/images/showcase/p009-01.png"
                alt="دستگاه‌های اوریجینال لاین نسپرسو"
                fill
                className="object-contain p-4 transition duration-500 group-hover:scale-105"
              />
            </div>

            <Link
              href="/products?cat=machine-original"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-espresso py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-caramel"
            >
              <span>مشاهده و خرید دستگاه‌های اوریجینال</span>
              <span>←</span>
            </Link>
          </div>
        </div>

        {/* Sub-category 2: Vertuo Machines */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sand bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-caramel hover:shadow-xl">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-caramel px-3 py-1 text-xs font-bold text-white">
                فناوری Centrifusion™
              </span>
              <span className="text-xs font-semibold text-taiga">نسل جدید نسپرسو</span>
            </div>

            <h2 className="text-2xl font-black text-espresso">
              دستگاه‌های لاین ورتو (Vertuo Machines)
            </h2>
            <p className="mt-3 text-sm leading-7 text-taiga">
              طراحی مدرن برای آماده‌سازی انواع حجم‌های قهوه از شات اسپرسو تا ماگ‌های پرحجم صبحانه. مجهز به بارکدخوان هوشمند کپسول و سیستم چرخش دورانی.
            </p>

            <div className="mt-5 space-y-2 text-xs text-taiga">
              <div className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span><strong>مدل‌های شاخص:</strong> Vertuo Creatista استیل، Vertuo Next، Vertuo Pop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>استخراج خودکار بدون نیاز به تنظیمات دستی بر اساس بارکد هر کپسول</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-caramel">✔</span>
                <span>تولید ضخیم‌ترین کرما و فوم طبیعی قهوه روی هر فنجان</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative mb-6 h-52 w-full overflow-hidden rounded-2xl bg-latte/60">
              <Image
                src="/images/showcase/p020-01.png"
                alt="دستگاه‌های ورتو لاین نسپرسو"
                fill
                className="object-contain p-4 transition duration-500 group-hover:scale-105"
              />
            </div>

            <Link
              href="/products?cat=machine-vertuo"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-espresso py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-caramel"
            >
              <span>مشاهده و خرید دستگاه‌های ورتو</span>
              <span>←</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Quick Comparison / Guide */}
      <div className="mt-14 rounded-3xl border border-sand bg-white p-8 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">⚖️</span>
          <div>
            <h3 className="text-lg font-black text-espresso">
              کدام دستگاه برای شما مناسب‌تر است؟
            </h3>
            <p className="text-xs text-taiga">راهنمای سریع انتخاب بین اوریجینال و ورتو</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-latte/50 p-5">
            <h4 className="font-bold text-espresso">دستگاه اوریجینال را انتخاب کنید اگر:</h4>
            <p className="mt-2 text-xs leading-6 text-taiga">
              عاشق اسپرسوهای سنتی ایتالیایی هستید، اهل لاته و کاپوچینو هستید و می‌خواهید از تنوع عظیم برندهای سازگار بازار در آینده استفاده کنید.
            </p>
          </div>
          <div className="rounded-2xl bg-latte/50 p-5">
            <h4 className="font-bold text-espresso">دستگاه ورتو را انتخاب کنید اگر:</h4>
            <p className="mt-2 text-xs leading-6 text-taiga">
              اهل نوشیدن ماگ‌های بزرگ قهوه در طول روز هستید، فوم و کرمای غلیظ را دوست دارید و می‌خواهید مدرن‌ترین فناوری نسپرسو را روی میز کار خود داشته باشید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
