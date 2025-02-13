import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { refreshToken } = body;  // Extract refreshToken from the body

    // Check if refreshToken is provided
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required." },
        { status: 400 }
      );
    }

    // Verify and decode the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as { userId: string };
    console.log("Decoded Token:", decoded); // Debugging step

    // Fetch the user from the database
    const user = await prisma.admin.findUnique({
      where: { id: decoded.userId },
    });
    console.log("Fetched User:", user); // Debugging step

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: user.id, username: user.username, roles: user.roles },
      SECRET_KEY,
      { expiresIn: "1h" } // Access token expiration time
    );

    // Return the new access token
    return NextResponse.json(
      { token: newAccessToken, message: "Token refreshed successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    console.error("Stack Trace:", error.stack); // Log the stack trace for better insights

    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        { error: "Refresh token has expired. Please log in again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error.", details: error.message },
      { status: 500 }
    );
  }
}
