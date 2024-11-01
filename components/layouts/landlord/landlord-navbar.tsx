"use client";

import Logo from "../logo";
import ThemeToggle from "../theme-toggle";
import UserButtonComponent from "../user-button";
import { Button } from "@/components/ui/button";
import { IconMenu2, IconUserShield } from "@tabler/icons-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function LandlordNavbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex h-12 items-center justify-between gap-4 bg-background/90 backdrop-blur-sm rounded-full px-6 shadow-lg border min-w-[300px] w-fit">
                <Logo />

                <div className="flex items-center border-l pl-4">
                    <UserButtonComponent />

                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <IconMenu2 className="h-5 w-5" />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted transition-colors border-b">
                                    <Button size="icon" variant="ghost">
                                        <IconUserShield className="h-4 w-4" />
                                    </Button>
                                    Account Type: Landlord
                                </div>
                                <div className="flex items-center px-4 py-3 text-sm hover:bg-muted transition-colors border-b">
                                    <ThemeToggle /> Theme Toggle
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </nav>
    );
}
