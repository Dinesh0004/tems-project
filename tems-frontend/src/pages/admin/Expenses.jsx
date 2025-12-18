import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../api/api";
import LogoutButton from "../../components/LogoutButton";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    API.get("/expenses").then((res) => setExpenses(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <h1 className="text-xl font-bold tracking-wide">
            Expenses
          </h1>
          <LogoutButton />
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {expenses.map((e) => (
            <motion.div
              key={e.expenseId}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-indigo-500"
            >
              {/* TYPE */}
              <h3 className="text-lg font-semibold text-indigo-700">
                {e.type}
              </h3>

              {/* AMOUNT */}
              <p className="text-xl font-bold text-gray-800 mt-2">
                ₹ {e.amount}
              </p>

              {/* STATUS BADGE */}
              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded-full font-semibold
                  ${
                    e.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : e.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {e.status}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
