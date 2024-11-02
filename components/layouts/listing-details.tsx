"use client";

import Image from "next/image";
import {
    IconBed,
    IconBath,
    IconWifi,
    IconDroplet,
    IconPhone,
    IconMapPin,
} from "@tabler/icons-react";
import { Listing } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ListingDetailsProps {
    listing: Listing;
}

export default function ListingDetails({ listing }: ListingDetailsProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleCall = () => {
        window.location.href = `tel:${listing.owner_contact}`;
    };

    const handleDirections = () => {
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${listing.latitude},${listing.longitude}`,
            "_blank"
        );
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {listing.images.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
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
                    className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full h-full max-h-[90vh] max-w-7xl mx-auto px-4">
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
            <div className="space-y-8">
                <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        {listing.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <IconMapPin className="h-5 w-5 flex-shrink-0" />
                        <p className="text-base sm:text-lg break-words">
                            {listing.address}
                        </p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                        ₱{listing.price.toLocaleString()}/month
                    </p>
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-3 bg-background rounded-md p-3 border">
                        <IconBed className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">
                            {listing.bedroom_no} Bedroom
                            {listing.bedroom_no > 1 ? "s" : ""}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 bg-background rounded-md p-3 border">
                        <IconBath className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">
                            {listing.bathroom_no} Bathroom
                            {listing.bathroom_no > 1 ? "s" : ""}
                        </span>
                    </div>
                    {listing.wifi_available && (
                        <div className="flex items-center gap-3 bg-background rounded-md p-3 border">
                            <IconWifi className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">
                                WiFi Available
                            </span>
                        </div>
                    )}
                    {listing.watersupply_available && (
                        <div className="flex items-center gap-3 bg-background rounded-md p-3 border">
                            <IconDroplet className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">
                                Water Supply
                            </span>
                        </div>
                    )}
                </div>

                {/* Owner Information */}
                <div className="border-t pt-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
                        Owner Information
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                                <Image
                                    src={listing.owner_image}
                                    alt={listing.owner_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-base sm:text-lg text-foreground">
                                    {listing.owner_name}
                                </p>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {listing.owner_contact}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                            <Button
                                onClick={handleCall}
                                className="flex items-center justify-center gap-2 px-6"
                            >
                                <IconPhone className="h-5 w-5" />
                                Call Owner
                            </Button>
                            <Button
                                onClick={handleDirections}
                                variant="outline"
                                className="flex items-center justify-center gap-2 px-6"
                            >
                                <IconMapPin className="h-5 w-5" />
                                Get Directions
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
