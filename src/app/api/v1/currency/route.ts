import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Received request body:', body);
        if (!body) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }
        let { name, code, symbol } = body;
        console.log("🚀 ~ POST ~ body:", body)
        if (!name || !code || !symbol) {
            return NextResponse.json(
                { error: 'Missing required fields or  data is not valid' },
                { status: 400 }
            );
        }
        const result = await prisma.currency.create({
            data: {
                name,
                code,
                symbol
            }
        })
        return NextResponse.json({ message: "curreny found", result }, { status: 200 });

    } catch (error) {
        console.error('Error creating grade record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }
}
