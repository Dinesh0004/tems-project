import { motion } from "framer-motion";

export default function ExpenseCard({ expense, onAction, showActions }) {
  const statusStyles = {
    APPROVED: {
      badge: "bg-green-100 text-green-800",
      border: "border-green-400",
    },
    REJECTED: {
      badge: "bg-red-100 text-red-800",
      border: "border-red-400",
    },
    SUBMITTED: {
      badge: "bg-yellow-100 text-yellow-800",
      border: "border-yellow-400",
    },
  };

  const { badge, border } =
    statusStyles[expense.status] || statusStyles.SUBMITTED;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white rounded-2xl shadow-md p-5 border-l-4 ${border}`}
    >
      {/* STATUS BADGE */}
      <span
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${badge}`}
      >
        {expense.status}
      </span>

      {/* EXPENSE TYPE */}
      <h2 className="text-lg font-bold text-indigo-700 mb-1">
        {expense.type}
      </h2>

      {/* EMPLOYEE INFO */}
      <p className="text-sm font-medium text-gray-700">
        👤 {expense.employeeName}
      </p>
      <p className="text-xs text-gray-500">
        Employee ID: {expense.employeeId}
      </p>

      {/* DETAILS */}
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>
          <b>Request ID:</b> {expense.reqId}
        </p>
        <p>
          <b>Date:</b> {expense.date}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          ₹ {expense.amount}
        </p>
      </div>

      {/* ACTIONS */}
      {showActions && (
        <div className="flex gap-3 mt-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction(expense.id, "APPROVED")}
            className="px-4 py-1.5 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white"
          >
            Approve
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction(expense.id, "REJECTED")}
            className="px-4 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
          >
            Reject
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
