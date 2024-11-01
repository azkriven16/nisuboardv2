"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

export const SearchUsers = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="w-full">
            <form
                className="flex gap-2 items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const queryTerm = formData.get("search") as string;
                    router.push(pathname + "?search=" + queryTerm);
                }}
            >
                <div className="flex-1">
                    <div className="relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            id="search"
                            name="search"
                            type="text"
                            className="w-full rounded-md border bg-background px-10 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Search by name or email..."
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Search
                </button>
            </form>
        </div>
    );
};
