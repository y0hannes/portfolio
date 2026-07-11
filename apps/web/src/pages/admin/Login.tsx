import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Lock } from 'lucide-react';

export const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await api.authAdmin(password);

    if (isValid) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-dark p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 text-white/50 mb-6">
            <Lock size={20} />
          </div>
          <h1 className="text-xl font-medium text-white mb-1.5">Admin Access</h1>
          <p className="text-sm text-white/30">Enter your password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-all duration-200 text-center tracking-widest text-white text-sm placeholder:text-white/20 placeholder:tracking-normal"
          />

          {error && (
            <p className="text-red-400/80 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/15 transition-colors duration-200 border border-white/10"
          >
            Unlock System
          </button>
        </form>
      </div>
    </div>
  );
};
