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
        let { title, start_time, end_time, lesson_id, results ,tenant_id} = body;

        // Validate required fields
        if (!title || !Array.isArray(results) || !start_time || !end_time || !lesson_id || !tenant_id) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }

        // Fetch the students from the database based on the provided IDs
        const existingResult = await prisma.result.findMany({
            where: {
                id: { in: results },
            },
        });

        // If any of the student IDs don't exist, return an error
        if (existingResult.length !== results.length) {
            return NextResponse.json(
                { error: 'Some student IDs are invalid' },
                { status: 400 }
            );
        }
       
        // Create the Parent record and connect the existing students
        const result = await prisma.exam.create({
            data: {
                title,
                start_time,
                end_time,
                lesson_id,
                results: {
                    connect: existingResult.map(res => ({ id: res.id })), // Connect the existing students by ID
                },
                tenant_id
                
            },
            include: {
                results: true, // Include the connected students in the response
            },
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
