// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"; // Correct import of jsonwebtoken

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// console.log(matchers);

// export default clerkMiddleware((auth, req) => {
//   const authHeader = req.headers.get("authorization");
//   console.log("🚀 ~ clerkMiddleware ~ authHeader:", authHeader);

//   if (!authHeader) {
//     return NextResponse.redirect(new URL("/teacher", req?.url));
//   }

//   // Corrected token splitting: split by space and take the second part (Bearer <token>)
//   const token = authHeader.split(" ")[1];
//   console.log("🚀 ~ clerkMiddleware ~ token:", token);

//   if (!token) {
//     return NextResponse.redirect(new URL("/teacher", req.url));
//   }

//   let role: string | undefined;

//   try {
//     // Decode the token and log the entire decoded token
//     const decodedToken = jwt.decode(token);
//     console.log("🚀 ~ clerkMiddleware ~ decodedToken:", decodedToken); // Log full decoded token

//     // Access 'roles' directly from the decoded token (assuming 'roles' is a direct property)
//     role = decodedToken?.roles;
//     console.log("🚀 ~ clerkMiddleware ~ role:", role);

//   } catch (error) {
//     console.error("Token decoding failed", error);
//     return NextResponse.redirect(new URL("/teacher", req.url));
//   }

//   if (!role) {
//     console.error("Role not found in the token.");
//     return NextResponse.redirect(new URL("/teacher", req.url));
//   }

//   // Check if the user's role is allowed for the requested route
//   for (const { matcher, allowedRoles } of matchers) {
//     if (matcher(req)) {
//       // If the user's role is not allowed for this route, redirect them
//       if (!allowedRoles.includes(role!)) {
//         return NextResponse.redirect(new URL(`/${role}`, req.url));
//       }
//     }
//   }

//   return NextResponse.next(); // Proceed if no issues
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log(matchers);

export default clerkMiddleware((auth, req) => {
  // if (isProtectedRoute(req)) auth().protect()

  const { sessionClaims } = auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};