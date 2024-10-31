import { PropsWithChildren } from "react";

export default function Section({ children }: PropsWithChildren) {
    return (
        <section className="min-w-[300px] w-fit mx-auto px-4 py-20 min-h-[calc(100vh-8rem)]">
            {children}
        </section>
    );
}
