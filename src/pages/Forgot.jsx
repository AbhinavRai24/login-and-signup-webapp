import React, { useState } from 'react';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import OAuthButtons from '../components/OAuthButtons';
import { emailRegex } from '../utils/validators';
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!emailRegex.test(email)) {
      setError('Enter a valid email');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    const code = Math.random().toString(36).slice(2,8).toUpperCase();
    localStorage.setItem('password_reset', JSON.stringify({ email, code }));
    alert('A verification code was sent to your email (demo). Code: ' + code);
    navigate('/verify');
  };

  return (
    <div className="w-full max-w-md">
      <button className="text-sm text-gray-600 mb-3" onClick={() => navigate('/login')}>← Back to login</button>
      <h2 className="text-3xl font-bold mb-2">Forgot your password?</h2>
      <p className="text-sm text-gray-600 mb-4">Don't worry, happens to all of us. Enter your email below to recover your password.</p>

      <Label>Email</Label>
      <TextInput value={email} onChange={setEmail} placeholder="john.doe@gmail.com" error={error} />
      <PrimaryButton onClick={submit} loading={loading}>Submit</PrimaryButton>

      <div className="my-6 text-center text-gray-400">Or login with</div>
      <OAuthButtons />
    </div>
  );
}
