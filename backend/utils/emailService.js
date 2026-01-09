/**
 * Email utility for sending password reset emails
 * Uses Nodemailer to send emails via SMTP
 */

const nodemailer = require('nodemailer');

/**
 * Send password reset email
 * @param {string} email - User's email address
 * @param {string} resetToken - Reset token to send in email
 * @returns {Promise}
 */
const sendResetEmail = async (email, resetToken) => {
  try {
    // Log configuration for debugging
    console.log('📧 Email Configuration Check:');
    console.log('  SMTP_HOST:', process.env.SMTP_HOST);
    console.log('  SMTP_PORT:', process.env.SMTP_PORT);
    console.log('  SMTP_USER:', process.env.SMTP_USER);
    console.log('  EMAIL_FROM:', process.env.EMAIL_FROM);
    console.log('  FRONTEND_URL:', process.env.FRONTEND_URL);

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: parseInt(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      connectionTimeout: 15000, // 15 seconds
      socketTimeout: 15000,
      greetingTimeout: 15000,
      pool: {
        maxConnections: 1
      }
    });

    // Reset link URL (with token as query parameter)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p style="color: #666; line-height: 1.6;">
              You have requested to reset your password. Click the link below to proceed:
            </p>
            <p style="margin: 30px 0;">
              <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </p>
            <p style="color: #666; font-size: 14px;">
              Or copy and paste this link in your browser:<br>
              <code style="background-color: #e9ecef; padding: 5px 10px; border-radius: 3px;">${resetUrl}</code>
            </p>
            <p style="color: #ff6b6b; font-weight: bold;">
              ⏰ This link will expire in 15 minutes.
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              If you did not request a password reset, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2026 Password Reset App. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Verify transporter connection
    console.log('🔗 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection verified');

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Reset email sent to:', email);
    console.log('  Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('✗ Error sending email:', error.message);
    console.error('✗ Error code:', error.code);
    console.error('✗ Full error details:', error);
    
    // Provide more helpful error messages
    let userMessage = `Failed to send reset email: ${error.message}`;
    if (error.code === 'EAUTH') {
      userMessage = 'Email authentication failed. Please check SMTP credentials.';
    } else if (error.code === 'ECONNREFUSED') {
      userMessage = 'Unable to connect to email server. Please try again later.';
    } else if (error.code === 'ETIMEDOUT') {
      userMessage = 'Email server connection timed out. Please try again later.';
    }
    
    throw new Error(userMessage);
  }
};

module.exports = { sendResetEmail };
