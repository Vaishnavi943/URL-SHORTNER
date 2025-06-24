import React, { useState } from 'react';
import { loginUser } from '../api/user.api.js';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({state}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth =  useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth)

  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await loginUser(email, password);
      // console.log('Login successful', data);
      dispatch(login(data.user))
      navigate({ to: '/dashboard'})
      setLoading(false)
      console.log('successfull sign!')
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      
      <div className="cursor-pointer text-center text-sm text-gray-500">
        Don't have an account? <span onClick={() => state(false)} className="text-blue-500 hover:underline">Register</span>
      </div>
    </div>
  );
};

export default LoginForm;