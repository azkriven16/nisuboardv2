"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import RQProvider from "./react-query-provider";
import { Toaster } from "../ui/sonner";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Toaster position="top-center" richColors />
            <RQProvider>{children}</RQProvider>
        </ThemeProvider>
    );
}
