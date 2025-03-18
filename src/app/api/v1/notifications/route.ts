// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {
  const url = new URL(req.url);

  try {
    // get the data for superadmin in data base
    const notification_services = await prisma.notification_services.findMany();
    
    return NextResponse.json({message : "to get all the notification services",notification_services},{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
