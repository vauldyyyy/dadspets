import { Fraunces, Inter, Great_Vibes } from "next/font/google";
import StickyActions from "../components/StickyActions";
import { BUSINESS } from "../lib/business";
import "./globals.css";
import "./sections.css";
import "./ambience.css";
import "./dads-pets.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });

const siteUrl = BUSINESS.websiteUrl || "http://localhost:3000";
const description = "Visit Dad's Pets in Shirvodem, Margao (Madgaon), Goa for pets, aquarium supplies, pet food and accessories. Browse the shop and enquire on WhatsApp.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Dad's Pets | Pet Shop & Aquarium Supplies in Margao, Goa", template: "%s | Dad's Pets" },
  description,
  keywords: ["Dad's Pets", "pet shop Margao", "pet shop Madgaon", "pet shop Shirvodem", "aquarium supplies Goa", "pet supplies Goa"],
  alternates: BUSINESS.websiteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    siteName: BUSINESS.name,
    title: "Dad's Pets | Pet Shop & Aquarium Supplies in Margao, Goa",
    description,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/assets/golden-retriever.jpg", width: 1200, height: 630, alt: "Golden Retriever" }],
  },
  twitter: { card: "summary_large_image", title: "Dad's Pets", description, images: ["/assets/golden-retriever.jpg"] },
  robots: { index: BUSINESS.searchIndexingEnabled, follow: true },
};

const jsonLd = BUSINESS.searchIndexingEnabled && BUSINESS.websiteUrl ? {
  "@context": "https://schema.org",
  "@type": "PetStore",
  name: BUSINESS.name,
  url: BUSINESS.websiteUrl,
  description,
  ...(BUSINESS.phoneE164 ? { telephone: BUSINESS.phoneE164 } : {}),
  ...(BUSINESS.address ? { address: { "@type": "PostalAddress", streetAddress: "Sanscar Society, Shirvodem", addressLocality: "Margao", addressRegion: "Goa", postalCode: "403601", addressCountry: "IN" } } : {}),
  sameAs: [BUSINESS.instagram, BUSINESS.facebook].filter(Boolean),
} : null;

export const viewport = { themeColor: "#050505" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${script.variable}`}>
      <body>
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        {children}
        <div className="grain" aria-hidden="true" />
        <StickyActions />
      </body>
    </html>
  );
}
