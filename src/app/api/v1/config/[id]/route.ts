
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    console.log("🚀 ~ PUT ~ context:", context)
    try {
        const { id } = context.params; // Get ID from route params
        console.log("🚀 ~ PUT ~ id:",)
        const config_Id = parseInt(id, 10); // Convert string ID to number
        console.log("🚀 ~ PUT ~ tenantId:")

        if (isNaN(config_Id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const body = await req.json();
        console.log("🚀 ~ PUT ~ body:", body)

        const {
            value_text,
            img_url,
            color_theme ,
            tenant_id
        } = body;
        console.log("🚀 ~ PUT ~ body:")

        const config = await prisma.configuration.update({
            where: { id: config_Id },
            data: { value_text, img_url, color_theme, tenant_id },
        });
        console.log("🚀 ~ PUT ~ config:", config)
        // console.log("🚀 ~ PUT ~ tenant:")

        return NextResponse.json(config, { status: 200 });

    }
    catch (error: any) {
        console.error("Update config Error:", error);
        return NextResponse.json({ error: "Failed to update config", details: error }, { status: 500 });
    }
}
