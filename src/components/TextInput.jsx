import React from 'react';

export default function TextInput({ id, value, onChange, placeholder, error, type = 'text', ...rest }) {
  return (
    <div className="mb-4">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl transition duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? 'border-red-500 ring-red-200' : 'border-gray-300 hover:border-gray-400'}
        `}
        {...rest}
      />
      {error ? <p className="text-xs text-red-500 mt-1 font-medium">{error}</p> : null}
    </div>
  );
}