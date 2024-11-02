"use client";

import Image from "next/image";
import { IconBed, IconBath, IconWifi, IconDroplet } from "@tabler/icons-react";
import { Listing } from "@prisma/client";
import { useState } from "react";

interface ListingDetailsProps {
    listing: Listing;
}

export default function ListingDetails({ listing }: ListingDetailsProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="space-y-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
                {listing.images.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image
                            src={image}
                            alt={`${listing.title} image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Fullscreen Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4">
                        <Image
                            src={selectedImage}
                            alt="Fullscreen view"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}

            {/* Listing Details */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                <p className="text-xl text-muted-foreground">
                    {listing.address}
                </p>
                <p className="text-2xl font-semibold">
                    ₱{listing.price.toLocaleString()}/month
                </p>

                {/* Amenities */}
                <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <IconBed className="h-5 w-5" />
                        <span>
                            {listing.bedroom_no} Bedroom
                            {listing.bedroom_no > 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconBath className="h-5 w-5" />
                        <span>
                            {listing.bathroom_no} Bathroom
                            {listing.bathroom_no > 1 ? "s" : ""}
                        </span>
                    </div>
                    {listing.wifi_available && (
                        <div className="flex items-center gap-2">
                            <IconWifi className="h-5 w-5" />
                            <span>WiFi Available</span>
                        </div>
                    )}
                    {listing.watersupply_available && (
                        <div className="flex items-center gap-2">
                            <IconDroplet className="h-5 w-5" />
                            <span>Water Supply Available</span>
                        </div>
                    )}
                </div>

                {/* Owner Information */}
                <div className="border-t pt-4 mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Owner Information
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                            <Image
                                src={listing.owner_image}
                                alt={listing.owner_name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-medium">{listing.owner_name}</p>
                            <p className="text-muted-foreground">
                                {listing.owner_contact}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
