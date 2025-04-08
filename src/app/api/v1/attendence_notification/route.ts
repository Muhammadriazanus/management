import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tenant_id, slug } = body;

        // Validation
        if (!tenant_id || isNaN(Number(tenant_id))) {
            return NextResponse.json({ error: 'tenant_id is required and must be a valid number' }, { status: 400 });
        }

        if (!slug || typeof slug !== 'string') {
            return NextResponse.json({ error: 'slug is required and must be a valid string' }, { status: 400 });
        }

        // Fetch Attendance
        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                tenant_id: Number(tenant_id),
            },
            include: {
                student: true,
                lesson: true,
            },
        });
        console.log("🚀 ~ POST ~ attendanceRecords:", attendanceRecords)

        // Fetch Notification Template
        const notificationTemplate = await prisma.template_Notification.findFirst({
            where: {
                tenant_id: Number(tenant_id),
                slug: slug,
            },
        });
        console.log("🚀 ~ POST ~ notificationTemplate:", notificationTemplate)

        if (attendanceRecords.length > 0 && notificationTemplate) {
            return NextResponse.json({
                message: "notification for attendence", attendance: attendanceRecords,
                notificationTemplate: notificationTemplate,
            }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'No data found for the given tenant_id and slug' }, { status: 404 });
        }

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
