import { AdminCardContainer } from "@/components/admin/admin-card-container";
import Section from "@/components/layouts/section";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminApprovedPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Get all approved listings
    const listings = await db.listing.findMany({
        where: {
            approved: true,
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

    async function toggleApproval(listingId: string) {
        "use server";
        try {
            const listing = await db.listing.findUnique({
                where: {
                    id: listingId,
                },
            });

            if (!listing) {
                throw new Error("Listing not found");
            }

            await db.listing.update({
                where: {
                    id: listingId,
                },
                data: {
                    approved: !listing.approved,
                },
            });
            return { success: true };
        } catch (error) {
            console.error("Error toggling listing approval:", error);
            return { success: false };
        }
    }

    return (
        <Section>
            <AdminCardContainer
                deleteListing={deleteListing}
                toggleApproval={toggleApproval}
                listings={listings}
            />
        </Section>
    );
}
