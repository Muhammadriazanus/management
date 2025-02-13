// src/app/page/auth/api/GetAskedMe/route.ts
import { NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET() {
  try {
    const askedMeRecords = await prisma.askedMe.findMany();
    return NextResponse.json(askedMeRecords);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
