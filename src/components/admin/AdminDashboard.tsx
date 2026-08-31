"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteSettingsTab from "./SiteSettingsTab";
import {
  Field,
  inputCls,
  ADMIN_CATEGORIES,
  type RawItem,
  type SiteData,
} from "./admin-ui";

export default function AdminDashboard({
  initialProducts,
  initialSite,
}: {
  initialProducts: RawItem[];
  initialSite: SiteData;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"products" | "site" | "report">("products");

  const [items, setItems] = useState<RawItem[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q),
    );
  }, [items, query]);

  const selected = items.find((p) => p.slug === selectedSlug) ?? null;

  function updateSelected(field: string, value: unknown) {
    setItems((prev) =>
      prev.map((p) =>
        p.slug === selectedSlug ? { ...p, [field]: value } : p,
      ),
    );
  }

  async function saveAll() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: items }),
    });
    const j = await res.json().catch(() => ({}));
    setSaving(false);
    setMessage(
      res.ok
        ? `✓ ذخیره شد (${j.count} محصول)`
        : `✗ خطا: ${j.error || res.status}`,
    );
    router.refresh();
  }

  function addNew() {
    const base = prompt("اسلاگ محصول جدید (انگلیسی، مثل my-new-capsule):");
    if (!base || !/^[a-z0-9-]+$/.test(base)) return;
    if (items.some((p) => p.slug === base)) {
      alert("این اسلاگ قبلاً استفاده شده!");
      return;
    }
    setItems((prev) => [
      {
        slug: base,
        name: "محصول جدید",
        brand: "Nespresso",
        category: "capsule-original",
        price: 100000,
        rating: 4.5,
        reviews: 10,
        desc: "",
        features: [],
        art: { type: "capsule", from: "#2b1d13", to: "#8a6a4f" },
      },
      ...prev,
    ]);
    setSelectedSlug(base);
    setTab("products");
  }

  function deleteSelected() {
    if (!selected) return;
    if (!confirm(`حذف «${selected.name ?? selected.slug}»؟`)) return;
    setItems((prev) => prev.filter((p) => p.slug !== selected.slug));
    setSelectedSlug(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const featuresText = Array.isArray(selected?.features)
    ? (selected!.features as string[]).join("\n")
    : "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold">پنل مدیریت Benso Coffee</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="rounded-xl border border-sand bg-white px-4 py-2.5 text-sm font-bold transition hover:border-caramel"
          >
            👁 سایت
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl bg-espresso px-4 py-2.5 text-sm font-bold text-white transition hover:bg-mocha"
          >
            خروج
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {(
          [
            ["products", `📦 محصولات (${items.length})`],
            ["site", "⚙️ بخش‌های سایت"],
            ["report", "📊 گزارش مشتریان"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key as typeof tab)}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              tab === key
                ? "bg-caramel text-white shadow"
                : "border border-sand bg-white hover:border-caramel"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "report" ? (
        <div className="rounded-2xl border border-latte bg-white p-6">
          <h2 className="font-extrabold">گزارش مشتریان و خریدها</h2>
          <p className="mt-2 text-sm leading-7 text-taiga">
            فایل اکسل شامل دو شیت «مشتریان» و «سفارش‌ها» است. هر بار دانلود، یک کپی هم در <code className="rounded bg-cream px-1">admin-data/report-YYYY-MM-DD.xlsx</code> ذخیره می‌شود تا برای ربات تلگرام آینده قابل استفاده باشد.
          </p>
          <a
            href="/api/admin/report"
            className="mt-5 inline-block rounded-xl bg-espresso px-6 py-3 font-bold text-white transition hover:bg-mocha"
          >
            ⬇ دانلود گزارش اکسل
          </a>
        </div>
      ) : tab === "site" ? (
        <SiteSettingsTab site={initialSite} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* فهرست */}
          <div className="space-y-3 self-start rounded-2xl border border-latte bg-white p-4 lg:sticky lg:top-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو…"
              className={inputCls}
            />
            <div className="max-h-[55vh] space-y-1 overflow-y-auto pe-1">
              {filtered.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`block w-full rounded-lg px-3 py-2 text-start text-sm transition ${
                    selectedSlug === p.slug
                      ? "bg-espresso text-white"
                      : "hover:bg-cream"
                  }`}
                >
                  <span className="line-clamp-1 block font-bold">
                    {p.name || p.slug}
                    {p.hidden && (
                      <span className="ms-2 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                        ناموجود
                      </span>
                    )}
                  </span>
                  <span
                    className={`block text-[11px] ${
                      selectedSlug === p.slug ? "text-white/70" : "text-taiga"
                    }`}
                  >
                    {p.slug}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={addNew}
              className="w-full rounded-lg border border-dashed border-caramel py-2.5 text-sm font-bold text-caramel-dark transition hover:bg-cream"
            >
              + افزودن محصول جدید
            </button>
          </div>

          {/* ادیتور */}
          <div className="space-y-4 rounded-2xl border border-latte bg-white p-6">
            {!selected ? (
              <p className="py-20 text-center text-taiga">
                یک محصول از فهرست انتخاب کن یا محصول جدید بساز.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-extrabold">
                    {selected.name || selected.slug}
                    {selected.hidden && (
                      <span className="ms-2 rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-700">
                        ناموجود — از سایت مخفی است
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateSelected("hidden", !selected.hidden)
                      }
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        selected.hidden
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "border border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
                      }`}
                    >
                      {selected.hidden
                        ? "✓ موجود شد — نمایش بده"
                        : "🚫 ناموجود کن (مخفی)"}
                    </button>
                    <button
                      type="button"
                      onClick={deleteSelected}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
                    >
                      🗑 حذف
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="نام نمایشی">
                    <input
                      className={inputCls}
                      value={String(selected.name ?? "")}
                      onChange={(e) => updateSelected("name", e.target.value)}
                    />
                  </Field>
                  <Field label="برند">
                    <input
                      className={inputCls}
                      value={String(selected.brand ?? "")}
                      onChange={(e) => updateSelected("brand", e.target.value)}
                    />
                  </Field>
                  <Field label="دسته‌بندی">
                    <select
                      className={inputCls}
                      value={String(selected.category ?? "")}
                      onChange={(e) =>
                        updateSelected("category", e.target.value)
                      }
                    >
                      {ADMIN_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="قیمت (تومان)">
                    <input
                      type="number"
                      dir="ltr"
                      className={inputCls}
                      value={String(selected.price ?? "")}
                      onChange={(e) =>
                        updateSelected("price", Number(e.target.value))
                      }
                    />
                  </Field>
                  <Field label="شدت طعم (۰-۱۳، خالی مجاز)">
                    <input
                      type="number"
                      min={0}
                      max={13}
                      dir="ltr"
                      className={inputCls}
                      value={
                        selected.intensity == null
                          ? ""
                          : String(selected.intensity)
                      }
                      onChange={(e) =>
                        updateSelected(
                          "intensity",
                          e.target.value === "" ? null : Number(e.target.value),
                        )
                      }
                    />
                  </Field>
                  <Field label="برچسب (اختیاری)">
                    <input
                      className={inputCls}
                      placeholder="مثلاً: پرفروش"
                      value={String(selected.badge ?? "")}
                      onChange={(e) =>
                        updateSelected(
                          "badge",
                          e.target.value === "" ? null : e.target.value,
                        )
                      }
                    />
                  </Field>
                </div>

                <Field label="توضیحات">
                  <textarea
                    rows={4}
                    className={inputCls + " resize-none leading-7"}
                    value={String(selected.desc ?? "")}
                    onChange={(e) => updateSelected("desc", e.target.value)}
                  />
                </Field>

                <Field label="ویژگی‌ها (هر خط یکی)">
                  <textarea
                    rows={4}
                    className={inputCls + " resize-none leading-7"}
                    value={featuresText}
                    onChange={(e) =>
                      updateSelected(
                        "features",
                        e.target.value.split("\n").filter((l) => l.trim()),
                      )
                    }
                  />
                </Field>

                <Field label="مسیر عکس (مثال: /images/products/nespresso/main_7928.40.jpg)">
                  <input
                    dir="ltr"
                    className={inputCls}
                    value={String(selected.img ?? "")}
                    onChange={(e) =>
                      updateSelected(
                        "img",
                        e.target.value === "" ? null : e.target.value,
                      )
                    }
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-3 border-t border-latte pt-4">
                  <button
                    type="button"
                    onClick={saveAll}
                    disabled={saving}
                    className="rounded-xl bg-espresso px-8 py-3 font-bold text-white transition hover:bg-mocha disabled:opacity-50"
                  >
                    {saving ? "در حال ذخیره…" : "💾 ذخیره همه تغییرات"}
                  </button>
                  {message && (
                    <span className="text-sm font-bold">{message}</span>
                  )}
                </div>

                <p className="rounded-xl bg-cream p-3 text-[11px] leading-5 text-taiga">
                  برای اعمال روی نسخه آنلاین پس از ذخیره، فایل
                  <code className="mx-1 rounded bg-white px-1 py-0.5">publish-site.bat</code>
                  را اجرا کن.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
