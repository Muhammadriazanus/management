"use client";
import axios from "axios";
import { useState } from "react";

interface PaymentFormData {
  name: string;
  code: string;
  symbol: string;
}

const currencyForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    name : "",
    code : "",
    symbol: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/currency", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("🚀 ~ handleSubmit ~ response:", response.data);

      if (response.status === 200) {
        alert("Payment successful!");
        setFormData({
          name: "",
          code : "",
          symbol : ""
        });
      }
    } catch (error: any) {
      console.error("Payment failed!", error.response?.data);
      alert("Payment failed! " + (error.response?.data?.message || "Please try again."));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium">NAME</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">CODE</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">SYMBOL</label>
        <input
          type="text"
          name="symbol"
          value={formData.symbol}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Submit Payment
      </button>
    </form>
  );
};

export default currencyForm;
