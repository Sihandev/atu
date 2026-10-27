import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./editorial.css";
import "./brand.css";
import "./experience.css";
import { brand, coverage } from "@/config/data";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alyssalogistik.co.id"),
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: `${brand.tagline} — pengiriman kendaraan dan alat berat antar kota dan antar pulau, menjangkau ${coverage.provinces}+ provinsi dan ${coverage.cities}+ kota di Indonesia.`,
  keywords: ["kirim mobil", "kirim motor", "towing mobil", "car carrier", "jasa pengiriman kendaraan", "ekspedisi mobil"],
  authors: [{ name: brand.name }],
  creator: brand.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://alyssalogistik.co.id",
    title: `${brand.name} | ${brand.tagline}`,
    description: `${brand.tagline} — pengiriman kendaraan dan alat berat antar kota dan antar pulau, menjangkau ${coverage.provinces}+ provinsi dan ${coverage.cities}+ kota di Indonesia.`,
    siteName: brand.name,
    images: [{ url: "/og.png", width: 1536, height: 910, alt: `${brand.name} - Vehicle Logistics Across Indonesia` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | ${brand.tagline}`,
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
    legalName: brand.legalName,
    description: brand.tagline,
    url: `https://${brand.domain}`,
    logo: `https://${brand.domain}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Enim Raya 2 No. 86",
      addressLocality: "Jakarta Utara",
      addressRegion: "DKI Jakarta",
      postalCode: "14330",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.phone,
      contactType: "customer service",
      availableLanguage: "Indonesian",
      /* Only advertise an email once the business actually publishes one. */
      ...(brand.email ? { email: brand.email } : {}),
    },
  };

  /* Runs before first paint so a dark-mode visitor never sees a white flash.
     Stored choice wins; otherwise follow the OS. Wrapped in try/catch because
     localStorage throws in some privacy modes. */
  const themeBoot = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`;

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`scroll-smooth ${hanken.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
