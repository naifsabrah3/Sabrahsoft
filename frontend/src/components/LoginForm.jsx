import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { adminAPI } from '../api';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await adminAPI.login(credentials);
      
      // Store token in localStorage
      localStorage.setItem('admin_token', response.access_token);
      
      // Call onLogin callback
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.detail || 'فشل في تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">لوحة الإدارة</h1>
            <p className="text-gray-400">صبره سوفت</p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Username */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">
                اسم المستخدم
              </label>
              <div className="relative">
                <User size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-10 pl-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-10 pl-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                <span>تسجيل الدخول</span>
              )}
            </motion.button>
          </motion.form>

          {/* Demo Credentials Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10"
          >
            <p className="text-gray-400 text-xs text-center mb-2">
              بيانات تجريبية للاختبار:
            </p>
            <div className="text-center space-y-1">
              <p className="text-white text-sm">المستخدم: <span className="font-mono bg-white/10 px-2 py-1 rounded">xliunx</span></p>
              <p className="text-white text-sm">المرور: <span className="font-mono bg-white/10 px-2 py-1 rounded">77290</span></p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;