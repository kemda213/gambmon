import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react"; // <--- İŞTE BU EKSİKTİ

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
        {/* Tüm siteyi ThirdwebProvider içine alıyoruz */}
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}