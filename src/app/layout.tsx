import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import React from "react";
import { Toaster } from "@/components/ui/sonner"
import { warning } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Profile App",
  description: "Golam Mustafa Profile-blogs, projects",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal:React.ReactNode
 
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="bg-amber-700">
          <Navbar />
        </div>
        {modal}
        {children}
        <Toaster position="top-right" 
        // richColors
        // toastOptions={{
        //   classNames:{
        //     warning:'text-black'
        //   }
        // }}
        />
      </body>
    </html>
  );
}
