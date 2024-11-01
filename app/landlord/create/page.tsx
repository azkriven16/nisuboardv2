import CreateForm from "@/components/forms/create-listing";
import Section from "@/components/layouts/section";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export default function LandlordCreatePage() {
    return (
        <Section>
            <CreateForm />
        </Section>
    );
}
