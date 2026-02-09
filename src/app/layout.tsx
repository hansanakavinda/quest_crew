import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MagneticCursor from "@/components/MagneticCursor";
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
  title: "QuestCrew | Mission-Driven Software Agency",
  description: "Transforming ideas into high-performance software solutions for startups and enterprises across tourism, healthcare, and tech.",
  keywords: ["software agency", "AI integration", "web development", "generative AI", "full-stack development"],
  authors: [{ name: "QuestCrew" }],
  openGraph: {
    title: "QuestCrew | Mission-Driven Software Agency",
    description: "Transforming ideas into high-performance software solutions for startups and enterprises.",
    url: "https://questcrew.dev",
    siteName: "QuestCrew",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuestCrew | Mission-Driven Software Agency",
    description: "Transforming ideas into high-performance software solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MagneticCursor />
        {children}
      </body>
    </html>
  );
}
