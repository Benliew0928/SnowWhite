"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export function Navbar() {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 ml-0 md:ml-64">
            <div className="flex items-center gap-4 w-full max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-9 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                    <Bell className="h-5 w-5" />
                </Button>
                <Link href="/profile" className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{user?.displayName || "Guest User"}</p>
                        <p className="text-xs text-gray-500">{user?.isAnonymous ? "Guest" : "Member"}</p>
                    </div>
                    <Avatar>
                        <AvatarImage src={user?.photoURL || ""} />
                        <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    );
}
