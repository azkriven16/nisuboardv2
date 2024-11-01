"use client";

import React, { useState, useEffect } from "react";
import ListingCard from "./listing-card";
import { Listing } from "@prisma/client";
import { Input } from "@/components/ui/input";

export const ListingSearchCardContainer = ({
    listings,
}: {
    listings: Listing[];
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredListings, setFilteredListings] = useState(listings);

    useEffect(() => {
        const filtered = listings.filter(
            (listing) =>
                listing.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                listing.address
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
        setFilteredListings(filtered);
    }, [searchQuery, listings]);

    return (
        <div className="space-y-6">
            <div className="bg-background/90 max-w-[600px] mx-auto backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <Input
                            type="text"
                            placeholder="Search listings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
};
