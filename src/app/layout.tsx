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
  title: "Health Monitor AI - Enterprise Banking Dashboard",
  description: "AI-powered IT health monitoring platform delivering $16.7M annual savings through predictive intelligence, real-time monitoring, and automated incident response for enterprise banking operations.",
  keywords: [
    "AI health monitoring",
    "banking operations",
    "incident prediction", 
    "enterprise dashboard",
    "cost savings",
    "ROI calculator",
    "system monitoring",
    "predictive analytics"
  ],
  authors: [{ name: "Rahuul Pande" }],
  creator: "Rahuul Pande",
  publisher: "Cognizant",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Health Monitor AI",
    title: "Health Monitor AI - $16.7M Annual Savings Platform",
    description: "Transform reactive IT operations into predictive intelligence. 97.2% system health, 50+ incidents prevented daily, 4,500+ banks can benefit.",
    url: "https://ai-ml-dashboard-fxpbgv2dg-rahuul-pandes-projects.vercel.app",
    images: [
      {
        url: "https://ai-ml-dashboard-fxpbgv2dg-rahuul-pandes-projects.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Health Monitor AI Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Monitor AI - Enterprise Banking Platform",
    description: "AI-powered monitoring delivering $16.7M annual savings. 150+ services, 97.2% health score.",
    images: ["https://ai-ml-dashboard-fxpbgv2dg-rahuul-pandes-projects.vercel.app/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
