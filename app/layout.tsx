import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThirdwebWrapper from "@/components/ThirdwebWrapper";
import { Navbar } from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebWrapper>
  <Navbar /> {/* Navbar burada olmalı */}
  <main className="pt-20">
    {children}
  </main>
</ThirdwebWrapper>
      </body>
    </html>
  );
}