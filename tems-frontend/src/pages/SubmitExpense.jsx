import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";

export default function SubmitExpense() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const reqId = state?.reqId;

  // ✅ get employeeId from login (localStorage)
  const employeeId = localStorage.getItem("employeeId");

  const [form, setForm] = useState({
    type: "",
    amount: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Redirect if reqId or employeeId missing
  useEffect(() => {
    if (!reqId || !employeeId) {
      navigate("/dashboard");
    }
  }, [reqId, employeeId, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.type || !form.amount || !form.date) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await API.post("/expenses", {
        reqId: reqId,
        employeeId: Number(employeeId), // 🔥 FIXED
        type: form.type,
        amount: Number(form.amount),
        date: form.date,
      });

      navigate("/expense-status", { state: { reqId } });
    } catch (err) {
      console.error("Expense submit error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to submit expense (backend error)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        {/* ❌ Close Button */}
        <motion.button
          type="button"
          whileHover={{ rotate: 90, scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/dashboard")}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                     rounded-full bg-gray-200 text-gray-700
                     hover:bg-red-500 hover:text-white"
        >
          ✕
        </motion.button>

        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          Submit Expense
        </h2>

        <input
          name="type"
          placeholder="Expense Type (Hotel, Food)"
          value={form.type}
          onChange={handleChange}
          className="input mb-3"
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="input mb-3"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="input mb-3"
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-2"
          >
            {error}
          </motion.p>
        )}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded
                     hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Expense"}
        </button>
      </motion.form>
    </div>
  );
}
