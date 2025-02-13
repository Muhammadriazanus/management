"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Parent {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  tenant_id : number
}

interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  startTime: string;
  endTime: string;
}

const ParentListPage = () => {
  const [parentData, setParentData] = useState<Parent[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [parent_id ,setParentId] = useState<any>(null)

  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/page/api/Getparent");
        console.log("Parent data fetched:", response.data);
        setParentData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching parent data:", err);
        setError("Failed to fetch parent data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAskedMeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/page/api/GetAskedMe");
        console.log("AskedMe data fetched:", response.data);
        setAskedMeData(response.data);
      } catch (err) {
        console.error("Error fetching AskedMe data:", err);
      }
    };

    fetchAskedMeData();
    fetchParentDetails();
  }, []);
  useEffect(() => {
    const fetchDataParentId = async(parent_id:string)=>{
    try {
        const response = await axios.get(`/page/api/Getparent?parent_id=${parent_id}`)
        setParentData(response.data)
      }catch(err){
      console.log("🚀 ~ fetchDataParentId ~ err:", err)
      }
    fetchDataParentId(parent_id)
    }
  }, [parent_id])



  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Parent and AskedMe Data</h2>
      <div className="overflow-x-auto flex">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">id</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Username</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Surname</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Address</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Question</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Search Text</th>
              {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Start Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">End Time</th> */}
            </tr>
          </thead>
          <tbody>
            {parentData.map((parent, index) => {
              const asked = askedMeData[index] || {};
              return (
                <tr key={parent.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{parent.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{parent.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{parent.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{parent.surname}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{parent.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{parent.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{parent.address}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{asked.question}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">{asked.search_text}</td>
                  {/* Uncomment if needed */}
                  {/* <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">-</td>
      <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">-</td>
      <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">-</td>
      <td className="px-4 py-3 text-sm text-gray-800 border border-gray-300">-</td> */}
                </tr>
              );
            })}


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParentListPage;
