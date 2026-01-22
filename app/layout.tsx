import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdwebWrapper from "@/components/ThirdwebWrapper";
import { Navbar } from "@/components/shared/Navbar"; // <--- Yeni dosyanı buraya ekledik!

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
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <ThirdwebWrapper>
          {/* Navbar'ı en tepeye koyuyoruz */}
          <Navbar /> 
          
          {/* Sayfa içeriği Navbar'ın altında kalsın diye biraz boşluk (pt-20) bırakıyoruz */}
          <main className="pt-20">
            {children}
          </main>
        </ThirdwebWrapper>
      </body>
    </html>
  );
}