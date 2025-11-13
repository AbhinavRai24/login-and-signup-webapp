import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import OAuthButtons from '../components/OAuthButtons';
import { emailRegex } from '../utils/validators';
import { useToast } from '../utils/context.jsx';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { notify } = useToast();

  const submit = async () => {
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    const code = Math.random().toString(36).slice(2,8).toUpperCase();
    localStorage.setItem('password_reset', JSON.stringify({ email, code }));

    notify('A verification code was sent to your email (demo).', 'success');
    notify(`DEMO CODE: ${code}`, 'info'); 

    navigate('/verify');
  };

  return (
    <div className="w-full max-w-md p-2">
      <Link to="/login" className="text-sm text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition block">
        &larr; Back to login
      </Link>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Forgot Password?</h2>
      <p className="text-md text-gray-500 mb-8">
        Don't worry, it happens. Enter your email below and we will send you a reset link.
      </p>

      <Label htmlFor="forgot-email">Email</Label>
      <TextInput id="forgot-email" value={email} onChange={setEmail} placeholder="john.doe@prithvifx.com" error={error} />

      <PrimaryButton onClick={submit} loading={loading}>Send Reset Link</PrimaryButton>

      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or login with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <OAuthButtons />
    </div>
  );
}