import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Admin",
  /* Internal tool — keep it out of search results entirely. This is a
     convenience, not a security control; access is enforced by Supabase. */
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bg">{children}</div>;
}
