import { ManageCardContainer } from "@/components/card/manage-card-container";
import Section from "@/components/layouts/section";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandlordManagePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }
    const listings = await db.listing.findMany({
        where: {
            userId: userId,
            approved: false,
        },
    });

    async function deleteListing(listingId: string) {
        "use server";
        try {
            await db.listing.delete({
                where: {
                    id: listingId,
                },
            });
            return { success: true };
        } catch (error) {
            console.error("Error deleting listing:", error);
            return { success: false };
        }
    }

    return (
        <Section>
            <ManageCardContainer
                deleteListing={deleteListing}
                listings={listings}
            />
        </Section>
    );
}
