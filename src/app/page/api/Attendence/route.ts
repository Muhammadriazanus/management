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
        let { date, present, student_id, lesson_id ,tenant_id} = body;
        console.log("🚀 ~ POST ~ body:", body)

        // Validate required fields
        if (!date  || !present || !lesson_id || !lesson_id|| !tenant_id) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }

        // Fetch the students from the database based on the provided IDs
      
       
        // Create the Parent record and connect the existing students
        const result = await prisma.attendance.create({
            data: {
                date,
                present,
                student_id,
                lesson_id,
                tenant_id
            }
        });

        // Return the created record as JSON
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        // Catch and log errors
        console.error('Error creating grade record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }
}
