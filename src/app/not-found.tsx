import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-7xl">☕</p>
      <h1 className="mt-6 text-3xl font-extrabold">صفحه پیدا نشد!</h1>
      <p className="mt-4 leading-8 text-taiga">
        به نظر می‌رسد این صفحه مثل آخرین قطره قهوه تمام شده است.
        بیایید به فروشگاه برگردیم و فنجان تازه‌ای بریزیم.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-espresso px-8 py-3.5 font-bold text-white transition hover:bg-mocha"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
