import React, { useState } from 'react';
import { registerUser } from '../api/user.api.js';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({state}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(password.length < 6){
        setError('Password must be at least 6 characters');
        return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await registerUser(name, email, password);
      setLoading(false);
      dispatch(login(data))
      navigate({ to: '/dashboard'})
      setLoading(false)
      console.log('Registration successful', data);
      
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    } 
  };

  return (
    <div  className="space-y-4">
      <div onSubmit={handleSubmit} >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
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
            minLength="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
    
        
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </div>
      
      <div className="cursor-pointer text-center text-sm text-gray-500">
        Already have an account? <span onClick={() => state(true)} className="text-blue-500 hover:underline">Login</span>
      </div>
      </div>
    </div>
  );
};

export default RegisterForm;