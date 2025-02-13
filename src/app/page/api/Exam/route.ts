// src/app/page/auth/api/GetAskedMe/route.ts
import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET(req:NextRequest) {
  const url = new URL(req.url);
  const lesson_id = url.searchParams.get("lesson_id")?.trim();
  console.log("🚀 ~ GET ~ lesson_id:", lesson_id)
  try {
    const ExamsRecords = await prisma.exam.findMany({
      where :{
        ...(lesson_id && { lesson_id: parseInt(lesson_id) }),
      },
      include: {
        lesson: {
          select: {
            name: true, // Include only the `name` of the lesson
          },
        },

        // results: {
        //   select: {
        //     name: true, // Include only the `name` of the results
        //   },
        // },
      },
    });;
    console.log("🚀 ~ GET ~ ExamsRecords:", ExamsRecords)
    return NextResponse.json(ExamsRecords);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
