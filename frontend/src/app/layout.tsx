import type { Metadata } from "next";
import { Inter, Space_Grotesk, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl = "https://www.sasfm.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SASFM | Integrated Facilities Management",
    template: "%s | SASFM",
  },
  description:
    "SASFM delivers data-driven, integrated facilities management for enterprise portfolios — reliable operations, workplace experience, and smart building technology in one accountable partner.",
  keywords: [
    "facilities management",
    "integrated facilities management",
    "IFM",
    "workplace experience",
    "smart building technology",
    "property operations",
  ],
  openGraph: {
    title: "SASFM | Integrated Facilities Management",
    description:
      "Data-driven, integrated facilities management for enterprise portfolios worldwide.",
    url: siteUrl,
    siteName: "SASFM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SASFM | Integrated Facilities Management",
    description:
      "Data-driven, integrated facilities management for enterprise portfolios worldwide.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SASFM",
    url: siteUrl,
    description:
      "SASFM delivers data-driven, integrated facilities management for enterprise portfolios worldwide.",
    sameAs: [],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
