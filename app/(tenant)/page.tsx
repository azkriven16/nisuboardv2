import Section from "@/components/layouts/section";
import db from "@/lib/db";
import ListingCard from "@/components/common/listing-card";

export default async function TenantPage() {
    const listings = await db.listing.findMany({
        where: {
            approved: true,
        },
    });

    return (
        <Section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </Section>
    );
}
