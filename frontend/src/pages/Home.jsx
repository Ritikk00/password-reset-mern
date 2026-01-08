import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiMail, FiShield } from 'react-icons/fi';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1>Secure Your Account</h1>
          <p>Safely reset your password with our secure authentication system</p>
          <div>
            <Link to="/login" className="btn btn-light btn-lg me-3">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5" style={{ color: '#333' }}>
          Why Choose Our Password Reset System?
        </h2>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-card">
              <FiLock size={40} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h5>Secure & Encrypted</h5>
              <p>Your password is hashed with bcrypt and encrypted using industry-standard algorithms.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <FiMail size={40} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h5>Email Verification</h5>
              <p>Receive secure password reset links via email with time-limited tokens (15 minutes).</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <FiShield size={40} style={{ color: '#667eea', marginBottom: '1rem' }} />
              <h5>Privacy Protected</h5>
              <p>We never share your data. Your privacy and security are our top priorities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-4">Ready to Get Started?</h3>
          <p className="mb-4 text-muted">Join thousands of users securing their accounts today</p>
          <Link to="/register" className="btn btn-primary btn-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
            Create Your Account Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Password Reset System. All rights reserved.</p>
          <small className="text-muted">Secure password management for your peace of mind</small>
        </div>
      </footer>
    </div>
  );
}
