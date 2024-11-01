import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // With the file data in the buffer, you can do whatever you want with it.
        // For this example, we'll save it to the public/images directory
        const path = join(process.cwd(), "public/images", file.name);
        await writeFile(path, buffer);

        return NextResponse.json(
            {
                message: "File uploaded successfully",
                filename: file.name,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Error uploading file" },
            { status: 500 }
        );
    }
}
