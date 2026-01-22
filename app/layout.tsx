import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdwebWrapper from "@/components/ThirdwebWrapper"; // YENİ: Buradan çekiyoruz

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
        {/* Artık direkt Provider değil, Wrapper kullanıyoruz */}
        <ThirdwebWrapper>
          {children}
        </ThirdwebWrapper>
      </body>
    </html>
  );
}