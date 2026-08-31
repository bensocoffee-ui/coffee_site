import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CUSTOMER_COOKIE,
  findCustomer,
  hashPassword,
  makeInvoiceNo,
  makeOrderId,
  readCustomers,
  readOrders,
  writeCustomers,
  writeOrders,
} from "@/lib/customerStore";
import { products } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      fullName?: string;
      phone?: string;
      address?: string;
      email?: string;
      password?: string;
      items?: { slug: string; qty: number }[];
    };

    const fullName = String(body.fullName || "").trim();
    const phone = String(body.phone || "").trim();
    const address = String(body.address || "").trim();
    const email = String(body.email || "").trim() || undefined;
    const password = String(body.password || "");
    const itemsIn = Array.isArray(body.items) ? body.items : [];

    if (!fullName || fullName.length < 3)
      return NextResponse.json({ ok: false, error: "نام و نام خانوادگی لازم است" }, { status: 400 });
    if (!/^09\d{9}$/.test(phone))
      return NextResponse.json({ ok: false, error: "شماره تلفن معتبر نیست (09...)" }, { status: 400 });
    if (!address || address.length < 8)
      return NextResponse.json({ ok: false, error: "آدرس کامل وارد کنید" }, { status: 400 });
    if (!password || password.length < 6)
      return NextResponse.json({ ok: false, error: "رمز عبور حداقل ۶ کاراکتر" }, { status: 400 });
    if (itemsIn.length === 0)
      return NextResponse.json({ ok: false, error: "سبد خرید خالی است" }, { status: 400 });

    // build order items with server-calculated prices
    const orderItems = [];
    let total = 0;
    for (const it of itemsIn) {
      const p = products.find((x) => x.slug === it.slug);
      if (!p) continue;
      const qty = Math.max(1, Math.min(99, Math.floor(Number(it.qty) || 1)));
      orderItems.push({ slug: p.slug, name: p.name, price: p.price, qty });
      total += p.price * qty;
    }
    if (orderItems.length === 0)
      return NextResponse.json({ ok: false, error: "محصولی یافت نشد" }, { status: 400 });

    const shipping = total >= 5000000 ? 0 : 450000;
    const grandTotal = total + shipping;

    // customer upsert
    let customer = findCustomer(phone);
    if (customer) {
      if (customer.passwordHash !== hashPassword(password)) {
        return NextResponse.json({ ok: false, error: "این شماره قبلا ثبت شده؛ رمز اشتباه است" }, { status: 401 });
      }
      // update info if changed
      let changed = false;
      if (customer.fullName !== fullName) { customer.fullName = fullName; changed = true; }
      if (customer.address !== address) { customer.address = address; changed = true; }
      if (email !== undefined && customer.email !== email) { customer.email = email; changed = true; }
      if (changed) {
        const list = readCustomers().map((c) => (c.phone === phone ? customer! : c));
        writeCustomers(list);
      }
    } else {
      customer = {
        phone,
        fullName,
        address,
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
      };
      const list = readCustomers();
      list.push(customer);
      writeCustomers(list);
    }

    const order = {
      id: makeOrderId(),
      invoiceNo: makeInvoiceNo(),
      customerPhone: phone,
      customerName: fullName,
      address,
      email,
      items: orderItems,
      total,
      shipping,
      grandTotal,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };
    const orders = readOrders();
    orders.push(order);
    writeOrders(orders);

    const store = await cookies();
    store.set(CUSTOMER_COOKIE, phone, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ ok: true, orderId: order.id, invoiceNo: order.invoiceNo });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "خطای سرور" }, { status: 500 });
  }
}
