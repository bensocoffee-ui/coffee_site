import type { Metadata } from "next";
import { ContactCards } from "@/components/LiveSite";

export const metadata: Metadata = { title: "تماس با ما" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-extrabold">تماس با ما</h1>
      <p className="mt-4 leading-8 text-taiga">
        سوالی درباره محصولات، سفارش یا گارانتی دارید؟ تیم پشتیبانی Benso Coffee
        پاسخ‌گوی شماست.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ContactCards />

        <form className="space-y-4 rounded-2xl border border-latte bg-white p-6">
          <h2 className="font-extrabold">فرم پیام مستقیم</h2>
          <input
            required
            placeholder="نام و نام خانوادگی"
            className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel"
          />
          <input
            required
            type="tel"
            placeholder="شماره تماس"
            className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel"
          />
          <textarea
            required
            rows={5}
            placeholder="پیام شما…"
            className="w-full resize-none rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-espresso py-3.5 font-bold text-white transition hover:bg-mocha"
          >
            ارسال پیام
          </button>
          <p className="text-center text-xs text-taiga">
            (فرم دمو است و پیام واقعاً ارسال نمی‌شود)
          </p>
        </form>
      </div>
    </div>
  );
}
