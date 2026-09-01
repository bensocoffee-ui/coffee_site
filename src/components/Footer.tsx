import Link from "next/link";
import { categoryGroups } from "@/lib/data";
import { FooterContactInfo } from "@/components/LiveSite";

export default function Footer() {
  return (
    <footer className="mt-20 bg-espresso text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-caramel text-xl">
              ☕
            </span>
            <span className="text-lg font-extrabold">Benso Coffee</span>
          </div>
          <p className="text-sm leading-7 text-cream/70">
            Benso Coffee فروشگاه تخصصی قهوه کپسولی است؛ از دستگاه‌های قهوه‌ساز
            کپسولی و کپسول‌های اصل تا اکسسوری‌های حرفه‌ای قهوه، همه چیز برای یک
            فنجان عالی در خانه و محل کار شما.
          </p>
        </div>

        <nav>
          <h3 className="mb-4 font-bold text-caramel">دسته‌بندی‌ها</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            {categoryGroups.map((g) =>
              g.items.slice(0, 2).map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?cat=${c.slug}`} className="transition hover:text-white">
                    {c.title}
                  </Link>
                </li>
              )),
            )}
          </ul>
        </nav>

        <nav>
          <h3 className="mb-4 font-bold text-caramel">خدمات مشتریان</h3>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li>۷ روز ضمانت بازگشت کالا</li>
            <li>گارانتی معتبر دستگاه‌ها</li>
            <li>پرداخت در محل تهران</li>
            <li>ارسال سریع به سراسر ایران</li>
            <li><Link href="/contact" className="transition hover:text-white">مشاوره خرید</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-bold text-caramel">ارتباط با ما</h3>
          <FooterContactInfo />
          <div className="mt-5">
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=7559116&Code=xB6VMOuKz9pvkloY2J87TQplz5gULMGG"
            >
              {/* @ts-ignore - Enamad requires custom 'code' attribute */}
              <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=7559116&Code=xB6VMOuKz9pvkloY2J87TQplz5gULMGG"
                alt="نماد اعتماد الکترونیکی"
                style={{ cursor: "pointer" }}
                code="xB6VMOuKz9pvkloY2J87TQplz5gULMGG"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/50">
        © ۱۴۰۵ Benso Coffee — تمامی حقوق محفوظ است. این وب‌سایت یک نمونه دمو است.
        <span className="mt-1 block">
          Photos: Openverse — Creative Commons licenses (see /images/CREDITS.txt)
        </span>
        <Link href="/admin" className="mt-1 inline-block transition hover:text-cream">
          مدیریت سایت
        </Link>
      </div>
    </footer>
  );
}
