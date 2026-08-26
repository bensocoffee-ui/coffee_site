"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function AddToCart({
  slug,
  withQty = false,
  className = "",
}: {
  slug: string;
  withQty?: boolean;
  className?: string;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className={withQty ? "flex flex-wrap items-center gap-3" : ""}>
      {withQty && (
        <div className="flex items-center rounded-xl border border-sand bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 text-lg font-bold text-taiga transition hover:text-caramel"
            aria-label="کاهش تعداد"
          >
            −
          </button>
          <span className="min-w-10 text-center font-bold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="px-4 py-2.5 text-lg font-bold text-taiga transition hover:text-caramel"
            aria-label="افزایش تعداد"
          >
            +
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={handleAdd}
        className={`flex-1 rounded-xl px-6 py-3 font-bold text-white transition active:scale-[.98] ${
          added ? "bg-emerald-600" : "bg-espresso hover:bg-mocha"
        } ${className}`}
      >
        {added ? "✓ به سبد خرید اضافه شد" : "افزودن به سبد خرید"}
      </button>
    </div>
  );
}
