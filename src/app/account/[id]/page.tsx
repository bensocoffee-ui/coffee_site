import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { CUSTOMER_COOKIE, readOrders } from "@/lib/customerStore";
import { formatToman } from "@/lib/data";

export default async function InvoicePage(props: PageProps<"/account/[id]">) {
  const { id } = await props.params;
  const store = await cookies();
  const phone = store.get(CUSTOMER_COOKIE)?.value;
  if (!phone) redirect("/login");

  const order = readOrders().find((o) => o.id === id && o.customerPhone === phone);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/account" className="text-sm font-bold text-caramel-dark">← بازگشت به حساب</Link>
      <div className="mt-6 rounded-2xl border border-latte bg-white p-6">
        <div className="flex flex-wrap justify-between gap-4">
          <h1 className="text-xl font-extrabold">فاکتور</h1>
          <span dir="ltr" className="rounded-lg bg-latte px-3 py-1 font-bold">{order.invoiceNo}</span>
        </div>
        <div className="mt-4 grid gap-2 text-sm">
          <div>نام: {order.customerName}</div>
          <div>تلفن: <span dir="ltr">{order.customerPhone}</span></div>
          <div>آدرس: {order.address}</div>
          {order.email && <div>ایمیل: <span dir="ltr">{order.email}</span></div>}
          <div>تاریخ: {new Date(order.createdAt).toLocaleString("fa-IR")}</div>
          <div>وضعیت: {order.status}</div>
        </div>
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="border-b border-latte text-start text-xs text-taiga">
              <th className="py-2 text-start">محصول</th>
              <th className="py-2">تعداد</th>
              <th className="py-2 text-end">مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.slug} className="border-b border-latte/60">
                <td className="py-3">{it.name}</td>
                <td className="py-3 text-center">{it.qty}</td>
                <td className="py-3 text-end">{formatToman(it.price * it.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span>جمع کالاها</span><b>{formatToman(order.total)}</b></div>
          <div className="flex justify-between"><span>ارسال</span><b>{order.shipping === 0 ? "رایگان" : formatToman(order.shipping)}</b></div>
          <div className="flex justify-between border-t border-dashed border-sand pt-2 text-base"><b>قابل پرداخت</b><b className="text-caramel-dark">{formatToman(order.grandTotal)}</b></div>
        </div>
        <button onClick={() => window.print()} className="mt-6 w-full rounded-xl border border-sand py-3 font-bold print:hidden">چاپ فاکتور</button>
      </div>
    </div>
  );
}
