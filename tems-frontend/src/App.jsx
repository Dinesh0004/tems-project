import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitTravel from "./pages/SubmitTravel";
import SubmitExpense from "./pages/SubmitExpense";
import ExpenseStatus from "./pages/ExpenseStatus";
import MyReimbursements from "./pages/MyReimbursements";

import AdminDashboard from "./pages/admin/AdminDashboard";
import TravelRequests from "./pages/admin/TravelRequests";
import EditTravel from "./pages/admin/EditTravel";
import AdminExpenses from "./pages/admin/AdminExpenses";
import AdminReimbursements from "./pages/admin/AdminReimbursements";


import AdminRoute from "./routes/AdminRoute";

export default function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* EMPLOYEE */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/submit-travel" element={<SubmitTravel />} />
      <Route path="/submit-expense" element={<SubmitExpense />} />
      <Route path="/expense-status" element={<ExpenseStatus />} />
      <Route
  path="/my-reimbursements"
  element={<MyReimbursements />}
/>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/travel"
        element={
          <AdminRoute>
            <TravelRequests />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/travel/edit/:id"
        element={
          <AdminRoute>
            <EditTravel />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/expenses"
        element={
          <AdminRoute>
            <AdminExpenses />
          </AdminRoute>
        }
      />
      <Route path="/admin/reimbursements" element={<AdminReimbursements />} />

    </Routes>
    
  );
}
