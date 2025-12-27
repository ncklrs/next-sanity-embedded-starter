import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Bebas Neue - Bold condensed display font for street art/graffiti aesthetic
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  weight: ["400"],
});

// Space Grotesk - Modern geometric sans for body text
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// JetBrains Mono - Premium monospace for code
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumi Spray - Paint With Light",
  description: "Revolutionary digital graffiti installation. Wave LED lights to create stunning real-time artwork. For events, museums, and brand activations.",
  keywords: ["digital graffiti", "light painting", "interactive art", "event technology", "brand activation", "museum installation"],
  openGraph: {
    title: "Lumi Spray - Paint With Light",
    description: "Revolutionary digital graffiti installation. Wave LED lights to create stunning real-time artwork.",
    type: "website",
    siteName: "Lumi Spray",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumi Spray - Paint With Light",
    description: "Revolutionary digital graffiti installation. Wave LED lights to create stunning real-time artwork.",
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
        className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
