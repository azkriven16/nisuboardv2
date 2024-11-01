"use client";

import Link from "next/link";
import { IconMap, IconStack2, IconSearch } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function TenantBottomBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-14 items-center justify-center gap-12 bg-background/90 backdrop-blur-sm rounded-full px-12 shadow-lg border min-w-[300px]">
                <Link
                    href="/map"
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        pathname === "/map"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <IconMap className="h-6 w-6" />
                    <span className="text-xs font-medium">Map</span>
                </Link>

                <Link
                    href="/"
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        pathname === "/"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <IconStack2 className="h-6 w-6" />
                    <span className="text-xs font-medium">List</span>
                </Link>

                <Link
                    href="/search"
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        pathname === "/search"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <IconSearch className="h-6 w-6 p-0.5" />
                    <span className="text-xs font-medium">Search</span>
                </Link>
            </div>
        </nav>
    );
}
