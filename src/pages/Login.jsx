import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import OAuthButtons from '../components/OAuthButtons';
import { emailRegex } from '../utils/validators';
import { useToast } from '../utils/context.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { notify } = useToast();

  const submit = async () => {
    const e = {};
    if (!emailRegex.test(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    // Simulated successful login
    localStorage.setItem('isAuthenticated', '1');
    notify('Login successful! Welcome back.', 'success');
    navigate('/'); // Navigate to dashboard/root after successful login
  };

  return (
    <div className="w-full max-w-md p-2">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Welcome Back</h2>
      <p className="text-md text-gray-500 mb-8">Login to access your personal account.</p>

      <Label htmlFor="login-email">Email</Label>
      <TextInput id="login-email" value={email} onChange={setEmail} placeholder="john.doe@prithvifx.com" error={errors.email} />

      <Label htmlFor="login-password">Password</Label>
      <PasswordInput id="login-password" value={password} onChange={setPassword} placeholder="••••••••" error={errors.password} />

      <div className="flex items-center justify-between mb-6 text-sm">
        <label className="inline-flex items-center text-gray-600 cursor-pointer">
          <input type="checkbox" className="mr-2 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" /> Remember me
        </label>
        <Link to="/forgot" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">Forgot Password?</Link>
      </div>

      <PrimaryButton onClick={submit} loading={loading}>Login</PrimaryButton>

      <p className="text-center text-sm mt-6 text-gray-600">
        Don't have an account? <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">Sign up</Link>
      </p>

      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <OAuthButtons />
    </div>
  );
}