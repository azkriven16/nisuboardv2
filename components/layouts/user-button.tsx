"use client";

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useClerk,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { IconUser } from "@tabler/icons-react";

export default function UserButtonComponent() {
    const { loaded } = useClerk();

    if (!loaded) {
        return (
            <>
                <div className="h-[32px] w-[32px] rounded-full bg-muted animate-pulse" />
                <div className="h-8 w-16 rounded-md bg-muted animate-pulse" />
            </>
        );
    }

    return (
        <>
            <SignedIn>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "h-[32px] w-[32px]",
                        },
                    }}
                />
            </SignedIn>
            <SignedOut>
                <SignInButton>
                    <Button variant="ghost" size="sm">
                        <IconUser /> Sign in
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    );
}
