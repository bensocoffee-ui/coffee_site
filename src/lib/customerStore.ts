import crypto from "crypto";
import fs from "fs";
import path from "path";

export const CUSTOMER_COOKIE = "customer_session";
const ADMIN_DIR = path.join(process.cwd(), "admin-data");
const CUSTOMERS_FILE = path.join(ADMIN_DIR, "customers.json");
const ORDERS_FILE = path.join(ADMIN_DIR, "orders.json");

export type Customer = {
  phone: string;
  fullName: string;
  address: string;
  email?: string;
  passwordHash: string;
  createdAt: string;
};

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  invoiceNo: string;
  customerPhone: string;
  customerName: string;
  address: string;
  email?: string;
  items: OrderItem[];
  total: number;
  shipping: number;
  grandTotal: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
};

export function hashPassword(p: string) {
  return crypto.createHash("sha256").update(p, "utf8").digest("hex");
}

export function ensureFiles() {
  if (!fs.existsSync(CUSTOMERS_FILE)) fs.writeFileSync(CUSTOMERS_FILE, "[]", "utf8");
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, "[]", "utf8");
}

export function readCustomers(): Customer[] {
  ensureFiles();
  return JSON.parse(fs.readFileSync(CUSTOMERS_FILE, "utf8")) as Customer[];
}

export function writeCustomers(list: Customer[]) {
  fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(list, null, 2), "utf8");
}

export function readOrders(): Order[] {
  ensureFiles();
  return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8")) as Order[];
}

export function writeOrders(list: Order[]) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2), "utf8");
}

export function findCustomer(phone: string) {
  return readCustomers().find((c) => c.phone === phone);
}

export function makeInvoiceNo() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `INV-${ymd}-${rand}`;
}

export function makeOrderId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
