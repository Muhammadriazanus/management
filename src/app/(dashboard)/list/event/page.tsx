"use client";

import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type EventList = {
  title: string;
  tenant_id : number
  start_time: string;
  end_time: string;
  description: string;
  class_id: number;
  class: { name: string };
};
interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  start_time: string;
  end_time: string;
}

const EventListPage = () => {
  const [eventData, setEventData] = useState<EventList[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [class_id, setClassId] = useState<any>(null)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get("/page/auth/api/event");
        console.log("🚀 ~ Event Data Response:", response.data);
        setEventData(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    const fetchAskedMeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/page/auth/api/GetAskedMe");
        console.log("AskedMe data fetched:", response.data);
        setAskedMeData(response.data);
      } catch (err) {
        console.error("Error fetching AskedMe data:", err);
      }
    };
    fetchAskedMeData();

    fetchEventData();
  }, []);

  useEffect(() => {
    const fetchDataForLesson = async (class_id: number) => {
      try {
        const response = await axios.get(`/page/auth/api/event?class_id=${class_id}`);
        console.log("fetching  data for class fetched:", response.data);
        setEventData(response.data);
      } catch (err) {
        console.error("Error fetching class data are failed :", err);
      }
    };
    fetchDataForLesson(class_id);
  }, [class_id])
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* <TableSearch /> */}
          <input
            type="number"
            placeholder="Enter class ID"
            className="py-2 px-2 border rounded outline-none"
            value={class_id}
            onChange={(e) => setClassId(e.target.value)}
          />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table className="min-w-full border border-gray-200 rounded-lg my-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">TENANT ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Class</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Class Id</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Question</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">Search Text</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((item, index) => {
            const asked = askedMeData[index] || {}; // Ensure this is inside a block
            return (
              <tr key={index} className="hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.tenant_id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.class.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.class_id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{asked.question || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{asked.search_text || "N/A"}</td>
                {/* Add additional fields if needed */}
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};

export default EventListPage;
