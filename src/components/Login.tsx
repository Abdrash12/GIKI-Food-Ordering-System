import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { UserRole } from '../App';

interface LoginProps {
  role: UserRole;
  onLogin: () => void;
  onBack: () => void;
}

const roleLabels = {
  student: 'Student',
  vendor: 'Vendor',
  rider: 'Rider'
};

export function Login({ role, onLogin, onBack }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="w-full h-full bg-white flex flex-col px-6 py-12">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 mb-6"
          style={{ backgroundColor: '#F7F8FA' }}
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
      
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2">Welcome back, {role && roleLabels[role]}!</h1>
          <p className="text-gray-500">Sign in to continue</p>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-700 mb-2">
              {role === 'student' ? 'Registration Number / Email' : 'Email'}
            </label>
            <input
              type="text"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder={role === 'student' ? '2021123' : 'your@email.com'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 outline-none transition-colors"
              style={{ backgroundColor: '#F7F8FA' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 outline-none transition-colors pr-12"
                style={{ backgroundColor: '#F7F8FA' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          type="submit"
          className="w-full py-4 rounded-full text-white transition-transform active:scale-95"
          style={{ backgroundColor: role === 'student' ? '#FF6B00' : '#007AFF' }}
        >
          Login
        </motion.button>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <span className="font-medium" style={{ color: role === 'student' ? '#FF6B00' : '#007AFF' }}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}