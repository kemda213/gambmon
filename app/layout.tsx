import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react"; // <-- EKLENDİ

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gambmon | Predict the Future",
  description: "Next Gen Prediction Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-white min-h-screen antialiased selection:bg-neon-blue selection:text-black`}>
        {/* BURASI SARMALANDI */}
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}