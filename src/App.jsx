import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Forgot from "./pages/Forgot.jsx";
import Verify from "./pages/Verify.jsx";
import SetPassword from "./pages/SetPassword.jsx";
import { useToast } from "./utils/context.jsx";
import LoginImg from "./assets/LoginImg.png";
import SignupImg from "./assets/SignupImg.png";
import ForgotImg from "./assets/ForgotImg.png";

const IMAGE_MAP = {
  "/login": LoginImg,
  "/signup": SignupImg,
  "/forgot": ForgotImg,
  "/verify": LoginImg,
  "/setpassword": ForgotImg
};

export default function App() {
  const location = useLocation();
  const { notify } = useToast();
  const currentImage = IMAGE_MAP[location.pathname] || LoginImg;

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      if (
        localStorage.getItem("pending_signup") ||
        localStorage.getItem("password_reset")
      ) {
        notify("Resuming pending action. Please verify your code.", "info");
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800 flex justify-center items-center py-3">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-start justify-center min-h-[80vh]">
          {/* Left column: Logo & Form Area */}
          <div className="w-full max-w-xl mx-auto lg:max-w-none lg:mx-0 order-2 lg:order-1 transition-all duration-300">
            <div className="mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-md">
                P
              </div>
              <div className="font-extrabold text-lg tracking-wider text-gray-900">
                PRITHVI EXCHANGE
              </div>
            </div>

            <div className="p-6 md:p-8 border-gray-100 min-h-[400px] flex items-center justify-center">
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
            </div>
          </div>
          <div className="hidden lg:flex w-full order-1 lg:order-2 justify-center items-center p-4 mt-30">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl overflow-hidden border border-gray-100 transform translate-y-[-20px] transition-all duration-500 hover:shadow-3xl hover:translate-y-0">
              <div className="w-full h-80 md:h-[500px] flex items-center justify-center p-4">
                <img
                  src={currentImage}
                  alt="Authentication Visual"
                  className="object-contain w-full h-full transform transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>

              {/* Aesthetic Footer Dots/Pager */}
              <div className="flex justify-center mt-6">
                {Object.keys(IMAGE_MAP).map((path) => (
                  <span
                    key={path}
                    className={`w-2.5 h-2.5 rounded-full mx-1.5 transition-all duration-300 ${
                      location.pathname === path
                        ? "bg-indigo-600 w-6"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 py-3 lg:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="flex gap-2 px-4 max-w-md mx-auto">
          <LinkButton to="/login" currentPath={location.pathname}>
            Login
          </LinkButton>
          <LinkButton to="/signup" currentPath={location.pathname}>
            Sign Up
          </LinkButton>
          <LinkButton to="/forgot" currentPath={location.pathname}>
            Forgot
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

function LinkButton({ to, currentPath, children }) {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`flex-1 py-2 rounded-xl text-center font-medium transition duration-200 ${
        isActive
          ? "bg-indigo-600 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
