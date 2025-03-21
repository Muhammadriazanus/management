"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Image from "next/image";
import ThemeContext from "@/components/context/themeContext";
const FormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export default function SignIn() {
    const theme = useContext(ThemeContext)
    console.log("🚀 ~ theme:", theme)
    const [error, setError] = useState<string | null>(null); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading status
    const [tokenpass , settokenPass] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear previous error before submitting
        setError(null);

        const formData = new FormData(e.currentTarget);
        const values = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        // Validate form inputs
        const parsed = FormSchema.safeParse(values);
        if (!parsed.success) {
            setError(parsed.error.errors[0].message);
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch("http://localhost:3000/api/v1/sigin-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
            });

            const result = await response.json();

            
            if (response.ok) {
                setError(null); 
                console.log("Login successful:", result);
                localStorage.setItem("token", result.token)
                
                router.push("/dashboarduser"); 
            } else {
                setError(result.error || "An error occurred");
            }
        } catch (err) {
            console.error("Sign-in error:", err);
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{background : theme[0]?.text as string}}>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center">
                    <Image   src="/asset/becanhouseSchool.png" alt="Filter" width={100} height={14} />
                    </div>
                    <h1 className="text-2xl font-bold text-center text-gray-800">Sign In</h1>

                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        disabled={loading} 
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
