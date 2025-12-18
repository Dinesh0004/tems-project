import { motion } from "framer-motion";

export default function TravelRequestCard({
  request,
  onApprove,
  onReject,
  onEdit,
}) {
  const statusConfig = {
    PENDING: {
      badge: "bg-yellow-100 text-yellow-800",
      border: "border-yellow-400",
    },
    APPROVED: {
      badge: "bg-green-100 text-green-800",
      border: "border-green-400",
    },
    REJECTED: {
      badge: "bg-red-100 text-red-800",
      border: "border-red-400",
    },
  };

  const { badge, border } = statusConfig[request.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white rounded-2xl shadow-md p-5 border-l-4 ${border}`}
    >
      {/* STATUS BADGE */}
      <span
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${badge}`}
      >
        {request.status}
      </span>

      {/* HEADER */}
      <h3 className="text-lg font-bold text-indigo-700 mb-1">
        {request.purpose}
      </h3>

      {/* EMPLOYEE INFO */}
      <p className="text-sm font-medium text-gray-700">
        👤 {request.employeeName}
      </p>
      <p className="text-xs text-gray-500">
        Employee ID: {request.employeeId}
      </p>

      {/* DATE */}
      <div className="mt-2 text-sm text-gray-600">
        📅 {request.dateFrom} <span className="mx-1">→</span> {request.dateTo}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-5">
        {/* EDIT */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Edit
        </motion.button>

        {/* APPROVE / REJECT */}
        {request.status === "PENDING" && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApprove}
              className="px-3 py-1.5 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white"
            >
              Approve
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReject}
              className="px-3 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
            >
              Reject
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
