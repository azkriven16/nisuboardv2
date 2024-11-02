import db from "@/lib/db";
import ListingStatsChart from "./listing-stats-chart";

interface ListingStats {
    approved: number;
    pending: number;
}

export default async function ListingStats() {
    let stats: ListingStats = {
        approved: 0,
        pending: 0,
    };

    try {
        const listings = await db.listing.findMany();

        stats = {
            approved: listings.filter((listing) => listing.approved).length,
            pending: listings.filter((listing) => !listing.approved).length,
        };
    } catch (error) {
        console.error("Error fetching listing stats:", error);
    }

    return <ListingStatsChart data={stats} />;
}
