import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteCart from "@/components/QuoteCart";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-brand-cream text-brand-black font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-0">
          {children}
        </main>
        <QuoteCart />
        <Footer />
      </body>
    </html>
  );
}
