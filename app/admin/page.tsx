import ListingStats from "@/components/admin/listing-stats";
import UserStats from "@/components/admin/user-stats";
import Section from "@/components/layouts/section";

export default function AdminDashboardPage() {
    return (
        <Section className="space-y-10">
            <UserStats />
            <ListingStats />
        </Section>
    );
}
