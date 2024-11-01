import { NextResponse } from "next/server";
import db from "@/lib/db";

// Create or update listing
export async function POST(req: Request) {
    const body = await req.json();
    try {
        const listing = await db.listing.upsert({
            where: {
                id: body.id || "",
            },
            update: {
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
            create: {
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
                approved: false,
            },
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.error("Error creating/updating listing:", error);
        return NextResponse.json(
            { error: "Error creating/updating listing" },
            { status: 500 }
        );
    }
}
