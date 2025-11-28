import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Dashboard",
  description: "A modern dashboard with AI chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50/50 min-h-screen`}>
        <Sidebar />
        <div className="flex flex-col min-h-screen ml-0 md:ml-64 transition-all duration-300">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
