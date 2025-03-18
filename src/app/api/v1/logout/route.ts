// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/db";
// import { any } from "zod";

// export async function GET(req: NextRequest) {
//   // Get the authorization header from the request
//   const authHeader = req.headers.get("authorization");
//   console.log("🚀 ~ GET ~ authHeader:", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("🚀 ~ GET ~ token:", token);

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
//   }

//   try {

//     // Verify the token with the secret key and algorithm

//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS256'] }) as { id: string; exp: number };
//     console.log("🚀 ~ GET ~ decoded:", decoded);
//     const admin = decoded.id
//     console.log("🚀 ~ GET ~ admin:", admin)
//     // const adminId = await prisma.admin.findUnique({
//     //   where: { id: decoded.id }
//     // })
//     // console.log("🚀 ~ GET ~ adminId:", adminId)
    
//     // Check if the token has expired
//     if (decoded.exp * 1000 < Date.now()) {
//       return NextResponse.json({ message: "Session expired. Please log in again." }, { status: 401 });
//     }
//     // Return a successful response if token is valid and not expired
//     return NextResponse.json({
//       message: "Logged out successfully"
//     }, { status: 200 });

//   } catch (error) {
//     console.error("JWT Verification Error:", error);  // Log error details for debugging
//     return NextResponse.json({ message: "Unauthorized - Invalid or expired token" }, { status: 401 });
//   }
// }
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        // ✅ Directly get the cookies API (no need to use await)
        const cookieStore = cookies();
        
        // ✅ Expire the token by setting an empty value and past expiry date
        cookieStore.set({
            name: "token",
            value: "",
            path: "/",
            expires: new Date(0),
            httpOnly: true, // Security best practice
        });

        return NextResponse.json({ message: "Logout successful" });
    } catch (error) {
        return NextResponse.json({ message: "Logout failed" }, { status: 500 });
    }
}
