// src/App.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import LoginImg from "./assets/LoginImg.png";
import SignupImg from "./assets/SignupImg.png";
import ForgotImg from "./assets/ForgotImg.png";
import "./index.css";

/**
 * Map route pathname to the image we want to show on the right panel.
 * You can add more precise matching if you use nested paths.
 */
const IMAGE_MAP = {
  "/login": LoginImg,
  "/signup": SignupImg,
  "/forgot": ForgotImg,
  "/verify": LoginImg,
  "/setpassword": ForgotImg
};

export default function App() {
  const location = useLocation();
  // choose image based on current pathname, fallback to a default
  const image = IMAGE_MAP[location.pathname] || LoginImg;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left column: form area */}
          <div className="w-full md:w-1/2">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                Y
              </div>
              <div>
                <div className="text-sm font-semibold">Your Logo</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Router will render the chosen page */}
              <AppRoutes />
            </div>
          </div>

          {/* Right column: image card (hidden on small screens) */}
          <div className="hidden md:flex md:w-1/2 justify-center items-start">
            <div className="w-full max-w-md bg-gray-50 rounded-xl p-6 shadow-sm overflow-hidden">
              {/* image container: center crop and responsive */}
              <div className="w-full h-96 md:h-[520px] flex items-center justify-center">
                <img
                  src={image}
                  alt="auth visual"
                  className="object-contain w-full h-full"
                />
              </div>

              {/* optional small pager dots like figma */}
              <div className="flex justify-center mt-4">
                <span className="w-2 h-2 rounded-full bg-indigo-600 mx-1" />
                <span className="w-2 h-2 rounded-full bg-gray-300 mx-1" />
                <span className="w-2 h-2 rounded-full bg-gray-300 mx-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer nav to switch pages quickly (useful for demo) */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-3xl md:hidden px-4">
        <div className="flex gap-2">
          <Link
            to="/login"
            className="flex-1 py-2 rounded-md bg-indigo-600 text-white text-center"
          >
            Login
          </Link>
          <Link to="/signup" className="flex-1 py-2 rounded-md text-center">
            Sign up
          </Link>
          <Link to="/forgot" className="flex-1 py-2 rounded-md text-center">
            Forgot
          </Link>
        </div>
      </div>
    </div>
  );
}
