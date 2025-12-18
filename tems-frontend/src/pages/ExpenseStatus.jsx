import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";

export default function ExpenseStatus() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reqId = state?.reqId;

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reqId) {
      navigate("/dashboard");
      return;
    }

    API.get(`/expenses/request/${reqId}`)
      .then((res) => setExpenses(res.data))
      .finally(() => setLoading(false));
  }, [reqId, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-indigo-700">
            Expense Status
          </h2>

          {/* ❌ BACK BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Back
          </motion.button>
        </div>

        {loading && <p>Loading...</p>}

        {!loading && expenses.length === 0 && (
          <p className="text-gray-500">No expenses submitted yet</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map((exp, i) => (
            <motion.div
              key={exp.expenseId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-xl shadow"
            >
              <h3 className="font-semibold">{exp.type}</h3>
              <p>₹ {exp.amount}</p>
              <p className="text-sm text-gray-500">{exp.date}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full
                  ${
                    exp.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : exp.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {exp.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
