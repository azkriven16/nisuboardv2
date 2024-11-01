import TenantMap from "@/components/map/tenant-map";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandlordMapPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const listings = await db.listing.findMany({
        where: {
            approved: true,
            userId: userId,
        },
    });

    return <TenantMap listings={listings} />;
}
