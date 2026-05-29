import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { QueryProvider } from "@/components/shared/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zynex Store - متجرك الأول للخدمات الرقمية",
    template: "%s | Zynex Store",
  },
  description: "متجرك الأول للخدمات الرقمية - اشتراكات التطبيقات، الذكاء الاصطناعي، توثيق الحسابات، خدمات تليجرام والسوشيال ميديا",
  keywords: ["Zynex Store", "خدمات رقمية", "اشتراكات", "ذكاء اصطناعي", "توثيق حسابات", "تليجرام", "سوشيال ميديا"],
  authors: [{ name: "Zynex Store" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Zynex Store - متجرك الأول للخدمات الرقمية",
    description: "اشتراكات التطبيقات، الذكاء الاصطناعي، توثيق الحسابات، وأكثر",
    siteName: "Zynex Store",
    type: "website",
    locale: "ar_YE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zynex Store - متجرك الأول للخدمات الرقمية",
    description: "اشتراكات التطبيقات، الذكاء الاصطناعي، توثيق الحسابات، وأكثر",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster
              position="top-center"
              richColors
              closeButton
              dir="rtl"
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
