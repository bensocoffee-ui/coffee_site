"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getProduct, formatToman } from "@/lib/data";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCart();
  const [prefill, setPrefill] = useState<{ fullName: string; address: string; email: string } | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [payMethod, setPayMethod] = useState<"gateway" | "cod" | "card">("gateway");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/customer/me").then((r) => r.json()).then((j) => {
      if (j.ok) {
        setPrefill(j.customer);
        setFullName(j.customer.fullName || "");
        setPhone(j.customer.phone || "");
        setAddress(j.customer.address || "");
        setEmail(j.customer.email || "");
      }
    }).catch(() => {});
  }, []);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-4xl">🛒</p>
        <p className="mt-4 font-bold">سبد خرید خالی است</p>
        <Link href="/products" className="mt-6 inline-block rounded-xl bg-espresso px-6 py-3 font-bold text-white">رفتن به فروشگاه</Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName, phone, address, email: email || undefined, password,
        items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
      }),
    });
    const j = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(j.error || "خطا در ثبت سفارش");
      return;
    }
    // clear cart handled by CartProvider? we clear via localStorage by calling clear from context would be nicer, but total will be 0 after navigation
    // We call clear via a small hack: write empty to storage and redirect
    localStorage.setItem("coffee-boutique-cart", "[]");
    router.push(`/account?new=${j.invoiceNo}`);
  }

  const shipping = total >= 5000000 ? 0 : 450000;
  const grand = total + shipping;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-extrabold">تکمیل خرید</h1>
      <p className="mt-2 text-sm text-taiga">مشخصات گیرنده را وارد کنید. با شماره تلفن برایت حساب ساخته می‌شود تا سفارش‌ها و فاکتورها را ببینی.</p>

      {prefill && (
        <div className="mt-4 rounded-xl bg-latte p-4 text-sm">
          وارد شده به عنوان {prefill.fullName} — سفارش جدید به همین حساب اضافه می‌شود.
        </div>
      )}

      <form onSubmit={submit} className="mt-8 space-y-4 rounded-2xl border border-latte bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-bold">نام و نام خانوادگی *</span>
            <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel" placeholder="مثال: حمیدرضا فاضل" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold">شماره تلفن *</span>
            <input required dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel" placeholder="09..." />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-xs font-bold">آدرس کامل *</span>
          <textarea required rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full resize-none rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel" placeholder="مشهد، بلوار سجاد..." />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold">ایمیل (اختیاری)</span>
          <input dir="ltr" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel" placeholder="h.r.fazel@hotmail.com" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold">رمز عبور برای حساب کاربری *</span>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel" placeholder="حداقل ۶ کاراکتر" />
          <span className="mt-1 block text-[11px] text-taiga">با همین شماره و رمز بعدا وارد حساب می‌شوی</span>
        </label>

        <div className="space-y-3 pt-2">
          <span className="block text-xs font-bold text-espresso">شیوه پرداخت *</span>
          <div className="grid gap-3 sm:grid-cols-3">
            <label
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition ${
                payMethod === "gateway"
                  ? "border-caramel bg-latte/40 shadow-sm"
                  : "border-latte bg-white hover:border-sand"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payMethod"
                  value="gateway"
                  checked={payMethod === "gateway"}
                  onChange={() => setPayMethod("gateway")}
                  className="text-caramel"
                />
                <span className="text-xs font-extrabold text-espresso">درگاه پرداخت شتابی</span>
              </div>
              <span className="mt-2 text-[11px] text-taiga">زرین‌پال / زیبال با کلیه کارت‌های بانکی</span>
            </label>

            <label
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition ${
                payMethod === "cod"
                  ? "border-caramel bg-latte/40 shadow-sm"
                  : "border-latte bg-white hover:border-sand"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payMethod"
                  value="cod"
                  checked={payMethod === "cod"}
                  onChange={() => setPayMethod("cod")}
                  className="text-caramel"
                />
                <span className="text-xs font-extrabold text-espresso">پرداخت در محل</span>
              </div>
              <span className="mt-2 text-[11px] text-taiga">ویژه شهر مشهد (تحویل با دستگاه کارتخوان)</span>
            </label>

            <label
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition ${
                payMethod === "card"
                  ? "border-caramel bg-latte/40 shadow-sm"
                  : "border-latte bg-white hover:border-sand"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payMethod"
                  value="card"
                  checked={payMethod === "card"}
                  onChange={() => setPayMethod("card")}
                  className="text-caramel"
                />
                <span className="text-xs font-extrabold text-espresso">کارت‌به‌کارت مستقیم</span>
              </div>
              <span className="mt-2 text-[11px] text-taiga">واریز و ارسال فیش در تلگرام/واتساپ</span>
            </label>
          </div>
        </div>

        <div className="rounded-xl bg-cream p-4 text-sm">
          <div className="flex justify-between"><span>جمع کالاها</span><b>{formatToman(total)}</b></div>
          <div className="flex justify-between mt-2"><span>ارسال</span><b>{shipping === 0 ? "رایگان" : formatToman(shipping)}</b></div>
          <div className="mt-2 flex justify-between border-t border-dashed border-sand pt-2 text-base"><b>قابل پرداخت</b><b className="text-caramel-dark">{formatToman(grand)}</b></div>
        </div>

        {error && <p className="text-sm font-bold text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-espresso py-4 font-extrabold text-white transition hover:bg-mocha disabled:opacity-50">
          {loading ? "در حال انتقال به پرداخت..." : payMethod === "gateway" ? "اتصال به درگاه پرداخت شاپرک" : "ثبت سفارش نهایی"}
        </button>
      </form>

      <div className="mt-6 space-y-2 text-xs text-taiga">
        <p>جزئیات محصولات برای تایید:</p>
        <ul className="space-y-1">
          {items.map((it) => {
            const p = getProduct(it.slug);
            if (!p) return null;
            return <li key={it.slug} className="flex justify-between"><span>{p.name} × {it.qty}</span><span>{formatToman(p.price * it.qty)}</span></li>;
          })}
        </ul>
      </div>
    </div>
  );
}
