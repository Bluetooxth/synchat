import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const primary = Fira_Code({
  weight: ["400", "500"],
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SynChat",
  description: "A simple chat application built with Next.js and Ably.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={primary.className}>{children}</body>
    </html>
  );
}
