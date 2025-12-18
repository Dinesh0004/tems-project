import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";

export default function SubmitTravel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    purpose: "",
    dateFrom: "",
    dateTo: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
  e.preventDefault();
  setError("");

  const employeeId = localStorage.getItem("employeeId");

  if (!employeeId) {
    return setError("Please login again");
  }

  if (!form.purpose || !form.dateFrom || !form.dateTo) {
    return setError("All fields are required");
  }

  try {
    await API.post("/travel", {
      purpose: form.purpose,
      dateFrom: form.dateFrom,
      dateTo: form.dateTo,
      employeeId: Number(employeeId), // ✅ FIXED
    });

    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    setError("Failed to submit travel request");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        {/* ❌ CLOSE PAGE */}
        <motion.button
          whileHover={{ rotate: 90, scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => navigate("/dashboard")}
          type="button"
          className="absolute top-2 right-2 w-7 h-7
                     flex items-center justify-center
                     rounded-full bg-gray-200
                     hover:bg-red-500 hover:text-white"
        >
          ✕
        </motion.button>

        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          Submit Travel Request
        </h2>

        <form onSubmit={submit} className="space-y-3">
          <input
            placeholder="Purpose"
            className="input"
            value={form.purpose}
            onChange={(e) =>
              setForm({ ...form, purpose: e.target.value })
            }
          />

          <input
            type="date"
            className="input"
            value={form.dateFrom}
            onChange={(e) =>
              setForm({ ...form, dateFrom: e.target.value })
            }
          />

          <input
            type="date"
            className="input"
            value={form.dateTo}
            onChange={(e) =>
              setForm({ ...form, dateTo: e.target.value })
            }
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded
                       disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
