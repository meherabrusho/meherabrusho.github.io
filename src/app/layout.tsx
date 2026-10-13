import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import SiteBackground from "@/components/SiteBackground";
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
    default: "Mohtasin Meherab Sikder — AI Engineer | Agentic AI & Architecture",
    template: "%s | Meherab Rusho",
  },
  description:
    "AI Engineer architecting autonomous AI systems using multi-agent orchestration, LLM-driven automation, and scalable architectures. Portfolio and blog by Mohtasin Meherab Sikder.",
  openGraph: {
    title: "Mohtasin Meherab Sikder — AI Engineer | Agentic AI & Architecture",
    description:
      "AI Engineer specializing in Agentic AI, Machine Learning, and scalable architectures. Portfolio and blog.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohtasin Meherab Sikder — AI Engineer | Agentic AI & Architecture",
    description:
      "AI Engineer specializing in Agentic AI, Machine Learning, and scalable architectures. Portfolio and blog.",
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
          <SiteBackground />
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
