// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id")?.trim();
    console.log("🚀 ~ GET ~ id:", id)
    try {
        const payment = await prisma.payment.findMany();
        console.log("🚀 ~ GET ~ payment:", payment)
        return NextResponse.json({message : "payments records are here",payment}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
