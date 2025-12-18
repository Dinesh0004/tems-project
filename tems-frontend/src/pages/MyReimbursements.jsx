import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import API from "../api/api";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";

export default function MyReimbursements() {
  const token = localStorage.getItem("token");
  const employeeId = localStorage.getItem("employeeId");

  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!token) return <Navigate to="/login" replace />;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchReimbursements();
  }, []);

  const fetchReimbursements = async () => {
    try {
      const res = await API.get(`/reimbursement/employee/${employeeId}`);

      const data = Array.isArray(res.data) ? res.data : [res.data];
      setReimbursements(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load reimbursements");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-100"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 bg-purple-700 text-white">
        <h1 className="text-xl font-bold">My Reimbursements</h1>
        <LogoutButton />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="mb-6">
          <BackButton />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : reimbursements.length === 0 ? (
          <p className="text-center text-gray-500">
            No reimbursements yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reimbursements.map((r, index) => (
              <motion.div
                key={r.reimbId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white p-6 rounded-xl shadow"
              >
                {/* PAID BADGE */}
                <span className="absolute top-3 right-3 
                  bg-green-600 text-white text-xs 
                  px-3 py-1 rounded-full">
                  {r.status}
                </span>

                <h2 className="text-lg font-bold text-purple-700 mb-2">
                  Request #{r.reqId}
                </h2>

                <p className="text-gray-700">
                  <b>Total Amount:</b>{" "}
                  <span className="text-green-600 font-semibold">
                    ₹ {r.totalAmount}
                  </span>
                </p>

                <p className="text-gray-700">
                  <b>Date:</b>{" "}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
