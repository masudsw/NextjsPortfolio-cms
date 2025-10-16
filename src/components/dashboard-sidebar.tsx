// components/dashboard-sidebar.tsx
"use client"
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, FolderOpen, PlusCircle, Pencil, LogOut } from "lucide-react";
import { useRouter } from "next/navigation"; // Import the router for redirection
import { toast } from "sonner";

// --- 1. Define the Nav Items (unchanged) ---
// Define the type for a Nav Item for type safety
type NavItem = {
    title: string;
    href?: string;
    icon: React.ElementType;
    isHeading?: boolean;
};

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        isHeading: false,
    },
    {
        title: "Blog Posts",
        isHeading: true,
        icon: FileText
    },
    {
        title: "Create New Post",
        href: "/dashboard/blog/create",
        icon: PlusCircle,
    },
    {
        title: "Manage Posts (Edit/Delete)",
        href: "/dashboard/blog/manage",
        icon: Pencil,
    },
    {
        title: "Projects",
        isHeading: true,
        icon: FolderOpen
    },
    {
        title: "Create New Project",
        href: "/dashboard/projects/create",
        icon: PlusCircle,
    },
    {
        title: "Manage Projects (Edit/Delete)",
        href: "/dashboard/projects/manage",
        icon: Pencil,
    },
];
// ---------------------------------------------


export function DashboardSidebar() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // --- 2. Logout Handler Function ---
    const handleLogout = async () => {
        if (!apiUrl) {
            console.error("NEXT_PUBLIC_BASE_URL is not set.");
            return;
        }

        try {
            // Call the backend endpoint dedicated to clearing the cookie
            const response = await fetch(`${apiUrl}/auth/logout`, {
                method: 'POST',
                // This ensures the browser sends the necessary cookie with the request
                credentials: 'include', 
            });

            if (response.ok) {
                // If the server successfully clears the cookie, redirect the user
                toast.success("Logout successful");
                router.push('/'); 
            } else {
                // Handle cases where the server fails to process logout (e.g., 500 error)
                console.error("Server failed to log out:", response.status);
            }
        } catch (error) {
            // Handle network errors (e.g., server is down)
            console.error("Failed to fetch logout endpoint:", error);
        }
    };
    // ------------------------------------


    return (
        <div className="flex flex-col h-full border-r bg-gray-50/50 dark:bg-neutral-900/50">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Admin Panel</h1>
            </div>
            
            <ScrollArea className="flex-grow h-full p-2">
                <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => {
                        const IconComponent = item.icon;

                        // Renders Headings
                        if (item.isHeading && !item.href) {
                            return (
                                <div key={item.title} className="flex items-center gap-2 px-2 py-3 mt-4 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
                                    <IconComponent className="w-4 h-4" />
                                    {item.title}
                                </div>
                            );
                        }

                        // Renders Nav Links (must have href)
                        if (item.href) {
                            return (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant="ghost"
                                    className="justify-start w-full gap-3 font-normal"
                                >
                                    <Link href={item.href}>
                                        <IconComponent className="w-5 h-5" />
                                        {item.title}
                                    </Link>
                                </Button>
                            );
                        }
                        
                        return null;
                    })}
                </nav>

                {/* --- 3. The Logout Button --- */}
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-neutral-700">
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="justify-start w-full gap-3 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </Button>
                </div>
                {/* ----------------------------- */}

            </ScrollArea>
        </div>
    );
}