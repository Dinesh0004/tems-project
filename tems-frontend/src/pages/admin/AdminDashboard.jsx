import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm opacity-90">
            Manage travel, expenses & reimbursements
          </p>
        </div>
        <LogoutButton />
      </motion.div>

      {/* ACTION CARDS */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* TRAVEL REQUESTS */}
        <ActionCard
          title="Travel Requests"
          desc="Approve, reject or edit travel plans"
          color="indigo"
          onClick={() => navigate("/admin/travel")}
        />

        {/* EXPENSES */}
        <ActionCard
          title="Expenses"
          desc="Review and approve employee expenses"
          color="green"
          onClick={() => navigate("/admin/expenses")}
        />

        {/* REIMBURSEMENTS */}
        <ActionCard
          title="Reimbursements"
          desc="Calculate and view reimbursements"
          color="purple"
          onClick={() => navigate("/admin/reimbursements")}
        />
      </div>
    </div>
  );
}

/* ---------- CARD COMPONENT ---------- */

function ActionCard({ title, desc, color, onClick }) {
  const colors = {
    indigo: "from-indigo-500 to-indigo-600",
    green: "from-emerald-500 to-green-600",
    purple: "from-purple-500 to-pink-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-2xl shadow-lg text-white bg-gradient-to-br ${colors[color]}`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm opacity-90 mt-2">{desc}</p>
    </motion.div>
  );
}
