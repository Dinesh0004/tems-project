import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TravelCard({ request, delay }) {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);

  if (hide) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="relative bg-white p-4 rounded-xl shadow"
    >
      {/* ❌ CROSS BUTTON */}
      <motion.button
        whileHover={{ rotate: 90, scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setHide(true)}
        className="absolute top-2 right-2 w-7 h-7
                   flex items-center justify-center
                   rounded-full bg-gray-200
                   text-gray-700 hover:bg-red-500 hover:text-white"
      >
        ✕
      </motion.button>

      {/* CARD CONTENT */}
      <h3 className="font-semibold text-indigo-700">
        {request.purpose}
      </h3>

      <p className="text-sm text-gray-500">
        {request.dateFrom} → {request.dateTo}
      </p>

      <span
        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full
          ${
            request.status?.toUpperCase() === "APPROVED"
              ? "bg-green-100 text-green-700"
              : request.status?.toUpperCase() === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
      >
        {request.status}
      </span>

      {/* ACTIONS */}
     {request.status?.toUpperCase() === "APPROVED" && (
  <div className="flex gap-2 mt-3">
    {/* ADD EXPENSE */}
    <button
      onClick={() =>
        navigate("/submit-expense", {
          state: { reqId: request.reqId },
        })
      }
      className="px-3 py-1 bg-indigo-600 text-white rounded"
    >
      Add Expense
    </button>

    {/* VIEW EXPENSES */}
    <button
      onClick={() =>
        navigate("/expense-status", {
          state: { reqId: request.reqId },
        })
      }
      className="px-3 py-1 bg-gray-600 text-white rounded"
    >
      View Expenses
    </button>
  </div>
)}

    </motion.div>
  );
}
