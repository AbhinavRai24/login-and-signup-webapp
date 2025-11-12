import React, { useState } from 'react';

export default function PasswordInput({ id, value, onChange, placeholder, error }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="mb-4 relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      <button
        type="button"
        onClick={() => setVisible(v => !v)}
        className="absolute right-2 top-2 text-sm text-gray-600"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
}
