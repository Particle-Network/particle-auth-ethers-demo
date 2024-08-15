"use client";
import { Inter } from "next/font/google";
import "./globals.css";

// Particle imports
import { ParticleAuthkit } from "./components/AuthKit";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleAuthkit>{children}</ParticleAuthkit>
      </body>
    </html>
  );
}
