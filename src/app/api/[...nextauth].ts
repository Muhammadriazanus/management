import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // Check Admin
          let user = await prisma?.admin?.findUnique({
            where: { username: credentials?.username },
          });

          if (user) {
            // Validate Admin password
            const isValid = await bcrypt.compare(
              credentials?.password,
              user?.password
            );
            if (!isValid) {
              console.error("Invalid password");  // Log password mismatch
              return null;
            }

            return {
              id: user?.id,
              username: user?.username,
              email: user?.email,
              role: "admin",
            };
          }

          console.error("User not found");  // Log if user is not found
          return null;
        } catch (error) {
          console.error("Error during authentication:", error);  // Log error details
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",  // Custom sign-in page route
    error: "/api/auth/error",  // Redirect to error page on authentication issues
  },
  secret: process.env.NEXTAUTH_SECRET,
});
