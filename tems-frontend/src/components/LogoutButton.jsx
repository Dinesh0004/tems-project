import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg"
    >
      Logout
    </motion.button>
  );
}
