import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/config/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://kirimkendaraan.co.id"),
  title: {
    default: `${brand.name} | Jasa Pengiriman Kendaraan Terpercaya`,
    template: `%s | ${brand.name}`,
  },
  description: "Layanan pengiriman mobil dan motor antar kota dan antar pulau di seluruh Indonesia. Proses transparan, aman, dan dapat diandalkan.",
  keywords: ["kirim mobil", "kirim motor", "towing mobil", "car carrier", "jasa pengiriman kendaraan", "ekspedisi mobil"],
  authors: [{ name: brand.name }],
  creator: brand.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kirimkendaraan.co.id", // Placeholder URL
    title: `${brand.name} | Jasa Pengiriman Kendaraan Terpercaya`,
    description: "Layanan pengiriman mobil dan motor antar kota dan antar pulau di seluruh Indonesia. Proses transparan, aman, dan dapat diandalkan.",
    siteName: brand.name,
    images: [{ url: "/og.png", width: 1536, height: 910, alt: `${brand.name} - Vehicle Logistics Across Indonesia` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Jasa Pengiriman Kendaraan Terpercaya`,
    description: "Layanan pengiriman mobil dan motor antar kota dan antar pulau di seluruh Indonesia.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: "https://kirimkendaraan.co.id",
    logo: "https://kirimkendaraan.co.id/logo.png", // Placeholder
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.phone,
      contactType: "customer service",
      email: brand.email,
      availableLanguage: "Indonesian",
    },
  };

  return (
    <html lang="id" className="scroll-smooth">
      <body className="font-sans antialiased selection:bg-blue-200 selection:text-blue-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
