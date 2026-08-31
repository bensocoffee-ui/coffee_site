import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CUSTOMER_COOKIE } from "@/lib/customerStore";

export async function POST() {
  const store = await cookies();
  store.delete(CUSTOMER_COOKIE);
  return NextResponse.json({ ok: true });
}
