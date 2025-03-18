// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {
  const url = new URL(req.url);
  const subjectId = url.searchParams.get("subjectId")?.trim(); // Get the parentId from query params

  try {
    const template_Notification = await prisma.template_Notification.findMany();
    return NextResponse.json({message : "get template notification for user",template_Notification},{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
