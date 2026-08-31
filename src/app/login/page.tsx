"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });
    const j = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(j.error || "خطا");
      return;
    }
    router.push("/account");
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-3xl border border-latte bg-white p-8 shadow-lg">
        <h1 className="text-center text-xl font-extrabold">ورود به حساب کاربری</h1>
        <p className="mt-2 text-center text-xs text-taiga">با شماره تلفن و رمز عبوری که هنگام خرید ساختی وارد شو</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input dir="ltr" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09..." className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="رمز عبور" className="w-full rounded-xl border border-latte px-4 py-3 text-sm outline-none focus:border-caramel" />
          {error && <p className="text-center text-sm font-bold text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-espresso py-3 font-bold text-white disabled:opacity-50">{loading ? "..." : "ورود"}</button>
        </form>
        <p className="mt-4 text-center text-xs text-taiga">حساب نداری؟ <Link href="/checkout" className="font-bold text-caramel-dark">یک خرید انجام بده تا ساخته شود</Link></p>
      </div>
    </div>
  );
}
