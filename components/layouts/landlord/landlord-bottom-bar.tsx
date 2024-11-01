"use client";
import Link from "next/link";
import {
    IconMap,
    IconFolders,
    IconCirclePlus,
    IconStack2,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function LandlordBottomBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-14 items-center justify-center gap-8 bg-background/90 backdrop-blur-sm rounded-full px-12 shadow-lg border min-w-[300px]">
                <Link
                    href="/landlord/map"
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        pathname === "/landlord/map"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <IconMap className="h-6 w-6" />
                    <span className="text-xs font-medium">Map</span>
                </Link>

                <Link
                    href="/landlord"
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        pathname === "/landlord"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <IconStack2 className="h-6 w-6" />
                    <span className="text-xs font-medium">Approved</span>
                </Link>

                <Link
                    href="/landlord/manage"
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        pathname === "/landlord/manage"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <IconFolders className="h-6 w-6" />
                    <span className="text-xs font-medium">Unapproved</span>
                </Link>
                
                <Link
                    href="/landlord/create"
                    className={`flex flex-col items-center gap-1 transition-colors ${
                        pathname === "/landlord/create"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    <IconCirclePlus className="h-6 w-6" />
                    <span className="text-xs font-medium">Create</span>
                </Link>

             
            </div>
        </nav>
    );
}
