import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("🚀 ~ POST ~ body:", body)
        if (!body) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }
        let { tenant_id, recipient_id, recipient_type, template_id, placeholders, language, template_content, status } = body
        if (!tenant_id || !recipient_id || !recipient_type || !template_id || !placeholders || !language || !template_content || !status) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }
        const result = await prisma.notification_services.create({
            data: {
                tenant_id,
                recipient_id,
                recipient_type,
                template_id,
                placeholders,
                language,
                template_content,
                status
            }
        })
        return NextResponse.json({ message: "result for notification services", result }, { status: 200 });

    } catch (error) {
        console.error('Error creating grade record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }

}