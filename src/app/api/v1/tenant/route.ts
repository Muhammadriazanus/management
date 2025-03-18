import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.tenant.findMany(); // Table ka naam `User` hai
    return NextResponse.json({message : "all tanenet for admin ",users} , {status:200});
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
