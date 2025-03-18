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
        let { categoryId, classes, amount, studentFees } = body;

        // Validate required fields
        if (!categoryId || !classes || !amount || !studentFees?.length) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }

        // Fetch the studentFees from the database based on the provided IDs
        const studentFeesies = await prisma.studentFee.findMany({
            where: {
                id: { in: studentFees },
            },
        });
        console.log("🚀 ~ POST ~ studentFeesies:", studentFeesies);

        // If some studentFees IDs don't exist, return an error
        if (studentFees.length !== studentFeesies.length) {
            return NextResponse.json(
                { error: 'Some studentFees IDs are invalid' },
                { status: 400 }
            );
        }

        // Create the fee structure and connect the existing studentFees
        const result = await prisma.feeStructure.create({
            data: {
                categoryId,
                studentFees: {
                    connect: studentFeesies.map(res => ({ id: res.id })), // Connect existing studentFees
                },    
                amount,
                classes       
            },
            include: {
                studentFees: true, // Include the connected studentFees in the response
            },
        });

        // Return the created record as JSON
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error creating fee structure:', error);
        return NextResponse.json(
            { message: 'An error occurred while creating the fee structure' },
            { status: 500 }
        );
    }
}
