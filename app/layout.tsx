import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { InteractiveCursor } from "@/components/ui/InteractiveCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Predeep - Creative Developer Portfolio",
  description: "Scroll-driven portfolio crafted with Next.js, GSAP, and Lenis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-[#050505] font-sans text-white antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <InteractiveCursor />
      </body>
    </html>
  );
}
