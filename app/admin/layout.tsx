import { PropsWithChildren } from "react";
import AdminNavbar from "@/components/layouts/admin/admin-navbar";
import AdminBottomBar from "@/components/layouts/admin/admin-bottom-bar";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/check-role";

export const metadata: Metadata = {
    title: {
        template: "%s | Admin Portal",
        default: "Admin Portal",
    },
    description: "Manage and configure your organization",
};

export default async function AdminLayout({ children }: PropsWithChildren) {
    const isAdmin = await checkRole("admin");

    if (!isAdmin) {
        redirect("/");
    }

    return (
        <>
            <AdminNavbar />
            <main>{children}</main>
            <AdminBottomBar />
        </>
    );
}
