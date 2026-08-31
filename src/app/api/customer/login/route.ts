import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CUSTOMER_COOKIE, findCustomer, hashPassword } from "@/lib/customerStore";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { phone?: string; password?: string } | null;
  const phone = String(body?.phone || "").trim();
  const password = String(body?.password || "");
  const c = findCustomer(phone);
  if (!c || c.passwordHash !== hashPassword(password)) {
    return NextResponse.json({ ok: false, error: "شماره یا رمز اشتباه است" }, { status: 401 });
  }
  const store = await cookies();
  store.set(CUSTOMER_COOKIE, phone, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ ok: true });
}
