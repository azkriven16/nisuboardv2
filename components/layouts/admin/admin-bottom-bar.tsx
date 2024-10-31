import {
    IconDashboard,
    IconUserCheck,
    IconUserX
} from "@tabler/icons-react";
import Link from "next/link";

export default function AdminBottomBar() {
    return (
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-14 items-center justify-center gap-8 bg-background/90 backdrop-blur-sm rounded-full px-12 shadow-lg border min-w-[300px]">
                <Link
                    href="/admin"
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <IconDashboard className="h-6 w-6" />
                    <span className="text-xs font-medium">Dashboard</span>
                </Link>

                <Link
                    href="/admin/approve"
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <IconUserCheck className="h-6 w-6" />
                    <span className="text-xs font-medium">Approve</span>
                </Link>

                <Link
                    href="/admin/unapprove"
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <IconUserX className="h-6 w-6" />
                    <span className="text-xs font-medium">Unapprove</span>
                </Link>
            </div>
        </nav>
    );
}
