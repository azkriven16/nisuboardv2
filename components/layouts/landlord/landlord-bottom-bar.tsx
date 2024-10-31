import Link from "next/link";
import {
    IconMap,
    IconFolders,
    IconCirclePlus,
    IconStack2,
} from "@tabler/icons-react";

export default function LandlordBottomBar() {
    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-14 items-center justify-center gap-8 bg-background/90 backdrop-blur-sm rounded-full px-12 shadow-lg border min-w-[300px]">
                <Link
                    href="/landlord"
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <IconMap className="h-6 w-6" />
                    <span className="text-xs font-medium">Map</span>
                </Link>

                <Link
                    href="/landlord/listing"
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <IconStack2 className="h-6 w-6" />
                    <span className="text-xs font-medium">Listing</span>
                </Link>

                <Link
                    href="/landlord/create"
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <IconCirclePlus className="h-6 w-6" />
                    <span className="text-xs font-medium">Create</span>
                </Link>

                <Link
                    href="/landlord/manage"
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <IconFolders className="h-6 w-6" />
                    <span className="text-xs font-medium">Manage</span>
                </Link>
            </div>
        </nav>
    );
}
