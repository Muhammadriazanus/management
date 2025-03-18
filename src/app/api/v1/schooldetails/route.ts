// src/app/page/auth/api/GetAskedMe/route.ts
import { NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET() {
    try {
        const registerSchool = await prisma.registerSchool.findMany();
        console.log("🚀 ~ GET ~ registerSchool:", registerSchool)
        return NextResponse.json(registerSchool, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
