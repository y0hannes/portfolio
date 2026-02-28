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
      <div className="w-full max-w-sm p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold font-display">Admin Access</h1>
          <p className="text-white/40 mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-colors text-center tracking-widest"
            />
          </div>
          
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            Unlock System
          </button>
        </form>
      </div>
    </div>
  );
};
