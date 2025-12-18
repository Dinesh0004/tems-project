import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm text-indigo-700 hover:text-indigo-900"
    >
      ← {label}
    </motion.button>
  );
}
