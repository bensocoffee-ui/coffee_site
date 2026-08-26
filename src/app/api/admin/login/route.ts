import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  hashPassword,
  readSite,
} from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { password?: string };
    const site = readSite();
    if (!body.password || hashPassword(body.password) !== site.passwordHash) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const store = await cookies();
    store.set(SESSION_COOKIE, site.passwordHash, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
