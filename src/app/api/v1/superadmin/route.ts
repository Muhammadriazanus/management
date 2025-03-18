import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { tenants } from '@/lib/data';

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
        let { super_admin,tenants } = body;

        const existing_tenant = await prisma.tenant.findMany({
            where: {
                id: { in: tenants },
            },
        });
        console.log("🚀 ~ POST ~ existing_tenant:", existing_tenant)

        
       
        // Create the Parent record and connect the existing students
        const result = await prisma.superAdmin.create({
            data: {
                super_admin ,
                tenants: {
                    connect: existing_tenant.map((exa:any)=>({ id: exa.id })), 
                },
            },
            include: {
                tenants: true, 
            },
        });

        // Return the created record as JSON
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        // Catch and log errors
        // console.error('Error creating lesson record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }
}
