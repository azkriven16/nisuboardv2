import { auth } from "@clerk/nextjs/server";
import AdminBottomBar from "@/components/layouts/admin/admin-bottom-bar";
import LandlordBottomBar from "@/components/layouts/landlord/landlord-bottom-bar";
import TenantBottomBar from "@/components/layouts/tenant/tenant-bottom-bar";
import AdminNavbar from "@/components/layouts/admin/admin-navbar";
import LandlordNavbar from "@/components/layouts/landlord/landlord-navbar";
import TenantNavbar from "@/components/layouts/tenant/tenant-navbar";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/check-role";

export default async function ListingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Check roles in parallel using Promise.all
    const [isAdmin, isLandlord] = await Promise.all([
        checkRole("admin"),
        checkRole("landlord"),
    ]);

    return (
        <>
            {isAdmin && <AdminNavbar />}
            {isLandlord && <LandlordNavbar />}
            {!isAdmin && !isLandlord && <TenantNavbar />}
            {children}
            {isAdmin && <AdminBottomBar />}
            {isLandlord && <LandlordBottomBar />}
            {!isAdmin && !isLandlord && <TenantBottomBar />}
        </>
    );
}
