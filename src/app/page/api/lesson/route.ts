import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET handler
export async function GET(req: Request) {
  try {
    // Extract and trim query parameters
    const url = new URL(req.url);
    const subject_id = url.searchParams.get("subject_id")?.trim();
    const teacher_id = url.searchParams.get("teacher_id")?.trim();
    const class_id = url.searchParams.get("class_id")?.trim();

    console.log("🚀 ~ GET ~ class:", class_id);
    console.log("🚀 ~ GET ~ teacher:", teacher_id);
    console.log("🚀 ~ GET ~ subject:", subject_id);

    // Fetch data from Prisma with optional filters
    const lessons = await prisma.lesson.findMany({
      where: {
        ...(subject_id && { subject_id: parseInt(subject_id) }),
        ...(class_id && { class_id: parseInt(class_id) }),
        ...(teacher_id && { teacher_id: teacher_id }), 
      },
      
      include: {
        subject: { select: { name: true } },
        teacher: { select: { name: true } }, // Include teacher details
        class: { select: { name: true } },
      },
    });

    console.log("🚀 ~ GET ~ lessons:", lessons);



    // Return the lessons as a JSON response
    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    // console.error("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}