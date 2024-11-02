"use client";

import {
    IconDashboard,
    IconUserCheck,
    IconUserX,
    IconUserSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminBottomBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-14 items-center justify-center gap-8 bg-background/90 backdrop-blur-sm rounded-full px-12 shadow-lg border min-w-[300px]">
                <Link
                    href="/admin"
                    className={cn(
                        "flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors",
                        pathname === "/admin" && "text-primary"
                    )}
                >
                    <IconDashboard className="h-6 w-6" />
                    <span className="text-xs font-medium">Dashboard</span>
                </Link>

                <Link
                    href="/admin/approved"
                    className={cn(
                        "flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors",
                        pathname === "/admin/approved" && "text-primary"
                    )}
                >
                    <IconUserCheck className="h-6 w-6" />
                    <span className="text-xs font-medium">Approved</span>
                </Link>

                <Link
                    href="/admin/unapproved"
                    className={cn(
                        "flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors",
                        pathname === "/admin/unapprove" && "text-primary"
                    )}
                >
                    <IconUserX className="h-6 w-6" />
                    <span className="text-xs font-medium">Pending</span>
                </Link>

                <Link
                    href="/admin/find-user"
                    className={cn(
                        "flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors",
                        pathname === "/admin/find-user" && "text-primary"
                    )}
                >
                    <IconUserSearch className="h-6 w-6" />
                    <span className="text-xs font-medium">Find User</span>
                </Link>
            </div>
        </nav>
    );
}
