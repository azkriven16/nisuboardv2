import db from "@/lib/db";
import { CloseTo } from "@prisma/client";

async function main() {
    // Delete existing records
    await db.listing.deleteMany();

    const listings = [
        {
            title: "Modern Studio Near Estancia Public Market",
            price: 5000,
            address: "123 Poblacion Street, Estancia, Iloilo",
            latitude: 11.4444,
            longitude: 123.15,
            bedroom_no: 1,
            bathroom_no: 1,
            wifi_available: true,
            watersupply_available: true,
            close_to: CloseTo.main,
            owner_name: "Juan Dela Cruz",
            owner_contact: "09171234567",
            owner_image: "https://randomuser.me/api/portraits/men/1.jpg",
            userId: "user_2NNkfnTHwP8ZB3K5",
            images: [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
                "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
            ],
            approved: true,
        },
        {
            title: "Seaside 2BR Apartment in Estancia",
            price: 8000,
            address: "456 Coastal Road, Estancia, Iloilo",
            latitude: 11.4452,
            longitude: 123.1512,
            bedroom_no: 2,
            bathroom_no: 1,
            wifi_available: true,
            watersupply_available: true,
            close_to: CloseTo.west,
            owner_name: "Maria Santos",
            owner_contact: "09182345678",
            owner_image: "https://randomuser.me/api/portraits/women/1.jpg",
            userId: "user_2NNkfnTHwP8ZB3K6",
            images: [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
                "https://images.unsplash.com/photo-1502672023488-70e25813eb80",
            ],
            approved: true,
        },
        {
            title: "Cozy Room near Estancia Port",
            price: 3500,
            address: "789 Port Area, Estancia, Iloilo",
            latitude: 11.446,
            longitude: 123.152,
            bedroom_no: 1,
            bathroom_no: 1,
            wifi_available: true,
            watersupply_available: true,
            close_to: CloseTo.main,
            owner_name: "Pedro Reyes",
            owner_contact: "09193456789",
            owner_image: "https://randomuser.me/api/portraits/men/2.jpg",
            userId: "user_2NNkfnTHwP8ZB3K7",
            images: [
                "https://images.unsplash.com/photo-1522156373667-4c7234bbd804",
                "https://images.unsplash.com/photo-1522156373667-4c7234bbd805",
            ],
            approved: false,
        },
        {
            title: "Family House in Central Estancia",
            price: 12000,
            address: "101 Municipal Road, Estancia, Iloilo",
            latitude: 11.4448,
            longitude: 123.1508,
            bedroom_no: 3,
            bathroom_no: 2,
            wifi_available: true,
            watersupply_available: true,
            close_to: CloseTo.both,
            owner_name: "Ana Gonzales",
            owner_contact: "09204567890",
            owner_image: "https://randomuser.me/api/portraits/women/2.jpg",
            userId: "user_2NNkfnTHwP8ZB3K8",
            images: [
                "https://images.unsplash.com/photo-1522156373667-4c7234bbd806",
                "https://images.unsplash.com/photo-1522156373667-4c7234bbd807",
            ],
            approved: true,
        },
        {
            title: "Budget Studio near Estancia Plaza",
            price: 4000,
            address: "202 Plaza Street, Estancia, Iloilo",
            latitude: 11.4442,
            longitude: 123.1498,
            bedroom_no: 1,
            bathroom_no: 1,
            wifi_available: true,
            watersupply_available: true,
            close_to: CloseTo.main,
            owner_name: "Ramon Garcia",
            owner_contact: "09215678901",
            owner_image: "https://randomuser.me/api/portraits/men/3.jpg",
            userId: "user_2NNkfnTHwP8ZB3K9",
            images: [
                "https://images.unsplash.com/photo-1522156373667-4c7234bbd808",
                "https://images.unsplash.com/photo-1522156373667-4c7234bbd809",
            ],
            approved: true,
        },
    ];

    for (const listing of listings) {
        await db.listing.create({
            data: listing,
        });
    }

    console.log("Seed data inserted successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
