import { PropsWithChildren } from "react";
import TenantNavbar from "@/components/layouts/tenant/tenant-navbar";
import TenantBottomBar from "@/components/layouts/tenant/tenant-bottom-bar";
import { Metadata } from "next";
import { checkRole } from "@/lib/check-role";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: {
        template: "%s | Tenant Portal",
        default: "Tenant Portal",
    },
    description: "Manage and explore your tenant space",
};

export default async function TenantLayout({ children }: PropsWithChildren) {
    const isAdmin = await checkRole("admin");
    const isLandlord = await checkRole("landlord");

    if (isAdmin) {
        redirect("/admin");
    }

    if (isLandlord) {
        redirect("/landlord");
    }

    return (
        <>
            <TenantNavbar />
            <main>{children}</main>
            <TenantBottomBar />
        </>
    );
}
