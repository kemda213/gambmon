import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdwebWrapper from "@/components/ThirdwebWrapper";
import { Navbar } from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gambmon | Web3 Betting",
  description: "Decentralized betting on Polygon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Bütün siteyi Thirdweb özelliklerine eriştiren sarmalayıcı */}
        <ThirdwebWrapper>
          
          {/* Yeni oluşturduğun modern Navbar bileşeni */}
          <Navbar />
          
          {/* Sayfa içeriği (children). 
              pt-20 (Padding Top) ekledik ki içerik fixed Navbar'ın altında kalmasın.
          */}
          <main className="pt-20 min-h-screen">
            {children}
          </main>
          
        </ThirdwebWrapper>
      </body>
    </html>
  );
}