import { Metadata } from "next";
import { brand } from "@/config/data";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
}

export function generateSEO({
  title,
  description,
  url,
  image = "/og-image.jpg",
  type = "website",
}: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: brand.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate JSON-LD for BreadcrumbList
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

// Generate JSON-LD for Service
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  serviceType: string = "Vehicle Shipping"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceType,
    "provider": {
      "@type": "Organization",
      "name": brand.name,
    },
    "url": url,
    "name": name,
    "description": description,
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    }
  };
}

// Generate JSON-LD for Article
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  imageUrl: string = "https://kirimkendaraan.co.id/og-image.jpg"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": [imageUrl],
    "datePublished": datePublished,
    "author": {
      "@type": "Organization",
      "name": brand.name,
      "url": "https://kirimkendaraan.co.id"
    },
    "publisher": {
      "@type": "Organization",
      "name": brand.name,
      "logo": {
        "@type": "ImageObject",
        "url": "https://kirimkendaraan.co.id/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}

// Generate JSON-LD for FAQ
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}