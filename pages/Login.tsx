
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Terminal, AlertTriangle, Clock, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';
import SEO from '../components/SEO';
import { authenticateAdmin, getLoginLockoutInfo, getRemainingAttempts, createSecureSession } from '../services/authService';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const navigate = useNavigate();

  // Check lockout status on mount and update timer
  useEffect(() => {
    const checkLockout = () => {
      const { isLocked, remainingSeconds } = getLoginLockoutInfo();
      if (isLocked) {
        setLockoutTimer(remainingSeconds);
      } else {
        setLockoutTimer(0);
      }
      setRemainingAttempts(getRemainingAttempts());
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockoutTimer > 0 || isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');

    // Small delay to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));

    const result = await authenticateAdmin(email, password);
    
    if (result.success) {
      const user: User = { id: crypto.randomUUID(), email: '', name: 'Administrator', role: 'admin' };
      createSecureSession({ id: user.id, name: user.name, role: user.role });
      onLogin(user);
      navigate('/admin');
    } else {
      setError(result.error || 'Authentication failed.');
      setRemainingAttempts(result.remainingAttempts ?? 0);
      // Clear password on failed attempt
      setPassword('');
    }
    
    setIsSubmitting(false);
  };

  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLocked = lockoutTimer > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-10 pb-20 lg:pb-0 bg-[radial-gradient(circle_at_center,_#0a0a0a_0%,_#000000_100%)]">
      <SEO 
        title="Secure Access Portal"
        description="Restricted access portal."
        noindex={true}
        nofollow={true}
      />
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-6">
          <div className={`w-20 h-20 border mx-auto flex items-center justify-center group transition-colors ${isLocked ? 'border-red-500/50' : 'border-white'}`}>
            {isLocked ? (
              <Lock className="w-10 h-10 text-red-500 animate-pulse" />
            ) : (
              <Shield className="w-10 h-10 text-white transition-all group-hover:scale-125" />
            )}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter">
              {isLocked ? 'SYSTEM LOCKED' : 'IDENTITY VAULT'}
            </h1>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
              {isLocked ? 'Security Protocol Active' : 'System Link Required'}
            </p>
          </div>
        </div>

        {isLocked ? (
          <div className="glass p-6 sm:p-8 lg:p-12 border-red-500/20 space-y-6 bg-black/40 backdrop-blur-2xl text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-red-400">
                Too many failed authentication attempts
              </p>
              <div className="flex items-center justify-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span className="text-2xl font-black tracking-wider font-mono">{formatLockoutTime(lockoutTimer)}</span>
              </div>
              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
                System will unlock automatically
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 lg:p-12 border-white/5 space-y-8 sm:space-y-10 bg-black/40 backdrop-blur-2xl" autoComplete="off">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Grid Identifier</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 rounded-none text-white focus:outline-none focus:border-white transition-all placeholder:text-white/10"
                  placeholder="Enter credentials"
                  required
                  autoComplete="off"
                  spellCheck="false"
                  data-lpignore="true"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Security Cipher</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 pr-14 rounded-none text-white focus:outline-none focus:border-white transition-all placeholder:text-white/10"
                    placeholder="••••••••"
                    required
                    autoComplete="new-password"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 text-red-500 bg-red-950/20 p-4 border border-red-900/40 text-[9px] font-black uppercase tracking-widest">
                <Lock className="w-3 h-3 shrink-0" /> <span>{error}</span>
              </div>
            )}

            {remainingAttempts <= 2 && remainingAttempts > 0 && !error && (
              <div className="flex items-center gap-3 text-yellow-500 bg-yellow-950/20 p-4 border border-yellow-900/40 text-[9px] font-black uppercase tracking-widest">
                <AlertTriangle className="w-3 h-3 shrink-0" /> 
                <span>{remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining before lockout</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-6 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                <>INITIATE LINK <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-4 opacity-10">
          <Terminal className="w-4 h-4" />
          <span className="text-[7px] font-black uppercase tracking-[1em]">Encrypted Terminal v3.0</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
