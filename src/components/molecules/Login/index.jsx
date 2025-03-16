import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

import logo from '../../../assets/image/ForgotPassword/image.png';
import { backendUrl } from '../../../lib/config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error('Email and password are required!');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}autentication/signin`, { email, password });

      if (data.status === 'S') {
        localStorage.setItem('hoomie', data.token);
        localStorage.setItem('cred', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div 
      className="flex h-screen bg-gradient-to-br from-blue-100 to-indigo-300 items-center justify-center font-sofia-pro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
         className="w-[35%]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.div className="flex flex-col items-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <motion.img 
            src={logo} 
            alt="logo" 
            className="h-20 w-20 object-cover mb-4" 
            initial={{ rotate: -10 }} 
            animate={{ rotate: 0 }} 
            transition={{ duration: 0.5 }} 
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6 text-center">Log in to your account</p>
        </motion.div>

        <form className="space-y-4" onKeyDown={handleKeyDown}>
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="john@hostel.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </motion.div>

          <motion.div className="relative" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {showPassword ? (
              <LuEyeOff onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-10 text-gray-400 cursor-pointer" />
            ) : (
              <LuEye onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-10 text-gray-400 cursor-pointer" />
            )}
          </motion.div>

          <motion.div 
            className="text-sm text-blue-500 hover:underline cursor-pointer text-right"
            onClick={() => navigate('/forgotpassword')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Forgot password?
          </motion.div>

          <motion.button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition-all flex items-center justify-center relative overflow-hidden"
            onClick={handleSubmit}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <motion.span 
                className="loader w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" 
                initial={{ scale: 0.5 }} 
                animate={{ scale: 1 }} 
                transition={{ duration: 0.3 }}
              ></motion.span>
            ) : (
              'Log In'
            )}
          </motion.button>
        </form>

        <motion.p 
          className="text-gray-600 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Don’t have an account?{' '}
          <span 
            className="text-blue-500 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
