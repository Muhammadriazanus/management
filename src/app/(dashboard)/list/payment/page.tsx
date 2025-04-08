"use client";
import axios from "axios";
import { useState } from "react";

interface PaymentFormData {
  studentFeeId: number;
  amount: number;
  paymentDate: string;
  method: string;
}

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    studentFeeId: 0,
    amount: 0,
    paymentDate: new Date().toISOString().split("T")[0],
    method: "CASH",
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
      const response = await axios.post("/api/v1/payment", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("🚀 ~ handleSubmit ~ response:", response.data);

      if (response.status === 200) {
        alert("Payment successful!");
        setFormData({
          studentFeeId: 0,
          amount: 0,
          paymentDate: new Date().toISOString().split("T")[0],
          method: "CASH",
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
        <label className="block text-sm font-medium">Student Fee ID</label>
        <input
          type="number"
          name="studentFeeId"
          value={formData.studentFeeId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Payment Date</label>
        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Payment Method</label>
        <input
          name="method"
          value={formData.method}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
      </div>

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Submit Payment
      </button>
    </form>
  );
};

export default PaymentForm;
