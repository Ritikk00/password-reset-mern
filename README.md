# Password Reset MERN Application

A complete, production-ready password reset application built with MERN stack (MongoDB, Express, React, Node.js) featuring email verification, token expiry, and secure password management.

## 🚀 Features

- ✅ **User Registration** - Create new accounts with validation
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **Forgot Password** - Request password reset via email
- ✅ **Email Verification** - Verify password reset tokens
- ✅ **Password Reset** - Update password with token verification
- ✅ **Token Expiry** - Reset links expire after 15 minutes
- ✅ **Responsive UI** - Built with Bootstrap for all devices
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **Icons & Fonts** - Professional UI with React Icons

## 📋 Project Structure

```
password-reset-mern/
├── backend/
│   ├── models/
│   │   └── User.js                 # MongoDB User schema
│   ├── controllers/
│   │   └── authController.js       # Authentication logic
│   ├── routes/
│   │   └── authRoutes.js           # API routes
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification
│   ├── utils/
│   │   └── emailService.js         # Email sending service
│   ├── server.js                   # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js           # Navigation component
│   │   ├── pages/
│   │   │   ├── Home.js             # Landing page
│   │   │   ├── Register.js         # Registration page
│   │   │   ├── Login.js            # Login page
│   │   │   ├── ForgotPassword.js   # Forgot password page
│   │   │   ├── ResetPassword.js    # Password reset page
│   │   │   └── Dashboard.js        # User dashboard
│   │   ├── utils/
│   │   │   └── api.js              # API utilities
│   │   ├── App.js                  # Main app component
│   │   ├── App.css                 # Global styles
│   │   └── index.js                # React entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .gitignore
│
└── README.md                        # This file
```

## 🛠️ Backend Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **dotenv** - Environment variables

## 🎨 Frontend Stack

- **React** - UI library
- **React Router** - Client-side routing
- **Bootstrap** - CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Bootstrap** - Bootstrap components

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/password-reset-app
JWT_SECRET=your_jwt_secret_key_change_in_production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@passwordreset.com
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
RESET_TOKEN_EXPIRY=15
```

5. Start MongoDB:
```bash
# On Windows
mongod

# On macOS/Linux
brew services start mongodb-community
```

6. Run the backend server:
```bash
npm run dev
```

Server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Application will open on `http://localhost:3000`

## 🔐 Password Reset Flow

### 1. User Registration
- User enters first name, last name, email, and password
- Password is hashed using bcryptjs
- User account is created in MongoDB
- JWT token is issued

### 2. User Login
- User enters email and password
- Password is verified against hash
- JWT token is issued upon successful authentication

### 3. Forgot Password
- User enters their email address
- System checks if user exists
- If user exists, a unique reset token is generated
- Token is hashed and stored in database with 15-minute expiry
- Reset link is sent to user's email with the unhashed token

### 4. Email Verification
- User clicks the reset link from email
- Frontend verifies the token with backend
- If token is valid and not expired, password reset form is shown
- If token is invalid or expired, error message is displayed

### 5. Password Reset
- User enters new password and confirmation
- Token is verified again
- If valid, password is hashed and updated in database
- Reset token is cleared from database
- User is logged in with new JWT token
- User is redirected to dashboard

## 🔑 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Verify Reset Token
```
POST /api/auth/verify-reset-token
Content-Type: application/json

{
  "token": "reset_token_from_email"
}
```

#### Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {jwt_token}
```

## 🎯 Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with features |
| Register | `/register` | User registration form |
| Login | `/login` | User login form |
| Forgot Password | `/forgot-password` | Request password reset |
| Reset Password | `/reset-password/:token` | Change password with token |
| Dashboard | `/dashboard` | User profile (protected) |

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds (10)
- **JWT Tokens**: Secure token-based authentication
- **Token Expiry**: Reset tokens expire after 15 minutes
- **Email Verification**: Token verification before password reset
- **Input Validation**: Server-side validation for all inputs
- **CORS**: Cross-Origin Resource Sharing protection
- **Environment Variables**: Sensitive data stored in .env

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Bootstrap Components**: Professional, reusable UI elements
- **React Icons**: Beautiful icons for better UX
- **Form Validation**: Client and server-side validation
- **Loading States**: Spinners for async operations
- **Error Messages**: Clear, user-friendly error alerts
- **Success Notifications**: Confirmations for completed actions

## 📧 Email Configuration

### Using Gmail

1. Enable "Less secure app access" or use App Passwords
2. Generate an app-specific password
3. Update `.env`:
```
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Other Email Providers

Update SMTP settings in `.env` for your provider:
- SendGrid
- Mailgun
- AWS SES
- etc.

## 🧪 Testing

### Test Registration
```bash
- Navigate to /register
- Fill in details with test email
- Click "Create Account"
- Should redirect to dashboard
```

### Test Login
```bash
- Navigate to /login
- Enter registered email and password
- Click "Sign In"
- Should redirect to dashboard
```

### Test Password Reset
```bash
- Navigate to /forgot-password
- Enter registered email
- Check email for reset link
- Click link in email
- Enter new password
- Click "Reset Password"
- Should be logged in with new password
```

## 🚨 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify database permissions

### Email Not Sending
- Check SMTP credentials in .env
- Verify email provider settings
- Check firewall/network settings

### CORS Error
- Ensure FRONTEND_URL in backend .env matches frontend URL
- Check that backend is running on correct port

### Token Expired
- Tokens expire after 15 minutes
- User must request a new password reset
- Increase RESET_TOKEN_EXPIRY if needed

## 📝 Code Quality

- Clean, well-commented code
- Proper variable and function naming
- Separation of concerns (models, controllers, routes)
- Error handling and validation
- Reusable components and utilities

## 🚀 Production Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables on hosting platform
2. Deploy with `npm start`
3. Ensure MongoDB is accessible from cloud

### Frontend (Vercel/Netlify)
1. Update REACT_APP_API_URL to production API
2. Run `npm build`
3. Deploy build folder

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [JWT Guide](https://jwt.io/introduction)

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👤 Author

Created as a complete password reset solution for MERN applications.

---

**Happy Coding! 🎉**
