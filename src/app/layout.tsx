import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Outfit - A bold, geometric display font for headings (similar aesthetic to Satoshi)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Plus Jakarta Sans - Clean, modern body text
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// JetBrains Mono - Premium monospace for code
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurora - Modern SaaS Platform",
  description: "The next-generation platform for building exceptional digital experiences",
  openGraph: {
    title: "Aurora - Modern SaaS Platform",
    description: "The next-generation platform for building exceptional digital experiences",
    type: "website",
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
        className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
