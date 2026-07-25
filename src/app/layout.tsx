import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Meherab Rusho — Software Engineer & AI Enthusiast",
    template: "%s | Meherab Rusho",
  },
  description:
    "Portfolio and blog by Meherab Rusho — software engineer building high-performance systems and exploring the frontiers of artificial intelligence.",
  openGraph: {
    title: "Meherab Rusho — Software Engineer & AI Enthusiast",
    description:
      "Portfolio and blog showcasing software engineering projects and AI explorations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meherab Rusho — Software Engineer & AI Enthusiast",
    description:
      "Portfolio and blog showcasing software engineering projects and AI explorations.",
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
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 font-sans">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>
          <Navbar />
          <main
            id="main"
            className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
