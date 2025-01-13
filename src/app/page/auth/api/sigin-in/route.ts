import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const prisma = new PrismaClient();

// JWT secret key
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Function to handle the POST request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    console.log("Request body:", body);

    const { username, password } = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing required fields: 'username' and 'password'." },
        { status: 400 }
      );
    }

    // Find user by username
    const user = await prisma.admin.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 }
      );
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, roles: user.roles },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { user: { id: user.id, username: user.username, roles: user.roles }, token, message: "Login successful." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);

    // Handle JWT-specific errors
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        { error: "Token has expired. Please log in again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
