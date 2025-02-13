// src/app/page/auth/api/GetAskedMe/route.ts
import { NextResponse } from 'next/server';
// Import the correct prisma instance
import prisma from '@/lib/db';

// GET handler
export async function GET(req: Request) {
    const url = new URL(req.url);
    const parentId = url.searchParams.get("parentId")?.trim(); // Get the parentId from query params

    try {
        // Ensure to use the correct filter based on the parentId
        const parentRecord = await prisma.parent.findMany({
            where: {
                ...(parentId && { id: parentId }), // Use parentId for filtering
            },
        });
        console.log("🚀 ~ GET ~ parentRecord:", parentRecord);

        return NextResponse.json(parentRecord, { status: 200 });
    } catch (error) {
        console.error("Error fetching parent record:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
