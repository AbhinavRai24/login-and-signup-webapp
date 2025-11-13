import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Label from '../components/Label';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import { useToast } from '../utils/context.jsx';

export default function Verify() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { notify } = useToast();

  const pendingSignup = JSON.parse(localStorage.getItem('pending_signup') || 'null');
  const passwordReset = JSON.parse(localStorage.getItem('password_reset') || 'null');
  const context = pendingSignup ? 'Sign-up' : passwordReset ? 'Password Reset' : 'Unknown';
  const targetEmail = pendingSignup?.email || passwordReset?.email || 'your email';

  const submit = async () => {
    if (!code || code.length !== 6) {
      setError('Enter the 6-digit code');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);

    if ((pendingSignup && pendingSignup.code.toUpperCase() === code.toUpperCase()) || (passwordReset && passwordReset.code.toUpperCase() === code.toUpperCase())) {
      notify('Code verified successfully!', 'success');
      navigate('/setpassword');
    } else {
      setError('The code you entered is invalid. Please try again.');
      notify('Verification failed. Invalid code.', 'error');
    }
  };

  const resend = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));

    const target = pendingSignup || passwordReset;
    if (target) {
      const newCode = Math.random().toString(36).slice(2,8).toUpperCase();
      target.code = newCode;

      if (pendingSignup) localStorage.setItem('pending_signup', JSON.stringify(target));
      if (passwordReset) localStorage.setItem('password_reset', JSON.stringify(target));

      notify('New code resent to ' + targetEmail, 'success');
      notify(`DEMO CODE: ${newCode}`, 'info');
    } else {
      notify('No pending action found. Please go back to Login/Signup.', 'error');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-2">
      <Link to="/login" className="text-sm text-indigo-600 font-semibold mb-6 hover:text-indigo-800 transition block">
        &larr; Back to login
      </Link>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Verify Your Email</h2>
      <p className="text-md text-gray-500 mb-8">
        We sent a 6-digit code to **{targetEmail}** for your {context}.
      </p>

      <Label htmlFor="verify-code">Enter Code</Label>
      <TextInput
        id="verify-code"
        value={code}
        onChange={setCode}
        placeholder="ABCDEF"
        error={error}
        maxLength={6}
        className="text-center tracking-widest text-lg font-mono uppercase"
        inputMode="numeric"
      />
      <div className="mb-6">
        <button onClick={resend} disabled={loading} className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition disabled:opacity-50">
          Didn't receive a code? Resend
        </button>
      </div>
      <PrimaryButton onClick={submit} loading={loading}>Verify & Continue</PrimaryButton>
    </div>
  );
}