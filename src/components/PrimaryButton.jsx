import React from 'react';

export default function PrimaryButton({ children, onClick, loading = false, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full py-3 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 ${className}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
