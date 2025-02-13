'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type SubjectList = {
  id: number;
  name: string; // Ensure this matches your API response structure
  level?: string; // Optional, based on your data
};

const SubjectListPage = () => {
  const [subjectsData, setSubjectsData] = useState<SubjectList[]>([]);

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get('/page/auth/api/subjectGet');
        console.log('🚀 ~ subjectDetails ~ response:', response.data);
        setSubjectsData(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjectDetails();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Subject List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
                Subject ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase border-b">
                Subject Name
              </th>
            </tr>
          </thead>
          <tbody>
            {subjectsData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectListPage;
