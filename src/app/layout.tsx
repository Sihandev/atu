import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import { brand, coverage } from "@/config/data";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
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
    url: `https://${brand.domain}`,
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
    logo: `https://${brand.domain}/img/kirim-mobilku-logo.jpeg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Sungai Bambu No. 20, RT 004/RW 006, Kelurahan Sungai Bambu, Kecamatan Tanjung Priok",
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
      className="scroll-smooth"
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
