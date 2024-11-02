"use client";

import ListingCard from "@/components/card/listing-card";
import { Listing } from "@prisma/client";
import AdminCard from "@/components/admin/admin-card";

interface AdminCardContainerProps {
    listings: Listing[];
    deleteListing: (listingId: string) => Promise<{ success: boolean }>;
    toggleApproval: (listingId: string) => Promise<{ success: boolean }>;
}

export function AdminCardContainer({
    listings,
    deleteListing,
    toggleApproval,
}: AdminCardContainerProps) {
    if (listings.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground text-lg">
                    No listings found
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
                <div key={listing.id}>
                    <ListingCard listing={listing} />
                    <AdminCard
                        deleteListing={deleteListing}
                        toggleApproval={toggleApproval}
                        listing={listing}
                    />
                </div>
            ))}
        </div>
    );
}
