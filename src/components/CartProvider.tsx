"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getProduct } from "@/lib/data";

export type CartItem = { slug: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "coffee-boutique-cart";
const EMPTY: CartItem[] = [];

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): CartItem[] {
  if (cache === null) {
    cache = EMPTY;
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: unknown = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            cache = parsed.filter(
              (i): i is CartItem =>
                !!i &&
                typeof i === "object" &&
                typeof (i as CartItem).slug === "string" &&
                !!getProduct((i as CartItem).slug),
            );
          }
        }
      } catch {
        cache = EMPTY;
      }
    }
  }
  return cache;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function commit(next: CartItem[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((slug: string, qty = 1) => {
    const prev = getSnapshot();
    const found = prev.find((i) => i.slug === slug);
    commit(
      found
        ? prev.map((i) =>
            i.slug === slug ? { ...i, qty: Math.min(i.qty + qty, 99) } : i,
          )
        : [...prev, { slug, qty }],
    );
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const prev = getSnapshot();
    commit(
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) =>
            i.slug === slug ? { ...i, qty: Math.min(qty, 99) } : i,
          ),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    commit(getSnapshot().filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => commit([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => {
      const p = getProduct(i.slug);
      return p ? s + p.price * i.qty : s;
    }, 0);
    return { items, count, total, add, setQty, remove, clear };
  }, [items, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
