"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, inputCls, type SiteData } from "./admin-ui";

const FIELDS: { key: string; label: string; ltr?: boolean }[] = [
  { key: "announcement", label: "متن نوار اطلاعیه بالای سایت" },
  { key: "phoneMobile", label: "شماره موبایل", ltr: true },
  { key: "phoneSupport", label: "تلفن پشتیبانی", ltr: true },
  { key: "email", label: "ایمیل", ltr: true },
  { key: "whatsapp", label: "واتس‌اپ", ltr: true },
  { key: "telegram", label: "تلگرام", ltr: true },
  { key: "address", label: "نشانی فروشگاه" },
  { key: "workingHours", label: "ساعات کاری" },
];

export default function SiteSettingsTab({ site }: { site: SiteData }) {
  const router = useRouter();
  const [data, setData] = useState<SiteData>(site);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key: string, value: string) {
    setData((s) => ({ ...s, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const payload: Record<string, unknown> = { ...data };
    if (newPassword.trim()) payload.newPassword = newPassword.trim();
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await res.json().catch(() => ({}));
    setSaving(false);
    setMessage(
      res.ok
        ? j.passwordChanged
          ? "✓ ذخیره شد و رمز عبور تغییر کرد"
          : "✓ ذخیره شد"
        : `✗ خطا: ${res.status}`,
    );
    setNewPassword("");
    router.refresh();
  }

  return (
    <div className="space-y-5 rounded-2xl border border-latte bg-white p-6">
      <h2 className="font-extrabold">ویرایش بخش‌های سایت</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="نوار اطلاعیه (بالای همه صفحات)">
            <input
              className={inputCls}
              value={String(data.announcement ?? "")}
              onChange={(e) => update("announcement", e.target.value)}
            />
          </Field>
        </div>
        {FIELDS.filter((f) => f.key !== "announcement").map((f) => (
          <Field key={f.key} label={f.label}>
            <input
              dir={f.ltr ? "ltr" : undefined}
              className={inputCls}
              value={String(data[f.key] ?? "")}
              onChange={(e) => update(f.key, e.target.value)}
            />
          </Field>
        ))}
      </div>

      <hr className="border-latte" />

      <Field label="تغییر رمز عبور مدیریتی (حداقل ۶ کاراکتر — خالی = بدون تغییر)">
        <input
          type="password"
          className={inputCls}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-espresso px-8 py-3 font-bold text-white transition hover:bg-mocha disabled:opacity-50"
        >
          {saving ? "در حال ذخیره…" : "ذخیره تنظیمات"}
        </button>
        {message && <span className="text-sm font-bold">{message}</span>}
      </div>

      <p className="rounded-xl bg-cream p-4 text-xs leading-6 text-taiga">
        💡 پس از ذخیره، برای اعمال روی نسخه آنلاین، فایل
        <code className="mx-1 rounded bg-white px-1.5 py-0.5 font-bold">publish-site.bat</code>
        را اجرا کن تا سایت بیلد و به گیت‌هاب/Vercel منتشر شود.
      </p>
    </div>
  );
}
