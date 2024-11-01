import TenantMap from "@/components/map/tenant-map";
import db from "@/lib/db";

export default async function MapPage() {
    const listings = await db.listing.findMany({
        where: {
            approved: true,
        },
    });
    return <TenantMap listings={listings} />;
}
