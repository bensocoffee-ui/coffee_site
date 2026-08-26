import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  hashPassword,
  isAuthed,
  readSite,
  writeSite,
} from "@/lib/adminAuth";

async function guard() {
  const store = await cookies();
  return isAuthed(store.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!(await guard())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const site = readSite();
  delete (site as Record<string, unknown>).passwordHash;
  return NextResponse.json({ ok: true, site });
}

type SiteBody = Record<string, unknown> & { newPassword?: unknown };

export async function PUT(req: Request) {
  if (!(await guard())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as SiteBody | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const site = readSite() as Record<string, unknown>;
  const allowed = [
    "announcement",
    "phoneMobile",
    "phoneSupport",
    "email",
    "whatsapp",
    "telegram",
    "address",
    "workingHours",
  ];
  for (const key of allowed) {
    if (typeof body[key] === "string") site[key] = body[key];
  }
  if (typeof body.newPassword === "string" && body.newPassword.length >= 6) {
    site.passwordHash = hashPassword(body.newPassword);
  }
  writeSite(site);

  // اگر رمز عوض شده، نشست فعلی باید با هش جدید همخوان شود
  const store = await cookies();
  store.set(SESSION_COOKIE, String(site.passwordHash), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    ok: true,
    passwordChanged: Boolean(
      typeof body.newPassword === "string" && body.newPassword.length >= 6,
    ),
  });
}
