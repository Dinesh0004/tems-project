import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/api";
import LogoutButton from "../components/LogoutButton";
import TravelCard from "../components/TravelCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const employeeId = localStorage.getItem("employeeId");
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [reimbursedReqIds, setReimbursedReqIds] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!token) return <Navigate to="/login" replace />;

  useEffect(() => {
    fetchRequests();
    fetchReimbursements();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get(`/travel/employee/${employeeId}`);
      setRequests(res.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchReimbursements = async () => {
    try {
      const res = await API.get(`/reimbursement/employee/${employeeId}`);
      setReimbursedReqIds(res.data.map(r => r.reqId));
    } catch {}
  };

  const pending = requests.filter(r => r.status === "PENDING");
  const approved = requests.filter(r => r.status === "APPROVED");
  const rejected = requests.filter(r => r.status === "REJECTED");

  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
            <p className="text-sm opacity-90">
              Manage travel requests & reimbursements
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto p-6">

        {/* ACTION BAR */}
        <div className="flex flex-wrap gap-4 mb-8">
          <PrimaryButton onClick={() => navigate("/submit-travel")}>
            + New Travel Request
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate("/my-reimbursements")}>
            View Reimbursements
          </SecondaryButton>
        </div>

        {/* STATUS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatusCard title="Pending" count={pending.length} tone="amber" />
          <StatusCard title="Approved" count={approved.length} tone="green" />
          <StatusCard title="Rejected" count={rejected.length} tone="red" />
        </div>

        {/* PENDING */}
        <Section title="⏳ Pending Requests">
          {loading && <LoadingSkeleton />}
          {!loading && pending.length === 0 && (
            <EmptyMessage text="No pending requests 🎉" />
          )}
          <CardGrid>
            {pending.map((req, i) => (
              <TravelCard
                key={req.reqId}
                request={req}
                delay={i * 0.1}
                role="EMPLOYEE"
              />
            ))}
          </CardGrid>
        </Section>

        {/* APPROVED */}
        <Section title="✅ Approved Requests">
          {approved.length === 0 && (
            <EmptyMessage text="No approved requests yet" />
          )}
          <CardGrid>
            {approved.map((req, i) => (
              <TravelCard
                key={req.reqId}
                request={req}
                delay={i * 0.1}
                isReimbursed={reimbursedReqIds.includes(req.reqId)}
                role="EMPLOYEE"
              />
            ))}
          </CardGrid>
        </Section>

        {/* REJECTED */}
        <Section title="❌ Rejected Requests">
          {rejected.length === 0 && (
            <EmptyMessage text="No rejected requests" />
          )}
          <CardGrid>
            {rejected.map((req, i) => (
              <TravelCard
                key={req.reqId}
                request={req}
                delay={i * 0.1}
                role="EMPLOYEE"
              />
            ))}
          </CardGrid>
        </Section>
      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function CardGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

function EmptyMessage({ text }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-gray-500 py-6"
    >
      {text}
    </motion.p>
  );
}

function StatusCard({ title, count, tone }) {
  const tones = {
    amber: "from-yellow-400 to-yellow-600",
    green: "from-green-500 to-emerald-600",
    red: "from-red-500 to-rose-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r ${tones[tone]} text-white p-6 rounded-2xl shadow-lg`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <p className="text-3xl font-bold mt-1">{count}</p>
    </motion.div>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow"
    >
      {children}
    </motion.button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow"
    >
      {children}
    </motion.button>
  );
}
