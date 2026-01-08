import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI, setToken } from '../utils/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.data.token) {
        setToken(response.data.token);
        setSuccess('Login successful! Redirecting...');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-container">
        <h2>Sign In</h2>
        
        {error && <div className="alert alert-danger-custom">{error}</div>}
        {success && <div className="alert alert-success-custom">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary-custom w-100 text-white mb-3"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mb-3">
          <Link to="/forgot-password" className="link-custom">
            Forgot your password?
          </Link>
        </div>
        
        <div className="divider">or</div>
        
        <div className="text-center">
          <p className="mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="link-custom">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
