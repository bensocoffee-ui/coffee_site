import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, isAuthed, readProducts, readSite } from "@/lib/adminAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { RawItem, SiteData } from "@/components/admin/admin-ui";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const store = await cookies();
  if (!(await isAuthed(store.get(SESSION_COOKIE)?.value))) {
    redirect("/admin/login");
  }

  const products = readProducts() as unknown as RawItem[];
  const site = readSite() as unknown as SiteData;
  delete site.passwordHash;

  return (
    <AdminDashboard
      initialProducts={products}
      initialSite={site}
    />
  );
}
