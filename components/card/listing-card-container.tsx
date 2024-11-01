"use client";

import React, { useState, useEffect } from "react";
import ListingCard from "./listing-card";
import { Listing } from "@prisma/client";
import { Slider } from "@/components/ui/slider";

export const ListingCardContainer = ({ listings }: { listings: Listing[] }) => {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [filteredListings, setFilteredListings] = useState(listings);

    useEffect(() => {
        const filtered = listings.filter(
            (listing) =>
                listing.price >= priceRange[0] && listing.price <= priceRange[1]
        );
        setFilteredListings(filtered);
    }, [priceRange, listings]);

    const handlePriceRangeChange = (value: number[]) => {
        setPriceRange([value[0], value[1]]);
    };

    return (
        <div className="space-y-6">
            <div className="bg-background/90 max-w-[300px] mx-auto backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="flex flex-col gap-2 items-center">
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="w-48">
                        <Slider
                            defaultValue={[0, 10000]}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onValueChange={handlePriceRangeChange}
                        />
                    </div>
                    <div className="text-sm text-muted-foreground">
                        ₱{priceRange[0]} - ₱{priceRange[1]}
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
