import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, getToken } from '../utils/api';
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load user data');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-3 text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <FiUser className="me-2" />
          Your Profile
        </div>

        {error && <div className="alert alert-danger-custom">{error}</div>}

        {user && (
          <>
            <div className="dashboard-info">
              <div className="info-item">
                <label>
                  <FiMail className="me-2" style={{ color: '#667eea' }} />
                  Email Address
                </label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>
                  <FiCalendar className="me-2" style={{ color: '#667eea' }} />
                  Account Created
                </label>
                <p>{new Date(user.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>

            <div className="alert alert-info-custom" role="alert">
              <strong>Welcome, {user.email}!</strong> Your account is secure and your password has been successfully protected with industry-standard encryption.
            </div>

            <div className="text-center mt-4">
              <p className="text-muted mb-3">Your account is active and secure</p>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/');
                }}
                className="btn btn-secondary"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
