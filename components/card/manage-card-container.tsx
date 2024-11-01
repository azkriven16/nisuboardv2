"use client";

import ListingCard from "@/components/card/listing-card";
import { Listing } from "@prisma/client";
import LandlordEditCard from "@/components/card/edit-card";

interface ManageCardContainerProps {
    listings: Listing[];
    deleteListing: (listingId: string) => Promise<{ success: boolean }>;
}

export function ManageCardContainer({
    listings,
    deleteListing,
}: ManageCardContainerProps) {
    // Filter to only show unapproved listings
    const unapprovedListings = listings.filter((listing) => !listing.approved);

    if (unapprovedListings.length === 0) {
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
            {unapprovedListings.map((listing) => (
                <div key={listing.id}>
                    <ListingCard listing={listing} />
                    <LandlordEditCard
                        deleteListing={deleteListing}
                        listing={listing}
                    />
                </div>
            ))}
        </div>
    );
}
