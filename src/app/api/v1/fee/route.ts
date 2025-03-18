// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {
  try {
    const fees = await prisma.feeStructure.findMany();
    console.log("🚀 ~ GET ~ ExamsRecords:", fees)
    return NextResponse.json(fees);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
