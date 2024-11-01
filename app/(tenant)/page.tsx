import Section from "@/components/layouts/section";
import db from "@/lib/db";
import ListingCard from "@/components/card/listing-card";
import { ListingCardContainer } from "@/components/card/listing-card-container";

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
