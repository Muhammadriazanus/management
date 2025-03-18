"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        logo_url: "",
        default_language_code: "",
        status: "",
        value_text : ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.slug || !formData.logo_url || !formData.default_language_code || !formData.status) {
            alert("Please fill in all fields.");
            return;
        }


        try {
            // Send POST request to the server
            const response = await axios.post("/api/v1/tenantadmin", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("response.data", response.data);

            if (response.status === 201 || response.status === 200) {
                router.push(`/list/admins`);
            } else {
                alert(`Error: ${response.statusText || "Unknown Error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-2xl font-bold text-center text-gray-800">ADMIN FORM</h1>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            value={formData.name}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            placeholder="Enter your Slug"
                            onChange={handleChange}
                            value={formData.slug}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">
                            Logo URL
                        </label>
                        <input
                            type="text"
                            name="logo_url"
                            placeholder="Enter your logo URL"
                            onChange={handleChange}
                            value={formData.logo_url}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="default_language_code" className="block text-sm font-medium text-gray-700">
                            Default Language Code
                        </label>
                        <input
                            type="text"
                            name="default_language_code"
                            placeholder="Enter default language code"
                            onChange={handleChange}
                            value={formData.default_language_code}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <input
                            type="text"
                            name="status"
                            placeholder="Enter status"
                            onChange={handleChange}
                            value={formData.status}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="value_text" className="block text-sm font-medium text-gray-700">
                        value_text
                        </label>
                        <input
                            type="text"
                            name="value_text"
                            placeholder="Enter status"
                            onChange={handleChange}
                            value={formData.value_text}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>




                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminForm;
