import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const color_Model = await prisma.color_Model.findMany(); // Table ka naam `User` hai
    return NextResponse.json(color_Model);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}