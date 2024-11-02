import { ListingCardContainer } from "@/components/card/listing-card-container";
import Section from "@/components/layouts/section";
import db from "@/lib/db";

export default async function TenantPage() {
    const listings = await db.listing.findMany({
        where: {
            approved: true,
        },
    });

    return (
        <Section>
            <ListingCardContainer listings={listings} />
        </Section>
    );
}
