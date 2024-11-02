import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { IconMenu2, IconUserQuestion } from "@tabler/icons-react";
import Link from "next/link";
import Logo from "../logo";
import ThemeToggle from "../theme-toggle";
import UserButtonComponent from "../user-button";

export default function TenantNavbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-12 items-center justify-between gap-4 bg-background/90 backdrop-blur-sm rounded-full px-6 shadow-lg border min-w-[300px] w-fit">
                <Logo />

                <div className="flex items-center gap-2 pl-4 border-l">
                    <UserButtonComponent />

                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <IconMenu2 className="h-5 w-5" />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="flex flex-col">
                                <Link
                                    href="/become-landlord"
                                    className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted transition-colors border-b"
                                >
                                    <Button size="icon" variant="ghost">
                                        <IconUserQuestion className="h-4 w-4" />
                                    </Button>
                                    Become a Landlord
                                </Link>
                                <div className="flex items-center px-4 py-3 text-sm hover:bg-muted transition-colors border-b">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </nav>
    );
}
