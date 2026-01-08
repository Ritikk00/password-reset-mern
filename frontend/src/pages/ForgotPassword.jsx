import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { FiMail } from 'react-icons/fi';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!email) {
        setError('Email is required');
        setLoading(false);
        return;
      }

      const response = await authAPI.forgotPassword(email);
      setSuccess(response.data.message || 'Check your email for password reset link');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-container">
        <div className="text-center mb-4">
          <FiMail size={50} style={{ color: '#667eea' }} />
        </div>
        
        <h2>Forgot Your Password?</h2>
        <p className="text-muted text-center mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        {error && <div className="alert alert-danger-custom">{error}</div>}
        {success && <div className="alert alert-success-custom">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary-custom w-100 text-white mb-3"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="text-center">
          <p className="mb-0">
            Remember your password?{' '}
            <Link to="/login" className="link-custom">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
