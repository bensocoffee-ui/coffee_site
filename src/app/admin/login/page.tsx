"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("رمز عبور اشتباه است");
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4">
      <div className="rounded-3xl border border-latte bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-espresso text-2xl">
            🔐
          </span>
          <h1 className="text-xl font-extrabold">ورود به پنل مدیریت</h1>
          <p className="mt-2 text-xs text-taiga">Benso Coffee</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور مدیریتی"
            className="w-full rounded-xl border border-latte px-4 py-3 text-center outline-none focus:border-caramel"
          />
          {error && (
            <p className="text-center text-sm font-bold text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-espresso py-3 font-bold text-white transition hover:bg-mocha disabled:opacity-50"
          >
            {loading ? "در حال بررسی…" : "ورود"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 block text-center text-xs text-taiga hover:text-caramel-dark"
        >
          ← بازگشت به سایت
        </Link>
      </div>
    </div>
  );
}
