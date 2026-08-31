"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatToman } from "@/lib/data";
import { Suspense } from "react";

type Order = {
  id: string;
  invoiceNo: string;
  customerName: string;
  address: string;
  items: { slug: string; name: string; price: number; qty: number }[];
  total: number;
  shipping: number;
  grandTotal: number;
  status: string;
  createdAt: string;
};

function AccountInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const [customer, setCustomer] = useState<{ fullName: string; phone: string; email?: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customer/me").then((r) => r.json()).then((j) => {
      if (!j.ok) { router.push("/login"); return; }
      setCustomer(j.customer);
    });
    fetch("/api/customer/orders").then((r) => r.json()).then((j) => {
      if (j.ok) setOrders(j.orders);
      setLoading(false);
    });
  }, [router]);

  async function logout() {
    await fetch("/api/customer/logout", { method: "POST" });
    router.push("/");
  }

  if (loading) return <div className="mx-auto max-w-5xl px-4 py-10">در حال بارگذاری...</div>;
  if (!customer) return null;

  const newInvoice = sp.get("new");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">حساب کاربری</h1>
          <p className="mt-1 text-sm text-taiga">{customer.fullName} — {customer.phone}</p>
        </div>
        <button onClick={logout} className="rounded-xl border border-sand bg-white px-4 py-2 text-sm font-bold">خروج</button>
      </div>

      {newInvoice && (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
          ✓ سفارش شما ثبت شد — شماره فاکتور: <span dir="ltr">{newInvoice}</span>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="font-extrabold">سفارش‌ها و فاکتورها</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-taiga">هنوز سفارشی ثبت نکرده‌اید.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {orders.map((o) => (
                <Link key={o.id} href={`/account/${o.id}`} className="block rounded-2xl border border-latte bg-white p-4 transition hover:border-caramel">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-bold" dir="ltr">{o.invoiceNo}</span>
                    <span className="text-xs text-taiga">{new Date(o.createdAt).toLocaleDateString("fa-IR")}</span>
                  </div>
                  <div className="mt-2 text-xs text-taiga">{o.items.length} قلم — {formatToman(o.grandTotal)}</div>
                  <div className="mt-1 text-xs"><span className="rounded-full bg-latte px-2 py-1">{o.status}</span></div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-latte bg-white p-5">
          <h3 className="font-bold">اطلاعات حساب</h3>
          <div className="mt-3 space-y-2 text-sm">
            <div>نام: {customer.fullName}</div>
            <div>تلفن: <span dir="ltr">{customer.phone}</span></div>
            {customer.email && <div>ایمیل: <span dir="ltr">{customer.email}</span></div>}
          </div>
          <Link href="/products" className="mt-5 block w-full rounded-xl bg-espresso py-3 text-center font-bold text-white">ادامه خرید</Link>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-10">در حال بارگذاری...</div>}>
      <AccountInner />
    </Suspense>
  );
}
