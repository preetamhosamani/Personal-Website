import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Preetam Hosamani — Frontend Developer",
  description:
    "Crafting immersive digital experiences at the intersection of design and engineering — pixel-perfect interfaces, fluid animations, and systems that feel alive.",
  keywords: [
    "developer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
    "full-stack",
    "frontend",
    "ui/ux",
    "preetam hosamani",
  ],
  openGraph: {
    title: "Preetam Hosamani — Frontend Developer",
    description:
      "Crafting immersive digital experiences at the intersection of design and engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrains.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
