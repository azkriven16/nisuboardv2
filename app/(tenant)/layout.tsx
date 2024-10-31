import { PropsWithChildren } from "react";
import TenantNavbar from "@/components/layouts/tenant/tenant-navbar";
import TenantBottomBar from "@/components/layouts/tenant/tenant-bottom-bar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | Tenant Portal",
        default: "Tenant Portal",
    },
    description: "Manage and explore your tenant space",
};

export default function TenantLayout({ children }: PropsWithChildren) {
    return (
        <>
            <TenantNavbar />
            <main>{children}</main>
            <TenantBottomBar />
        </>
    );
}
