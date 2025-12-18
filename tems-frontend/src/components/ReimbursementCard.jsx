import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/api";
import AnimatedCard from "./AnimatedCard";

export default function ReimbursementCard() {
  const [reqId, setReqId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generate = async () => {
    if (!reqId) {
      setMessage("Please enter a Request ID");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await API.post(`/reimbursement/${reqId}`);
      setMessage("✅ Reimbursement generated successfully");
      setReqId("");
    } catch (err) {
      setMessage("❌ Failed to generate reimbursement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedCard title="Reimbursement">
      <div className="space-y-4">
        {/* INPUT */}
        <input
          type="number"
          value={reqId}
          onChange={(e) => setReqId(e.target.value)}
          placeholder="Enter Request ID"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-center text-gray-600">
            {message}
          </p>
        )}

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={generate}
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold shadow"
        >
          {loading ? "Generating..." : "Generate Reimbursement"}
        </motion.button>
      </div>
    </AnimatedCard>
  );
}
