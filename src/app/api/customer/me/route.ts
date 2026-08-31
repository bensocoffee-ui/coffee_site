import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CUSTOMER_COOKIE, findCustomer } from "@/lib/customerStore";

export async function GET() {
  const store = await cookies();
  const phone = store.get(CUSTOMER_COOKIE)?.value;
  if (!phone) return NextResponse.json({ ok: false }, { status: 401 });
  const c = findCustomer(phone);
  if (!c) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({
    ok: true,
    customer: { phone: c.phone, fullName: c.fullName, address: c.address, email: c.email },
  });
}
