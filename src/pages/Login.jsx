import React, { useState } from 'react';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import OAuthButtons from '../components/OAuthButtons';
import { emailRegex } from '../utils/validators';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    const e = {};
    if (!emailRegex.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Enter your password';
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    localStorage.setItem('isAuthenticated', '1');
    alert('Login successful (demo).');
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-2">Login</h2>
      <p className="text-sm text-gray-600 mb-6">Login to access your travelwise account</p>

      <Label htmlFor="login-email">Email</Label>
      <TextInput id="login-email" value={email} onChange={setEmail} placeholder="john.doe@gmail.com" error={errors.email} />

      <Label htmlFor="login-password">Password</Label>
      <PasswordInput id="login-password" value={password} onChange={setPassword} placeholder="••••••••" error={errors.password} />

      <div className="flex items-center justify-between mb-4">
        <label className="inline-flex items-center text-sm">
          <input type="checkbox" className="mr-2" /> Remember me
        </label>
        <button onClick={() => navigate('/forgot')} className="text-sm text-indigo-600">Forgot Password</button>
      </div>

      <PrimaryButton onClick={submit} loading={loading}>Login</PrimaryButton>

      <p className="text-center text-sm mt-3">Don't have an account? <button onClick={() => navigate('/signup')} className="text-indigo-600">Sign up</button></p>

      <div className="my-6 text-center text-gray-400">Or login with</div>
      <OAuthButtons />
    </div>
  );
}
