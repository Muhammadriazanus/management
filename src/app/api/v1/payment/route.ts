import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();
        console.log("Received request body:", body);

        // Check if body is empty
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }

        // Destructure required fields
        let { studentFeeId, amount, paymentDate, method } = body;

        // Validate required fields
        if (!studentFeeId || !amount || !paymentDate || !method) {
            return NextResponse.json(
                { error: "Missing required fields or data is not valid", received: body },
                { status: 400 }
            );
        }

        console.log("Parsed Data:", { studentFeeId, amount, paymentDate, method });

        // Convert amount to Decimal (Prisma expects Decimal, not string or number)
        const formattedAmount = parseFloat(amount);
        const formattedStudentFeeId = parseInt(studentFeeId, 10);
        const formattedDate = new Date(paymentDate);

        // Check conversion
        if (isNaN(formattedAmount) || isNaN(formattedStudentFeeId) || isNaN(formattedDate.getTime())) {
            return NextResponse.json(
                { error: "Invalid data format", formattedAmount, formattedStudentFeeId, formattedDate },
                { status: 400 }
            );
        }

        // Create the payment
        const result = await prisma.payment.create({
            data: {
                studentFeeId: formattedStudentFeeId,
                amount: formattedAmount,
                method,
                paymentDate: formattedDate,
            },
        });

        console.log("Payment Created:", result);

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating payment:", error);
        return NextResponse.json(
            { message: "An error occurred while creating the payment", error: error.toString() },
            { status: 500 }
        );
    }
}
