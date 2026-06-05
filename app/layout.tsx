import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RICH MONEY | P2P Cross-Border Escrow",
  description: "P2P cross-border escrow built for Nigeria, Ghana, and Cameroon. Move CFA, Cedis, and Naira securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased text-[#1A1A1A]`}>
      <body className="min-h-screen flex flex-col font-sans relative">
        {/* GLOBAL FIXED BACKGROUND VIDEO */}
        <div className="fixed inset-0 w-full h-full -z-50 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/rich-background234.mp4" type="video/mp4" />
          </video>
          {/* Subtle dark overlay to ensure white/light elements pop without making it milky */}
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
        
        {children}
      </body>
    </html>
  );
}