
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Terminal } from 'lucide-react';
import { User } from '../types';
import SEO from '../components/SEO';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo logic: any "admin@psl.lk" is admin
    if (email === 'admin@psl.lk' && password === 'admin123') {
      onLogin({ id: '1', email, name: 'Lead Engineer', role: 'admin' });
      navigate('/admin');
    } else {
      setError('ACCESS DENIED: INVALID CREDENTIALS');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-10 bg-[radial-gradient(circle_at_center,_#0a0a0a_0%,_#000000_100%)]">
      <SEO 
        title="Admin Login - Secure Access Portal"
        description="Administrator access portal for internal management."
        noindex={true}
        nofollow={true}
      />
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 border border-white mx-auto flex items-center justify-center group">
            <Shield className="w-10 h-10 text-white transition-all group-hover:scale-125" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">IDENTITY VAULT</h1>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">System Link Required</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass p-12 border-white/5 space-y-10 bg-black/40 backdrop-blur-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Grid Identifier</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 rounded-none text-white focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                placeholder="ADMIN@PSL.LK"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Security Cipher</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 rounded-none text-white focus:outline-none focus:border-white transition-all placeholder:text-white/5"
                placeholder="********"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 text-red-500 bg-red-950/20 p-4 border border-red-900/40 text-[9px] font-black uppercase tracking-widest animate-pulse">
              <Lock className="w-3 h-3" /> {error}
            </div>
          )}

          <button type="submit" className="w-full btn-primary py-6 flex items-center justify-center gap-4">
            INITIATE LINK <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 opacity-10">
          <Terminal className="w-4 h-4" />
          <span className="text-[7px] font-black uppercase tracking-[1em]">Secure Terminal Instance v2.5</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
