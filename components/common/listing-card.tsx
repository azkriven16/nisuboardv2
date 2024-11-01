import Image from "next/image";
import Link from "next/link";
import { Listing } from "@prisma/client";

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    return (
        <Link href={`/listing/${listing.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 w-full">
                    <Image
                        src={listing.images[0] || "/placeholder.jpg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {listing.title}
                    </h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        ₱{listing.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {listing.address}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                            {listing.bedroom_no}{" "}
                            {listing.bedroom_no === 1 ? "Bedroom" : "Bedrooms"}
                        </div>
                        <div>
                            {listing.bathroom_no}{" "}
                            {listing.bathroom_no === 1
                                ? "Bathroom"
                                : "Bathrooms"}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
