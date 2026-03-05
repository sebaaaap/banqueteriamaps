import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Banquetería MAPS - Tu ruta al sabor",
  description: "Banquetería y Coctelería de lujo en Chile. Eventos, Matrimonios, Coffee Breaks.",
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
