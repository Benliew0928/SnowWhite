import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
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
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
