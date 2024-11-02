import { NextResponse } from "next/server";
import db from "@/lib/db";

// Create or update listing
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Handle empty ID case by forcing create
        const isCreate = !body.id;

        if (isCreate) {
            const listing = await db.listing.create({
                data: {
                    address: body.address as string,
                    latitude: body.latitude as number,
                    longitude: body.longitude as number,
                    title: body.title as string,
                    price: body.price as number,
                    bedroom_no: body.bedroom_no as number,
                    bathroom_no: body.bathroom_no as number,
                    wifi_available: body.wifi_available as boolean,
                    watersupply_available:
                        body.watersupply_available as boolean,
                    close_to: body.close_to as "west" | "main" | "both",
                    owner_name: body.owner_name as string,
                    owner_contact: body.owner_contact as string,
                    owner_image: body.owner_image as string,
                    userId: body.userId as string,
                    images: body.images as string[],
                    approved: false,
                },
            });
            return NextResponse.json(listing);
        }

        // Update existing listing
        const listing = await db.listing.update({
            where: {
                id: body.id,
            },
            data: {
                address: body.address as string,
                latitude: body.latitude as number,
                longitude: body.longitude as number,
                title: body.title as string,
                price: body.price as number,
                bedroom_no: body.bedroom_no as number,
                bathroom_no: body.bathroom_no as number,
                wifi_available: body.wifi_available as boolean,
                watersupply_available: body.watersupply_available as boolean,
                close_to: body.close_to as "west" | "main" | "both",
                owner_name: body.owner_name as string,
                owner_contact: body.owner_contact as string,
                owner_image: body.owner_image as string,
                userId: body.userId as string,
                images: body.images as string[],
            },
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.error("Error creating/updating listing:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
