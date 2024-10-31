import { IconSearch } from "@tabler/icons-react";
import Logo from "../logo";
import ThemeToggle from "../theme-toggle";
import UserButtonComponent from "../user-button";
import Link from "next/link";

export default function AdminNavbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-12 items-center justify-between gap-4 bg-background/90 backdrop-blur-sm rounded-full px-6 shadow-lg border min-w-[300px] w-fit">
                <Logo />

                <div className="flex items-center gap-2 pl-4 border-l">
                    <Link
                        href="/find-user"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <IconSearch className="h-5 w-5" />
                    </Link>
                    <ThemeToggle />
                    <UserButtonComponent />
                </div>
            </div>
        </nav>
    );
}
