'use client'; // Add this to make RootLayout a client component

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "./shared/layout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invisio Dashboard",
  description: "PBR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login"); // Redirect to login page if no token
    }
  }, [router]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}