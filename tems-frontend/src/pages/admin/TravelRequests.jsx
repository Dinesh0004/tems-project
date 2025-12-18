import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import TravelRequestCard from "../../components/admin/TravelRequestCard";
import BackButton from "../../components/BackButton";
import LogoutButton from "../../components/LogoutButton";

export default function TravelRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await API.get("/travel");
    setRequests(res.data);
  };

  // ✅ UPDATE STATUS ONLY
  const updateStatus = async (id, status) => {
    await API.put(`/travel/approve/${id}/${status}`);

    setRequests((prev) =>
      prev.map((req) =>
        req.reqId === id ? { ...req, status } : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white shadow">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <h1 className="text-xl font-bold tracking-wide">
            Travel Requests
          </h1>
          <LogoutButton />
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <BackButton />
        </div>

        {/* REQUEST LIST */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {requests.map((req) => (
            <motion.div
              key={req.reqId}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <TravelRequestCard
                request={req}
                onEdit={() =>
                  navigate(`/admin/travel/edit/${req.reqId}`)
                }
                onApprove={() =>
                  updateStatus(req.reqId, "APPROVED")
                }
                onReject={() =>
                  updateStatus(req.reqId, "REJECTED")
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
