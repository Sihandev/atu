import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lacak Pengiriman",
  robots: { index: false, follow: false },
};

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
