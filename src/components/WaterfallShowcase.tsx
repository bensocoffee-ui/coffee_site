import Image from "next/image";
import Link from "next/link";

export default function WaterfallShowcase() {
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4" id="categories">
      <div className="mb-8 text-center">
        <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-caramel">
          دسترسی مستقیم
        </span>
        <h2 className="mt-1 text-2xl font-black text-espresso sm:text-3xl">
          ویترین سه‌گانه بنسو کافی
        </h2>
        <p className="mt-2 text-sm text-taiga">
          مسیر سریع ورود به دنیای طعم‌ها، دستگاه‌های حرفه‌ای سوئیسی و تجهیزات دم‌آوری
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1: Coffee & Capsules -> Goes to /categories/coffee */}
        <Link
          href="/categories/coffee"
          className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-sand/70 bg-espresso p-7 text-white shadow-md transition duration-500 hover:-translate-y-2 hover:border-caramel hover:shadow-2xl"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase/cioccolatino-hero.png"
              alt="کپسول‌های قهوه بنسو"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/20" />
          </div>

          <div className="relative z-10">
            <span className="mb-3 inline-block rounded-full border border-caramel/40 bg-caramel/20 px-3 py-1 text-xs font-bold text-caramel">
              بیش از ۴۰ تنوع طعمی
            </span>
            <h3 className="text-2xl font-extrabold text-white">کپسول و قهوه</h3>
            <p className="mt-2 text-xs leading-relaxed text-sand/90">
              کپسول‌های لاین اوریجینال، ورتو و ترکیبات اختصاصی بار پاییزه با روست تازه.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                ▲ کپسول اوریجینال
              </span>
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                ● کپسول ورتو
              </span>
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                بسته‌های اقتصادی
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-caramel transition group-hover:gap-3 group-hover:text-white">
              <span>ورود به ویترین کپسول‌ها</span>
              <span>←</span>
            </div>
          </div>
        </Link>

        {/* Card 2: Machines -> Goes to /categories/machines */}
        <Link
          href="/categories/machines"
          className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-sand/70 bg-espresso p-7 text-white shadow-md transition duration-500 hover:-translate-y-2 hover:border-caramel hover:shadow-2xl"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase/p020-01.png"
              alt="دستگاه‌های نسپرسو بنسو"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-bottom transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/20" />
          </div>

          <div className="relative z-10">
            <span className="mb-3 inline-block rounded-full border border-caramel/40 bg-caramel/20 px-3 py-1 text-xs font-bold text-caramel">
              ۱۸ ماه گارانتی معتبر بنسو
            </span>
            <h3 className="text-2xl font-extrabold text-white">دستگاه‌های تخصصی</h3>
            <p className="mt-2 text-xs leading-relaxed text-sand/90">
              از مدل‌های جمع‌وجور خانگی تا پرچمداران تمام‌اتوماتیک کاپوچینو و لاته ساز سوئیسی.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                Lattissima One
              </span>
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                Vertuo Next
              </span>
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                Essenza Mini
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-caramel transition group-hover:gap-3 group-hover:text-white">
              <span>مشاهده و مقایسه دستگاه‌ها</span>
              <span>←</span>
            </div>
          </div>
        </Link>

        {/* Card 3: Accessories */}
        <Link
          href="/products?cat=accessory"
          className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-sand/70 bg-espresso p-7 text-white shadow-md transition duration-500 hover:-translate-y-2 hover:border-caramel hover:shadow-2xl"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase/p042-01.png"
              alt="اکسسوری و لوازم دم‌آوری"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/20" />
          </div>

          <div className="relative z-10">
            <span className="mb-3 inline-block rounded-full border border-caramel/40 bg-caramel/20 px-3 py-1 text-xs font-bold text-caramel">
              تجهیزات بار لوکس
            </span>
            <h3 className="text-2xl font-extrabold text-white">اکسسوری و ماگ</h3>
            <p className="mt-2 text-xs leading-relaxed text-sand/90">
              فوم‌سازهای برقی شیر، استندهای استیل، تراول‌ماگ‌های دوجداره و کیت‌های نظافت.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                فوم‌ساز Aeroccino
              </span>
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                گلاس تست Reveal
              </span>
              <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                استند کپسول
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-caramel transition group-hover:gap-3 group-hover:text-white">
              <span>تکمیل میز قهوه</span>
              <span>←</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
