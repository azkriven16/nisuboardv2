import LandlordBottomBar from "@/components/layouts/landlord/landlord-bottom-bar";
import LandlordNavbar from "@/components/layouts/landlord/landlord-navbar";
import { checkRole } from "@/lib/check-role";
import { redirect } from "next/navigation";

export default async function LandlordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isLandlord = await checkRole("landlord");

    if (!isLandlord) {
        redirect("/");
    }

    return (
        <div className="min-h-screen pb-24">
            <LandlordNavbar />
            <main>{children}</main>
            <LandlordBottomBar />
        </div>
    );
}
