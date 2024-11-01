import Section from "@/components/layouts/section";
import { clerkClient } from "@clerk/nextjs/server";
import Dashboard from "@/components/admin/dashboard";

export default async function AdminDashboardPage() {
    const clerk = await clerkClient();
    const users = await clerk.users.getUserList();

    const userData = {
        landlords: users.data.filter(
            (user) => user.publicMetadata.role === "landlord"
        ).length,
        tenants: users.data.filter(
            (user) => user.publicMetadata.role === "tenant"
        ).length,
        unassigned: users.data.filter((user) => !user.publicMetadata.role)
            .length,
    };

    const data = [
        { name: "Landlords", count: userData.landlords },
        { name: "Tenants", count: userData.tenants },
        { name: "Unassigned", count: userData.unassigned },
    ];

    return (
        <Section>
            <h1 className="text-3xl font-bold mb-8">User Statistics</h1>
            <Dashboard data={data} />
        </Section>
    );
}
