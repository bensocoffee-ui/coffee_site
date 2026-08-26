import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  isAuthed,
  readProducts,
  writeProducts,
} from "@/lib/adminAuth";

async function guard() {
  const store = await cookies();
  return isAuthed(store.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  if (!(await guard())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, products: readProducts() });
}

type RawItem = {
  slug?: unknown;
  [k: string]: unknown;
};

export async function PUT(req: Request) {
  if (!(await guard())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as { products?: RawItem[] } | null;
  const items = body?.products;
  if (!Array.isArray(items)) {
    return NextResponse.json({ ok: false, error: "products array required" }, { status: 400 });
  }

  // minimal validation: unique non-empty slugs
  const seen = new Set<string>();
  for (const it of items) {
    const slug = typeof it.slug === "string" ? it.slug.trim() : "";
    if (!slug) {
      return NextResponse.json({ ok: false, error: "هر محصول باید اسلاگ داشته باشد" }, { status: 400 });
    }
    if (seen.has(slug)) {
      return NextResponse.json(
        { ok: false, error: `اسلاگ تکراری: ${slug}` },
        { status: 400 },
      );
    }
    seen.add(slug);
  }

  writeProducts(items);
  return NextResponse.json({ ok: true, count: items.length });
}
