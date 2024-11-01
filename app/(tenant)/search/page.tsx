import Section from "@/components/layouts/section";
import db from "@/lib/db";
import { ListingSearchCardContainer } from "@/components/card/listing-search-card-container";

export default async function SearchPage() {
    const listings = await db.listing.findMany({
        where: {
            approved: true,
        },
    });

    return (
        <Section>
            <ListingSearchCardContainer listings={listings} />
        </Section>
    );
}
