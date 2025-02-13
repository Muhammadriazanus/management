"use client";

import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

type ResultList = {
  id: number;
  score: string;
  exam: { title: string };
  assignment: { title: string };
  student: { name: string };
};

interface AskedMe {
  id: string;
  question: string;
  search_text: string;
  startTime: string;
  endTime: string;
}

const ResultPage = () => {
  const [resultData, setResultData] = useState<ResultList[]>([]);
  const [askedMeData, setAskedMeData] = useState<AskedMe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultResponse, askedMeResponse] = await Promise.all([
          axios.get("/page/auth/api/result"),
          axios.get("http://localhost:3000/page/auth/api/GetAskedMe"),
        ]);

        setResultData(resultResponse.data);
        setAskedMeData(askedMeResponse.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const findAskedMe = (id: number) =>
    askedMeData.find((item) => item.id === id.toString());

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
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
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Score
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Exam Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Assignment Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Student Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Question
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
              Search Text
            </th>
          </tr>
        </thead>
        <tbody>
          {resultData.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-4 text-sm text-gray-700 border-b text-center"
              >
                No results available.
              </td>
            </tr>
          ) : (
            resultData.map((item) => {
              const asked = findAskedMe(item.id) || {};
              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {item.score}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {item.exam?.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {item.assignment?.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {item.student?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {asked?.question || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {asked?.search_text || "N/A"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultPage;