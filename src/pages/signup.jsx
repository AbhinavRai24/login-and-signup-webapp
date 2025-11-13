import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import OAuthButtons from '../components/OAuthButtons';
import { passwordStrength, emailRegex } from '../utils/validators';
import { useToast } from '../utils/context.jsx';

export default function Signup() {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { notify } = useToast();

  const submit = async () => {
    const e = {};
    if (!firstName) e.firstName = 'First name is required';
    if (!emailRegex.test(email)) e.email = 'Valid email required';
    if (!passwordStrength(password)) e.password = 'Password must be ≥8 chars, include uppercase, lowercase, and number.';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    if (!agree) e.agree = 'You must accept the terms and policies';
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    const code = Math.random().toString(36).slice(2,8).toUpperCase();
    localStorage.setItem('pending_signup', JSON.stringify({ firstName, lastName, email, phone, password, code }));

    notify('Account created! Verification code sent to your email.', 'success');
    notify(`DEMO CODE: ${code}`, 'info'); 
    navigate('/verify');
  };

  return (
    <div className="w-full max-w-lg p-2">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Create Account</h2>
      <p className="text-md text-gray-500 mb-8">Let's get you set up so you can access your personal account.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0">
        <div>
          <Label htmlFor="signup-first">First Name</Label>
          <TextInput id="signup-first" value={firstName} onChange={setFirst} placeholder="John" error={errors.firstName} />
        </div>
        <div>
          <Label htmlFor="signup-last">Last Name</Label>
          <TextInput id="signup-last" value={lastName} onChange={setLast} placeholder="Doe" error={errors.lastName} />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="signup-email">Email</Label>
          <TextInput id="signup-email" value={email} onChange={setEmail} placeholder="john.doe@prithvifx.com" error={errors.email} />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Label htmlFor="signup-phone">Phone Number (Optional)</Label>
          <TextInput id="signup-phone" value={phone} onChange={setPhone} placeholder="9999999999" error={errors.phone} type="tel" />
        </div>
      </div>

      <Label htmlFor="signup-password">Password</Label>
      <PasswordInput id="signup-password" value={password} onChange={setPassword} placeholder="••••••••" error={errors.password} />

      <Label htmlFor="signup-confirm">Confirm Password</Label>
      <PasswordInput id="signup-confirm" value={confirm} onChange={setConfirm} placeholder="••••••••" error={errors.confirm} />

      <div className="mb-6">
        <label className="inline-flex items-center text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mr-2 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          I agree to the <button type="button" className="text-indigo-600 font-medium ml-1 hover:underline">Terms</button> and <button type="button" className="text-indigo-600 font-medium ml-1 hover:underline">Privacy Policies</button>
        </label>
        {errors.agree ? <p className="text-xs text-red-500 mt-1 font-medium">{errors.agree}</p> : null}
      </div>

      <PrimaryButton onClick={submit} loading={loading}>Create account</PrimaryButton>

      <p className="text-center text-sm mt-6 text-gray-600">
        Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">Login</Link>
      </p>

      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or sign up with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <OAuthButtons />
    </div>
  );
}