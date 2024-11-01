"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export default function SubmitButton({
    children,
    className,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className={cn(className)}
            {...props}
        >
            {pending && <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
}
