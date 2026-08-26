import { NextResponse } from "next/server";
import { readSite } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** داده عمومی سایت بدون اطلاعات حساس — برای نمایش زنده در صفحات */
export async function GET() {
  try {
    const site = readSite() as Record<string, unknown>;
    delete site.passwordHash;
    return NextResponse.json({ ok: true, site });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
