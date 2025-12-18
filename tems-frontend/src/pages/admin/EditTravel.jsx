import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../api/api";

export default function EditTravel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    purpose: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    API.get(`/travel/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleSave = async () => {
    await API.put(`/travel/${id}`, form);
    navigate("/admin/travel");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">
        Edit Travel Request
      </h2>

      <input
        value={form.purpose}
        onChange={(e) =>
          setForm({ ...form, purpose: e.target.value })
        }
        placeholder="Purpose"
        className="input mb-3"
      />

      <input
        type="date"
        value={form.dateFrom}
        onChange={(e) =>
          setForm({ ...form, dateFrom: e.target.value })
        }
        className="input mb-3"
      />

      <input
        type="date"
        value={form.dateTo}
        onChange={(e) =>
          setForm({ ...form, dateTo: e.target.value })
        }
        className="input mb-3"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={handleSave}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Save Changes
      </motion.button>
    </motion.div>
  );
}
