import Section from "@/components/layouts/section";
import ListingDetails from "@/components/layouts/listing-details";
import db from "@/lib/db";

interface ListingPageProps {
    params: {
        id: string;
    };
}

export default async function ListingPage({ params }: ListingPageProps) {
    const { id } = params;

    const listing = await db.listing.findUnique({
        where: {
            id: id,
        },
    });

    if (!listing) {
        return (
            <Section>
                <div>Listing not found</div>
            </Section>
        );
    }

    return (
        <Section>
            <ListingDetails listing={listing} />
        </Section>
    );
}
