import { motion } from "framer-motion";

export default function AnimatedCard({ children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-xl shadow p-6"
    >
      {children}
    </motion.div>
  );
}