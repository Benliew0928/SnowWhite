import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/ChatWidget";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";

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
        <AuthProvider>
          <AuthGuard>
            <div className="flex min-h-screen">
              {/* Sidebar is hidden on login page via CSS or conditional rendering if needed, 
                  but AuthGuard handles redirection so it's fine to keep structure */}
              <Sidebar />
              <div className="flex flex-col min-h-screen ml-0 md:ml-64 transition-all duration-300 w-full">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
              </div>
              <ChatWidget />
            </div>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
