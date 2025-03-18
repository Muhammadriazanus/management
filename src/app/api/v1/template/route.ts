import { NextResponse } from 'next/server';

import prisma from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("🚀 ~ POST ~ body:", body)
        if (!body) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }
        let { tenant_id, slug, name, description, placeholders, content, status, created_by, updated_by, deleted_by } = body
        if (!tenant_id || !slug || !name || !description || !placeholders || !content || !created_by || !status || !updated_by || !deleted_by) {
            return NextResponse.json(
                { error: 'Missing required fields or students data is not valid' },
                { status: 400 }
            );
        }
        const result = await prisma.template_Notification.create({
            data: {
                tenant_id,
                slug,
                name,
                description,
                placeholders,
                content,
                created_by,
                status,
                updated_by,
                // deleted_on,
                deleted_by
            }
        })
        console.log("🚀 ~ POST ~ result:", result)
        return NextResponse.json({ message: "result for template_Notification services", result }, { status: 200 });

    } catch (error) {
        console.error('Error creating grade record:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred while creating the Parent record' },
            { status: 500 }
        );
    }

}