import React from 'react';

export default function OAuthButtons() {
  return (
    <div className="flex gap-3 mt-4">
      <button className="flex-1 py-2 border rounded-md">Facebook</button>
      <button className="flex-1 py-2 border rounded-md">Google</button>
      <button className="flex-1 py-2 border rounded-md">Apple</button>
    </div>
  );
}
