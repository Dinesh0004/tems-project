import { useEffect, useState } from "react";
import axios from "../../api/api";
import ExpenseCard from "../../components/admin/ExpenseCard";
import LogoutButton from "../../components/LogoutButton";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "../../components/BackButton";
export default function AdminExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("PENDING");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadExpenses = async () => {
      try {
        const res = await axios.get("/expenses");
        if (mounted) setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadExpenses();
    return () => (mounted = false);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/expenses/${id}/status/${status}`);

      setExpenses((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, status } : e
        )
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const filteredExpenses = expenses.filter((e) => {
    if (filter === "PENDING") return e.status === "SUBMITTED";
    return e.status === filter;
  });

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 bg-purple-800 text-white">
        <h1 className="text-xl font-bold">EXPENSE MANAGEMENT</h1>
        <LogoutButton />
      </div>
    
      
              {/* TOP BAR */}
              
      {/* PAGE CONTENT */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
                <BackButton />
                <span className="text-gray-600 text-sm">
                  wellcome, Admin
                </span>
              </div>
        {/* FILTER TABS */}
        <div className="flex gap-4 mb-6">
          {["PENDING", "APPROVED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded font-semibold ${
                filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredExpenses.length === 0 && (
          <p className="text-center text-gray-500">
            No expenses found
          </p>
        )}

        {/* EXPENSE LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredExpenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                <ExpenseCard
                  expense={expense}
                  onAction={updateStatus}
                  showActions={filter === "PENDING"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
