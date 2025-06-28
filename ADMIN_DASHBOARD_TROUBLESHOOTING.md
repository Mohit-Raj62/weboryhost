# Admin Dashboard Troubleshooting Guide

## Quick Fix Steps

### 1. Start the Server
```bash
cd server
npm run dev
```
You should see: "Server is running on port 5002" and "Connected to MongoDB"

### 2. Create Test Admin Account
```bash
npm run create-test-admin
```
This creates: admin@webory.com / admin123

### 3. Test Server Endpoints
```bash
npm run test-server
```
This will verify all endpoints are working.

### 4. Access Admin Dashboard
- Go to: http://localhost:5173/admin/login
- Login with: admin@webory.com / admin123
- You should be redirected to: http://localhost:5173/admin/dashboard

## Common Issues & Solutions

### Issue 1: "Not Found" Error
**Problem**: Server not running or wrong endpoint
**Solution**: 
- Start server: `npm run dev`
- Check if port 5002 is available
- Verify endpoints: http://localhost:5002/api/health

### Issue 2: "Network Error" 
**Problem**: Frontend can't reach backend
**Solution**:
- Check if server is running on port 5002
- Verify CORS settings
- Check browser console for errors

### Issue 3: "Invalid Credentials"
**Problem**: No admin account exists
**Solution**:
- Run: `npm run create-test-admin`
- Use: admin@webory.com / admin123

### Issue 4: "Dashboard Loading Forever"
**Problem**: Dashboard can't fetch data
**Solution**:
- Check browser console for errors
- Verify authentication token
- Check server logs

### Issue 5: "MongoDB Connection Error"
**Problem**: Database not accessible
**Solution**:
- Check MongoDB connection string
- Verify network connectivity
- Check environment variables

## Debugging Steps

### 1. Check Server Status
```bash
# Check if server is running
netstat -ano | findstr :5002

# Check server logs
npm run dev
```

### 2. Check Browser Console
- Open Developer Tools (F12)
- Go to Console tab
- Look for error messages
- Check Network tab for failed requests

### 3. Test API Endpoints
```bash
# Test health endpoint
curl http://localhost:5002/api/health

# Test admin login (should return 400 for empty request)
curl -X POST http://localhost:5002/api/admin/login -H "Content-Type: application/json" -d "{}"
```

### 4. Check Environment Variables
Make sure these are set in your .env file:
```
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=your_mongodb_connection_string
```

## Expected Behavior

### Server Startup
```
Server is running on port 5002
Environment: development
Connected to MongoDB
Database: webory
Host: cluster0-shard-00-02.em7qp.mongodb.net
```

### Admin Login
- Page loads at: http://localhost:5173/admin/login
- Form accepts email/password
- On success: redirects to dashboard
- On error: shows specific error message

### Dashboard
- Shows loading spinner initially
- Displays stats: Users, Posts, Comments, etc.
- Shows recent activity
- Has navigation tabs: Overview, Analytics, Activity, System

## File Structure
```
server/
├── server.js (main server file)
├── routes/admin.js (admin routes)
├── controllers/admin/
│   ├── authController.js (login/signup)
│   └── dashboardController.js (dashboard data)
├── models/
│   ├── Admin.js (admin model)
│   ├── User.js (user model)
│   └── ...
└── scripts/
    └── createTestAdmin.js (create test admin)

client/src/
├── pages/admin/
│   ├── AdminLogin.jsx (login page)
│   └── AdminDashboard.jsx (dashboard page)
├── components/admin/
│   └── AdminLayout.jsx (admin layout)
└── config/
    └── api.js (API configuration)
```

## Support
If you're still having issues:
1. Check the browser console for specific error messages
2. Check the server console for error logs
3. Verify all steps in this guide
4. Make sure both frontend and backend are running 