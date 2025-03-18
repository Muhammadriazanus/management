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
        let { name,fees} = body;

        // Validate required fields
        if (!name || !Array.isArray(fees) ) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }

        // Fetch the students from the database based on the provided IDs
        const  feeCategories  = await prisma.feeCategory.findMany({
            where: {
                id: { in: fees },
            },
        });

        // If any of the student IDs don't exist, return an error
        if (feeCategories.length !== feeCategories.length) {
            return NextResponse.json(
                { error: 'Some student IDs are invalid' },
                { status: 400 }
            );
        }
       
        // Create the Parent record and connect the existing students
        const result = await prisma.feeCategory.create({
            data: {
                name,
                fees: {
                    connect: feeCategories.map(res => ({ id: res.id })), // Connect the existing feecategroies by ID
                },           
            },
            include: {
                fees: true, // Include the connected fees in the response
            },
        });

        // Return the created record as JSON
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        // Catch and log errors
        // console.error('Error creating grade record:', error);
        return NextResponse.json(
            { message:  'An error occurred while creating the fee record' },
            { status: 500 }
        );
    }
}
