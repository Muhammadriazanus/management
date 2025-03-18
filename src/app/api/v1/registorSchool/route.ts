import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { error } from 'console';

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
        let { name, teacher, address, phone_number } = body;

        // Validate required fields
        if (!name || !teacher || !address || !phone_number) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }
        if (phone_number.length < 11) {
            return NextResponse.json({ error: 'Phone_Number length must be less than equal to 11 ' },
                { status: 402 }
            )
        }

        // Fetch the students from the database based on the provided IDs

        // Create the Parent record and connect the existing students
        const result = await prisma.registerSchool.create({
            data: {
                name,
                teacher,
                address,
                phone_number,
            }
        });

        // Return the created record as JSON
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        // Catch and log errors
        // console.error('Error creating grade record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }
}
