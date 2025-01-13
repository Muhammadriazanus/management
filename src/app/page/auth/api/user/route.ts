import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { username, email, password, roles } = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    if (!roles) {
      return NextResponse.json(
        { error: "Roles are required." },
        { status: 400 }
      );
    }

    // Check if the username already exists
    const existingUser = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists." },
        { status: 409 }
      );
    }

    // Check if the email already exists
    if (email) {
      const existingEmail = await prisma.admin.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: "Email already exists." },
          { status: 409 }
        );
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.admin.create({
      data: {
        id: uuidv4(),
        username,
        email: email || null,
        password: hashedPassword,
        roles, // Pass roles (array or string based on your schema)
      },
    });

    // Return success response
    return NextResponse.json(
      {
        user: { id: newUser.id, username: newUser.username, roles: newUser.roles },
        message: "User created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup API:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
