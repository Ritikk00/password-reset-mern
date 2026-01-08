import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      if (!token) {
        setError('Invalid reset link. No token provided.');
        setVerifying(false);
        return;
      }

      const response = await authAPI.verifyResetToken(token);
      if (response.data.success) {
        setTokenValid(true);
      } else {
        setError(response.data.message || 'Invalid or expired reset link.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired reset link.');
    } finally {
      setVerifying(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.newPassword || !formData.confirmPassword) {
        setError('Both password fields are required');
        setLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      const response = await authAPI.resetPassword(
        token,
        formData.newPassword,
        formData.confirmPassword
      );

      setSuccess('Password reset successful! Redirecting to login...');
      setFormData({ newPassword: '', confirmPassword: '' });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="container py-5">
        <div className="auth-container text-center">
          <div className="spinner"></div>
          <p className="mt-3 text-muted">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="container py-5">
        <div className="auth-container">
          <div className="alert alert-danger-custom mb-4">{error}</div>
          <div className="text-center">
            <p className="mb-3">The reset link is invalid or has expired.</p>
            <Link to="/forgot-password" className="btn btn-primary-custom text-white">
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="auth-container">
        <h2>Reset Your Password</h2>
        <p className="text-muted mb-4">Enter your new password below</p>
        
        {error && <div className="alert alert-danger-custom">{error}</div>}
        {success && <div className="alert alert-success-custom">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary-custom w-100 text-white"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
