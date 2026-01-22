import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdwebWrapper from "@/components/ThirdwebWrapper"; // Bu kalsın, hata vermemesi için şart

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
      <body className={inter.className}>
        <ThirdwebWrapper>
          {/* Buradaki <Navbar /> satırını sildik! */}
          
          {/* Sadece children kalsın, böylece senin orijinal sayfan görünür */}
          {children}
          
        </ThirdwebWrapper>
      </body>
    </html>
  );
}