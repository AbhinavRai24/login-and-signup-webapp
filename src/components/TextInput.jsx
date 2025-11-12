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
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...rest}
      />
      {error ? <p className="text-xs text-red-500 mt-1">{error}</p> : null}
    </div>
  );
}
