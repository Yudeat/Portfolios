import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ActiveSectionProvider } from "@/components/providers/ActiveSectionProvider";
import { NavMenuProvider } from "@/components/providers/NavMenuProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { InteractiveCursor } from "@/components/ui/InteractiveCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif-hero",
  display: "swap",
  preload: false,
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
      <body
        className={`${inter.variable} ${playfair.variable} min-w-0 overflow-x-clip bg-[#050505] font-sans text-white antialiased`}
      >
        <SmoothScrollProvider>
          <ActiveSectionProvider>
            <NavMenuProvider>{children}</NavMenuProvider>
          </ActiveSectionProvider>
        </SmoothScrollProvider>
        <InteractiveCursor />
      </body>
    </html>
  );
}
