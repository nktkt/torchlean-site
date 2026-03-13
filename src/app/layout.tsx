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
  title: "TorchLean - Formalizing Neural Networks in Lean 4",
  description:
    "A mechanized framework for defining, executing, and formally verifying neural networks. PyTorch-style API, IEEE-754 semantics, IBP, CROWN, and alpha-beta-CROWN verification.",
  openGraph: {
    title: "TorchLean",
    description: "Formalizing Neural Networks in Lean 4",
    url: "https://torchlean.org",
    siteName: "TorchLean",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TorchLean",
    description: "Formalizing Neural Networks in Lean 4",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
