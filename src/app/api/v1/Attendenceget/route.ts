// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {
  const url = new URL(req.url)
  const lesson_id = url.searchParams.get("lesson_id")?.trim()
  try {
    const AttendenceRecords = await prisma.attendance.findMany({
      where: {
        ...(lesson_id  && { lesson_id : parseInt(lesson_id ) })
      },
      include: {
        student: {
          select: {
            name: true, // Include only the `name` of the lesson
          },
        },
        lesson : {
          select : {
            name : true
          }
        }
      },
    });
    return NextResponse.json(AttendenceRecords);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
