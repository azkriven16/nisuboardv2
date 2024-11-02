import { clerkClient } from "@clerk/nextjs/server";
import UserStatsChart from "./user-stats-chart";

interface UserStats {
    landlords: number;
    tenants: number;
    admins: number;
}

export default async function UserStats() {
    let stats: UserStats = {
        landlords: 0,
        tenants: 0,
        admins: 0,
    };

    try {
        const clerk = await clerkClient();
        const users = await clerk.users.getUserList();

        stats = {
            landlords: users.data.filter(
                (user) => user.publicMetadata.role === "landlord"
            ).length,
            tenants: users.data.filter(
                (user) => user.publicMetadata.role === "tenant"
            ).length,
            admins: users.data.filter(
                (user) => user.publicMetadata.role === "admin"
            ).length,
        };
    } catch (error) {
        console.error("Error fetching user stats:", error);
    }

    return <UserStatsChart data={stats} />;
}
