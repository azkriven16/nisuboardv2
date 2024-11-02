"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SectionProps extends PropsWithChildren {
    className?: string;
}

export default function Section({ children, className }: SectionProps) {
    const [isPWA, setIsPWA] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        // Check if running as PWA
        const isStandalone = window.matchMedia(
            "(display-mode: standalone)"
        ).matches;
        const isInWebAppiOS = (window.navigator as any).standalone === true;
        setIsPWA(isStandalone || isInWebAppiOS);

        // Show dialog if not PWA
        if (!isStandalone && !isInWebAppiOS) {
            setShowDialog(true);
        }

        // Handle install prompt
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        });
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShowDialog(false);
        }
    };

    return (
        <>
            <section
                className={`min-w-[300px] w-fit mx-auto px-4 py-20 min-h-[calc(100vh-8rem)] ${
                    className || ""
                }`}
            >
                {children}
            </section>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Install Our App</DialogTitle>
                        <DialogDescription>
                            Get a better experience by installing our app on
                            your device.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        {deferredPrompt ? (
                            <Button onClick={handleInstall}>Install Now</Button>
                        ) : (
                            <p className="text-sm text-gray-500">
                                To install, click the browser menu and select
                                &quot;Add to Home Screen&quot; or
                                &quot;Install&quot;
                            </p>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => setShowDialog(false)}
                        >
                            Maybe Later
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
