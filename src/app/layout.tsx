import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Monitor AI - Enterprise Dashboard",
  description: "AI-powered system health monitoring and incident prediction dashboard. Real-time monitoring, predictive analytics, and $16.7M annual savings for enterprise banking.",
  keywords: [
    "AI monitoring",
    "health dashboard", 
    "enterprise banking",
    "predictive analytics",
    "incident management",
    "ROI calculator",
    "real-time monitoring"
  ],
  authors: [{ name: "Rahuul Pande", url: "https://github.com/RahuulPande" }],
  creator: "Rahuul Pande",
  publisher: "AI Health Monitor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Health Monitor AI - Enterprise Dashboard",
    description: "AI-powered system health monitoring with $16.7M annual savings",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: "Health Monitor AI",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Health Monitor AI Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Health Monitor AI - Enterprise Dashboard",
    description: "AI-powered system health monitoring with $16.7M annual savings",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
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
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
