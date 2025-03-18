// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {
  const url = new URL(req.url);

  try {
    // get the data for superadmin in data base
    const superAdmin = await prisma.superAdmin.findMany({
      include:{
        tenants:{
          select : {
            id : true,
            name : true,
            status : true
          }
        }
      }
    });
    
    return NextResponse.json(superAdmin);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
