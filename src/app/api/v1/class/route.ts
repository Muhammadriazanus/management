// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {
  const url = new URL(req.url);
  const grade_id = url.searchParams.get("grade_id")?.trim();
  console.log("🚀 ~ GET ~ grade_id:", grade_id)
  const supervisor_id = url.searchParams.get("supervisor_id")?.trim();
  console.log("🚀 ~ GET ~ supervisorId:", supervisor_id)

  try {
    const classRecords = await prisma.class.findMany({
      where : {
        ...(grade_id && { grade_id: parseInt(grade_id) }),
        ...(supervisor_id && { supervisor_id:   supervisor_id }),
      },
      include: {
        grade: {
          select: {
            level: true, // Include only the `name` of the lesson
          },
        },
      },
    });
    return NextResponse.json(classRecords,{status:200});
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
