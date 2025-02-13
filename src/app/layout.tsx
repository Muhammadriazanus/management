import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./(auth)/sign-up/page";
// import AuthWrapper from "@/components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Wrap only the children that need authentication */}
          {children}
          {/* <SignUp /> */}
          {/* Toast notifications */}
          <ToastContainer position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  );
}
