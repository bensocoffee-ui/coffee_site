import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CUSTOMER_COOKIE, readOrders } from "@/lib/customerStore";

export async function GET() {
  const store = await cookies();
  const phone = store.get(CUSTOMER_COOKIE)?.value;
  if (!phone) return NextResponse.json({ ok: false }, { status: 401 });
  const orders = readOrders().filter((o) => o.customerPhone === phone);
  // newest first
  orders.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  return NextResponse.json({ ok: true, orders });
}
