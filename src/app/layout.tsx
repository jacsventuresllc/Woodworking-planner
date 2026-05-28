import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "WoodCraft AI - AI-Powered Woodworking Project Planner",
  description: "Transform your woodworking ideas into actionable BOMs, cut lists, and assembly instructions with AI",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} min-h-full flex flex-col bg-background font-sans`}>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-primary-dark text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg">WoodCraft AI</span>
                </div>
                <p className="text-sm text-white/70">
                  © 2026 WoodCraft AI. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}