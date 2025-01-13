"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthWrapperProps {
    children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn(); // Redirects to the sign-in page
        }
    }, [status]);

    

    if (status === "unauthenticated" || !session) {
        return null; // Prevent rendering children while redirecting
    }

    return null
}
