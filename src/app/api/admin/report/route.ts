import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, isAuthed } from "@/lib/adminAuth";
import { readCustomers, readOrders } from "@/lib/customerStore";
import * as XLSX from "xlsx";

export async function GET() {
  const store = await cookies();
  if (!(await isAuthed(store.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const customers = readCustomers() as Array<{
    phone: string; fullName: string; address: string; email?: string; createdAt: string;
  }>;
  const orders = readOrders() as Array<{
    id: string; invoiceNo: string; customerPhone: string; customerName: string; address: string; email?: string;
    items: Array<{ name: string; price: number; qty: number }>;
    total: number; shipping: number; grandTotal: number; status: string; createdAt: string;
  }>;

  const wb = XLSX.utils.book_new();

  // Sheet1: customers
  const custRows = [
    ["تلفن", "نام", "آدرس", "ایمیل", "تاریخ ثبت"],
    ...customers.map((c) => [c.phone, c.fullName, c.address, c.email || "", c.createdAt?.slice(0, 10) || ""]),
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(custRows);
  ws1["!cols"] = [{ wch: 14 }, { wch: 22 }, { wch: 40 }, { wch: 24 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, ws1, "مشتریان");

  // Sheet2: orders summary
  const orderRows = [
    ["شماره فاکتور", "تاریخ", "مشتری", "تلفن", "آدرس", "ایمیل", "اقلام", "جمع کالا", "ارسال", "قابل پرداخت", "وضعیت"],
    ...orders.map((o) => [
      o.invoiceNo, o.createdAt?.slice(0, 10) || "", o.customerName, o.customerPhone, o.address, o.email || "",
      o.items.map((it) => `${it.name} ×${it.qty}`).join(" | "),
      o.total, o.shipping, o.grandTotal, o.status,
    ]),
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(orderRows);
  ws2["!cols"] = [{ wch: 18 }, { wch: 12 }, { wch: 18 }, { wch: 14 }, { wch: 32 }, { wch: 20 }, { wch: 50 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, ws2, "سفارش‌ها");

  // save copy on disk for history
  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "admin-data", `report-${new Date().toISOString().slice(0, 10)}.xlsx`);
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as unknown as Uint8Array;
  try { fs.writeFileSync(outPath, buf as unknown as Uint8Array); } catch {}

  return new NextResponse(buf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="benso-report-${new Date().toISOString().slice(0, 10)}.xlsx"`,
    },
  });
}
