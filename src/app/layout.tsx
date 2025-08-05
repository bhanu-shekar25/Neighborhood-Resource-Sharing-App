import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neighborhood Resource Sharing App",
  description: "A community platform to share and borrow resources locally.",
  keywords: ["community", "sharing", "Next.js", "React", "Tailwind", "resources"],
  authors: [{ name: "Bhanu Shekar" }],
  openGraph: {
    title: "Neighborhood Resource Sharing App",
    description: "Connect with neighbors to share and borrow resources.",
    url: "https://neighborhood-resource-sharing-app.netlify.app/",
    siteName: "NeighborhoodShare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neighborhood Resource Sharing App",
    description: "Connect with neighbors to share and borrow resources.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
