"use client";

import Link from "next/link";
import { LayoutDashboard, MessageSquare, Zap, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "AI Chat", href: "/chat" },
  { icon: Zap, label: "Predict", href: "https://jimatwatt-ai.onrender.com/" },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">D</span>
          </div>
          DashUI
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors group"
          >
            <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-red-500 rounded-lg hover:bg-red-50 cursor-pointer w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
