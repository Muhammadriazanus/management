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
        let { title, start_time, end_time, class_id, description,tenant_id } = body;

        // Validate required fields
        if (!title  || !start_time || !end_time || !class_id || !description  || !tenant_id) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }


        const result = await prisma.event.create({
            data: {
                title,
                start_time,
                end_time,
                description,
                class_id,
                tenant_id
            }
        });

        
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error creating grade record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }
}
