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
        let { studentFeeId, amount, paymentDate,method } = body;

        // Validate required fields
        if (!studentFeeId || !paymentDate || !amount || !method) {
            return NextResponse.json(
                { error: 'Missing required fields or  data is not valid' },
                { status: 400 }
            );
        }

        // Create the payment and connect the existing studentFees
        const result = await prisma.payment.create({
            data: {
                studentFeeId,   
                amount,
                method,
                paymentDate    
            }
           
        });

        // Return the created record as JSON
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error creating fee structure:', error);
        return NextResponse.json(
            { message: 'An error occurred while creating the payment' },
            { status: 500 }
        );
    }
}
