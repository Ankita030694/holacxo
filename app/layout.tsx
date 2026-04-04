import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.holacxo.com"),
  title: {
    default: "HolaCXO - B2B Pipeline Generation",
    template: "%s | HolaCXO",
  },
  description: "A GTM System Designed to Close Enterprise Deals in 90 Days",
  keywords: ["B2B GTM", "Enterprise Sales", "Pipeline Generation", "Sales Strategy", "HolaCXO"],
  authors: [{ name: "Team HolaCXO" }],
  creator: "AMC Legal Solutions",
  publisher: "HolaCXO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "HolaCXO - B2B Pipeline Generation",
    description: "A GTM System Designed to Close Enterprise Deals in 90 Days",
    url: "https://www.holacxo.com",
    siteName: "HolaCXO",
    images: [
      {
        url: "/og-image.png", // Need to ensure this exists or use a representative image
        width: 1200,
        height: 630,
        alt: "HolaCXO B2B Pipeline Generation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HolaCXO - B2B Pipeline Generation",
    description: "A GTM System Designed to Close Enterprise Deals in 90 Days",
    images: ["/og-image.png"],
    creator: "@holacxo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
