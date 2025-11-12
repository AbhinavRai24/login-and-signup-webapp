import React, { useState } from 'react';
import Label from '../components/Label';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import { passwordStrength } from '../utils/validators';
import { useNavigate } from 'react-router-dom';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    const e = {};
    if (!passwordStrength(password)) e.password = 'Password must be ≥8 chars, include uppercase and number';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    alert('Password set! (demo)');
    localStorage.removeItem('password_reset');
    localStorage.removeItem('pending_signup');
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md">
      <button className="text-sm text-gray-600 mb-3" onClick={() => navigate('/login')}>← Back to login</button>
      <h2 className="text-3xl font-bold mb-2">Set a password</h2>
      <p className="text-sm text-gray-600 mb-4">Your previous password has been reset. Please set a new password for your account.</p>

      <Label>Create Password</Label>
      <PasswordInput value={password} onChange={setPassword} error={errors.password} />

      <Label>Re-enter Password</Label>
      <PasswordInput value={confirm} onChange={setConfirm} error={errors.confirm} />

      <PrimaryButton onClick={submit} loading={loading}>Set password</PrimaryButton>
    </div>
  );
}
