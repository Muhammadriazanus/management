// src/app/page/auth/api/GetAskedMe/route.ts
import { NextResponse } from 'next/server';
// import prisma from '../../../../lib/prisma'; // Adjust path as needed
import prisma from '@/lib/db';

// GET handler
export async function GET() {
    try {
        const gradeRecord = await prisma.result.findMany({
            include: {
              student: {
                select: {
                  name: true, // Include only the `name` of the lesson
                },
              },
              exam: {
                select: {
                  title: true, // Include only the `name` of the lesson
                },
              },
              assignment: {
                select: {
                  title: true, // Include only the `name` of the lesson
                },
              },
            },
          });
        console.log("🚀 ~ GET ~ parenrRecord:", gradeRecord)
        return NextResponse.json(gradeRecord, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
