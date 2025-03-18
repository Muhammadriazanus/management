import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";

function isJwtPayload(obj: string | JwtPayload): obj is JwtPayload {
  return typeof obj === "object" && obj !== null && "userId" in obj;
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!isJwtPayload(decoded)) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const admin = await prisma.admin.findUnique({ where: { id: decoded.userId } });

    if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 });

    return NextResponse.json({ admin });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
