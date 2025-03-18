"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SuperAdmin {
  name: string;
  slug: string;
  default_language_code: string;
  status: string;
  value_text: string;
  img_url: string;
  color_theme: string;
  logo_url: string;
}

const SuperAdminDetails = () => {
  const [superAdmin, setSuperAdmin] = useState<SuperAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuperAdminUser = async () => {
      try {
        const response = await axios.get("/api/v1/tenant");
        console.log("Response Data:", response.data);

        

        setSuperAdmin(response.data);
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuperAdminUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">SUPER ADMIN ACCESS</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg my-4">
          <thead>
            <tr className="bg-gray-100">
              {["Name", "Slug", "Logo", "Default Language", "Status", "Value", "Theme Color"].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {superAdmin?.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
                style={{ backgroundColor: user.color_theme || "white" }}
              >
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{user?.name as string}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{user?.slug}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  <Image src={user.logo_url || "/placeholder.png"} alt="Logo" width={40} height={40} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{user?.default_language_code}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{user?.status}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{user?.value_text}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  <span className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: user.color_theme || "gray" }}>
                    {user?.color_theme}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDetails;
