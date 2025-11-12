import React, { useState } from 'react';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import OAuthButtons from '../components/OAuthButtons';
import { passwordStrength, emailRegex } from '../utils/validators';
import { useNavigate } from 'react-router-dom';

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

  const submit = async () => {
    const e = {};
    if (!firstName) e.firstName = 'First name required';
    if (!emailRegex.test(email)) e.email = 'Valid email required';
    if (!passwordStrength(password)) e.password = 'Password must be ≥8 chars, include uppercase and number';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    if (!agree) e.agree = 'You must accept terms';
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    const code = Math.random().toString(36).slice(2,8).toUpperCase();
    localStorage.setItem('pending_signup', JSON.stringify({ firstName, lastName, email, phone, password, code }));
    navigate('/verify');
  };

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-2">Sign up</h2>
      <p className="text-sm text-gray-600 mb-6">Let's get you all set up so you can access your personal account.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <TextInput value={firstName} onChange={setFirst} placeholder="John" error={errors.firstName} />
        </div>
        <div>
          <Label>Last Name</Label>
          <TextInput value={lastName} onChange={setLast} placeholder="Doe" error={errors.lastName} />
        </div>
        <div>
          <Label>Email</Label>
          <TextInput value={email} onChange={setEmail} placeholder="john.doe@gmail.com" error={errors.email} />
        </div>
        <div>
          <Label>Phone Number</Label>
          <TextInput value={phone} onChange={setPhone} placeholder="9999999999" error={errors.phone} />
        </div>
      </div>

      <Label>Password</Label>
      <PasswordInput value={password} onChange={setPassword} placeholder="••••••••" error={errors.password} />

      <Label>Confirm Password</Label>
      <PasswordInput value={confirm} onChange={setConfirm} placeholder="••••••••" error={errors.confirm} />

      <div className="mb-4">
        <label className="inline-flex items-center text-sm">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mr-2" />
          I agree to the <span className="text-indigo-600">Terms</span> and <span className="text-indigo-600">Privacy Policies</span>
        </label>
        {errors.agree ? <p className="text-xs text-red-500">{errors.agree}</p> : null}
      </div>

      <PrimaryButton onClick={submit} loading={loading}>Create account</PrimaryButton>

      <p className="text-center text-sm mt-3">Already have an account? <button onClick={() => navigate('/login')} className="text-indigo-600">Login</button></p>

      <div className="my-6 text-center text-gray-400">Or sign up with</div>
      <OAuthButtons />
    </div>
  );
}
