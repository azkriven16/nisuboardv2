import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
    className?: string;
}

export default function Section({ children, className }: SectionProps) {
    return (
        <section
            className={`min-w-[300px] w-fit mx-auto px-4 py-20 min-h-[calc(100vh-8rem)] ${
                className || ""
            }`}
        >
            {children}
        </section>
    );
}
