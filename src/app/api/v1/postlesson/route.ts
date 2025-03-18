import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { any } from 'zod';

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
        let { name, day, start_time, end_time, class_id, teacher_id, exams, assignments, attendances, subject_id, tenant_id } = body;

        const existingExam = await prisma.exam.findMany({
            where: {
                id: { in: exams },
            },
        });

        // If any of the student IDs don't exist, return an error
        if (existingExam.length !== exams.length) {
            return NextResponse.json(
                { error: 'Some exams IDs are invalid' },
                { status: 400 }
            );
        }
        const existingAssigment = await prisma.assignment.findMany({
            where: {
                id: { in: assignments }
            }
        })
        console.log("existingAssigment", existingAssigment);

        if (existingAssigment.length !== assignments.length) {
            return NextResponse.json(
                { error: 'Some assignments IDs are invalid' },
                { status: 400 }
            );
        }
        const existingAttendence = await prisma.attendance.findMany({
            where: {
                id: { in: attendances }
            }
        })
        console.log("existingAttendence", existingAttendence);

        if (existingAttendence.length !== attendances.length) {
            return NextResponse.json(
                { error: 'Some existingAttendence IDs are invalid' },
                { status: 400 }
            );
        }
        // Create the Parent record and connect the existing students
        const result = await prisma.lesson.create({
            data: {
                tenant_id,
                name,
                day,
                start_time,
                end_time,
                class_id,
                teacher_id,
                subject_id,
                exams: {
                    connect: existingExam.map((exa:any)=>({ id: exa.id })), // Connect the existing students by ID
                },
                assignments: {
                    connect: existingAssigment.map((Ass:any)=> ({ id: Ass.id })), // Connect the existing classes by ID
                },
                attendances: {
                    connect: existingAttendence.map((att:any)=>({ id: att.id })), // Connect the existing classes by ID
                },
            },
            include: {
                exams: true, // Include the connected students in the response
                assignments: true,
                attendances: true
                // Include the connected classes in the response
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
