import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Forgot from "../pages/Forgot.jsx";
import Verify from "../pages/Verify.jsx";
import SetPassword from "../pages/SetPassword.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/setpassword" element={<SetPassword />} />
      <Route
        path="*"
        element={
          <div className="p-8 text-center text-red-500">
            404 | Page not found
          </div>
        }
      />
    </Routes>
  );
}
