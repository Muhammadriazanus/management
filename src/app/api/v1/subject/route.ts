import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();
        console.log('Received request body:', body);

        // Check if body is empty
        if (!body) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }

        // Destructure required fields
        let { name,lessons,teachers } = body;

        // Validate required fields
        if (!name || !Array.isArray(lessons) || !Array.isArray(teachers)) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }

        // Fetch the students from the database based on the provided IDs
        const existingLesson = await prisma.lesson.findMany({
            where: {
                id: { in: lessons },
            },
        });

        // If any of the student IDs don't exist, return an error
        if (existingLesson.length !== lessons.length) {
            return NextResponse.json(
                { error: 'Some student IDs are invalid' },
                { status: 400 }
            );
        }
        const existingteacher = await prisma.teacher.findMany({
            where : {
                id : {in : teachers}
            }
        })
        console.log("existingClasses",existingteacher);
        
        if (existingteacher.length !== teachers.length) {
            return NextResponse.json(
                { error: 'Some student IDs are invalid' },
                { status: 400 }
            );
        }
        // Create the Parent record and connect the existing students
        const result = await prisma.subject.create({
            data: {
              name,
              lessons: {
                connect: existingLesson.map(less => ({ id: less.id })), // Connect the existing students by ID
              },
              teachers: {
                connect: existingteacher.map(teach => ({ id: teach.id })), // Connect the existing classes by ID
              },
            },
            include: {
              lessons: true, // Include the connected students in the response
              teachers: true,  // Include the connected classes in the response
            },
          });

        // Return the created record as JSON
        return NextResponse.json(result , { status: 200 });

    } catch (error) {
        // Catch and log errors
        console.error('Error creating grade record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }
}
