import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../components/Label';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import { passwordStrength } from '../utils/validators';
import { useToast } from '../utils/context.jsx';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { notify } = useToast();

  const isResetContext = !!localStorage.getItem('password_reset');

  const submit = async () => {
    const e = {};
    if (!passwordStrength(password)) e.password = 'Password must be ≥8 chars, include uppercase, lowercase, and number.';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    // Finalize the process
    localStorage.removeItem('password_reset');
    localStorage.removeItem('pending_signup');

    notify(`Password set successfully! You can now log in.`, 'success');
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md p-2">
      <Link to="/login" className="text-sm text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition block">
        &larr; Back to login
      </Link>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
        {isResetContext ? 'Reset Password' : 'Finalize Account'}
      </h2>
      <p className="text-md text-gray-500 mb-8">
        {isResetContext ? 'Set your new secure password.' : 'Your account is verified. Set your password to complete setup.'}
      </p>

      <Label htmlFor="set-password">Create New Password</Label>
      <PasswordInput id="set-password" value={password} onChange={setPassword} error={errors.password} placeholder="••••••••" />

      <Label htmlFor="set-confirm">Confirm New Password</Label>
      <PasswordInput id="set-confirm" value={confirm} onChange={setConfirm} error={errors.confirm} placeholder="••••••••" />

      <PrimaryButton onClick={submit} loading={loading}>Set password</PrimaryButton>
    </div>
  );
}