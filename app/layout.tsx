import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteCart from "@/components/QuoteCart";
import WhatsappButton from "@/components/WhatsappButton";
import { client } from "@/lib/sanity";

async function getConfig() {
  return await client.fetch(`*[_type == "configuracion"][0]`).catch(() => null);
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111111", // brand-black equivalente
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://banqueteriamaps.cl"),
  title: {
    default: "Banquetería MAPS | Coctelería de Lujo y Eventos en Chile",
    template: "%s | Banquetería MAPS"
  },
  description: "Banquetería y coctelería premium. Diseñamos experiencias gastronómicas inolvidables para eventos corporativos, matrimonios, coffee breaks y celebraciones exclusivas.",
  keywords: ["banquetería chile", "coctelería de lujo", "banquetería santiago", "matrimonios chile", "eventos corporativos", "coffee breaks", "tablas premium", "bocados gourmet", "banquetería maps", "catering chile"],
  openGraph: {
    title: "Banquetería MAPS | Coctelería de Lujo y Eventos",
    description: "Diseñamos experiencias gastronómicas inolvidables para eventos corporativos, matrimonios y coffee breaks. Descubre la ruta al sabor.",
    url: "/",
    siteName: "Banquetería MAPS",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo Banquetería MAPS",
      }
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banquetería MAPS | Coctelería de Lujo",
    description: "Experiencias gastronómicas memorables. Banquetería y coctelería premium en Chile.",
    images: ["/logo.png"],
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
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();

  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-brand-cream text-brand-black font-sans min-h-screen flex flex-col">
        <Navbar config={config} />
        <main className="flex-grow pt-0">
          {children}
        </main>
        <QuoteCart />
        <Footer config={config} />
        <WhatsappButton whatsapp={config?.whatsapp} />
      </body>
    </html>
  );
}
