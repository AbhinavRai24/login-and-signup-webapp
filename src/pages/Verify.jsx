import React, { useState } from 'react';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!code) {
      setError('Enter code');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);

    const pending = JSON.parse(localStorage.getItem('pending_signup') || 'null');
    const reset = JSON.parse(localStorage.getItem('password_reset') || 'null');

    if ((pending && pending.code === code) || (reset && reset.code === code)) {
      navigate('/setpassword');
    } else {
      setError('Code is invalid');
    }
  };

  const resend = () => {
    const pending = JSON.parse(localStorage.getItem('pending_signup') || 'null');
    const reset = JSON.parse(localStorage.getItem('password_reset') || 'null');
    const target = pending || reset;
    if (target) {
      const newCode = Math.random().toString(36).slice(2,8).toUpperCase();
      target.code = newCode;
      if (pending) localStorage.setItem('pending_signup', JSON.stringify(target));
      if (reset) localStorage.setItem('password_reset', JSON.stringify(target));
      alert('Code resent (demo): ' + newCode);
    } else {
      alert('No pending action found.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <button className="text-sm text-gray-600 mb-3" onClick={() => navigate('/login')}>← Back to login</button>
      <h2 className="text-3xl font-bold mb-2">Verify code</h2>
      <p className="text-sm text-gray-600 mb-4">An authentication code has been sent to your email.</p>

      <Label>Enter Code</Label>
      <TextInput value={code} onChange={setCode} placeholder="ABCDEFG" error={error} />
      <div className="mb-4">
        <button onClick={resend} className="text-sm text-indigo-600">Didn't receive a code? Resend</button>
      </div>
      <PrimaryButton onClick={submit} loading={loading}>Verify</PrimaryButton>
    </div>
  );
}
