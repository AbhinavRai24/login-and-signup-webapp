import React from "react";
import { useToast } from "../utils/context.jsx";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";

function OAuthButton({ children, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 py-3 px-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition duration-200 
                 text-sm font-medium text-gray-700 flex items-center justify-center gap-2 shadow-sm 
                 active:scale-[0.98]"
      aria-label={`Sign in with ${children}`}
    >
      <span className="text-lg">
        <Icon />
      </span>
      <span className="hidden sm:inline">{children}</span>
    </button>
  );
}

export default function OAuthButtons() {
  const { notify } = useToast();

  const handleOAuth = (provider) => {
    notify(`Demo: Initiating sign-in with ${provider}...`, "info");
  };

  return (
    <div className="flex gap-3 mt-4">
      <OAuthButton
        icon={FaFacebookF}
        onClick={() => handleOAuth("Facebook")}
      >
        Facebook
      </OAuthButton>

      <OAuthButton
        icon={FaGoogle}
        onClick={() => handleOAuth("Google")}
      >
        Google
      </OAuthButton>

      <OAuthButton
        icon={FaApple}
        onClick={() => handleOAuth("Apple")}
      >
        Apple
      </OAuthButton>
    </div>
  );
}
