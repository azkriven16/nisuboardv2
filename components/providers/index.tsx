"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import RQProvider from "./react-query-provider";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <RQProvider>{children}</RQProvider>
        </ThemeProvider>
    );
}
