"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const SuperAdminForm = () => {
  const router = useRouter()
  const [superAdmin, setSuperAdmin] = useState<boolean>(false);
  const [tenants, setTenants] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    // ✅ Ensure tenants are not empty
    const tenantList = tenants
      .split(",")
      .map((tenant) => tenant.trim())
      .filter((tenant) => tenant.length > 0);

    if (tenantList.length === 0) {
      setError("Please enter at least one tenant.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`/page/api/superadmin`, {
        super_admin: superAdmin,
        tenants: tenants
          .split(",")
          .map((tenant) => parseInt(tenant.trim())) 
          .filter((id) => !isNaN(id)), 
      });
      console.log("Super Admin Created:", response.data);
      if (response.status === 201 || response.status === 200) {
        router.push(`/list/superadmindetails`);
      } else {
        alert(`Error: ${response.statusText || "Unknown Error"}`);
      }
      // ✅ Clear form after success
      setSuperAdmin(false);
      setTenants("");
    } catch (error: any) {
      console.error("Error creating Super Admin:", error.response?.data || error);

      setError(error.response?.data?.message || "Failed to create Super Admin. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Super Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={superAdmin}
            onChange={(e) => setSuperAdmin(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Super Admin</span>
        </label>

        <label className="block">
          <span className="text-gray-700">Tenants (comma-separated):</span>
          <input
            type="text"
            value={tenants}
            onChange={(e) => setTenants(e.target.value)}
            placeholder="Tenant A, Tenant B, Tenant C"
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white px-4 py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Submitting..." : "Create Super Admin"}
        </button>
      </form>
    </div>
  );
};

export default SuperAdminForm;
