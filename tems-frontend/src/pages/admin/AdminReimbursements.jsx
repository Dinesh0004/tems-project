import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../../api/api";
import BackButton from "../../components/BackButton";
import LogoutButton from "../../components/LogoutButton";

export default function AdminReimbursements() {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchReimbursements();
  }, []);

  const fetchReimbursements = async () => {
    try {
      const res = await API.get("/reimbursement");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white shadow">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <h1 className="text-xl font-bold tracking-wide">
            Reimbursements
          </h1>
          <LogoutButton />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 max-w-7xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <BackButton />
          <span className="text-sm text-gray-600">
            Total Records:{" "}
            <b className="text-indigo-700">
              {reimbursements.length}
            </b>
          </span>
        </div>

        {/* BODY */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : reimbursements.length === 0 ? (
          <p className="text-center text-gray-500">
            No reimbursements found
          </p>
        ) : (
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
            {reimbursements.map((r) => (
              <motion.div
                key={r.reimbId}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500"
              >
                {/* STATUS BADGE */}
                <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                  {r.status}
                </span>

                {/* TITLE */}
                <h2 className="text-lg font-bold text-purple-700 mb-2">
                  Request #{r.reqId}
                </h2>

                {/* DETAILS */}
                <p className="text-sm text-gray-700">
                  <b>Employee:</b>{" "}
                  <span className="text-indigo-700 font-semibold">
                    {r.employeeName}
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  <b>Employee ID:</b> {r.employeeId}
                </p>

                <p className="text-lg font-bold text-green-600 mt-3">
                  ₹ {r.totalAmount}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Date:{" "}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
