import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John Kendric | Premium Portfolio — Developer, Creator & Innovator",
  description:
    "Full-stack developer and creative technologist crafting premium digital experiences. Expertise in React, Next.js, TypeScript, AI/ML, and cloud architecture.",
  keywords: [
    "developer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
    "full-stack",
    "frontend",
    "ui/ux",
    "john kendric",
  ],
  openGraph: {
    title: "John Kendric | Premium Portfolio",
    description:
      "Full-stack developer and creative technologist crafting premium digital experiences.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
