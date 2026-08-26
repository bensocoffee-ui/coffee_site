import crypto from "crypto";
import fs from "fs";
import path from "path";

export const SESSION_COOKIE = "admin_session";

const ADMIN_DIR = path.join(process.cwd(), "admin-data");

export function getAdminDataPath(file: string) {
  return path.join(ADMIN_DIR, file);
}

export function readSite() {
  return JSON.parse(
    fs.readFileSync(getAdminDataPath("site.json"), "utf8"),
  ) as {
    passwordHash: string;
    [k: string]: unknown;
  };
}

export function writeSite(site: unknown) {
  fs.writeFileSync(
    getAdminDataPath("site.json"),
    JSON.stringify(site, null, 2),
    "utf8",
  );
}

export function readProducts(): unknown[] {
  return JSON.parse(
    fs.readFileSync(getAdminDataPath("products.json"), "utf8"),
  ) as unknown[];
}

export function writeProducts(items: unknown[]) {
  fs.writeFileSync(
    getAdminDataPath("products.json"),
    JSON.stringify(items, null, 2),
    "utf8",
  );
}

export function hashPassword(p: string) {
  return crypto.createHash("sha256").update(p, "utf8").digest("hex");
}

/** بررسی کوکی نشست در مقابل هش رمز فعلی */
export async function isAuthed(cookieValue?: string) {
  if (!cookieValue) return false;
  try {
    const site = readSite();
    return cookieValue === site.passwordHash;
  } catch {
    return false;
  }
}
