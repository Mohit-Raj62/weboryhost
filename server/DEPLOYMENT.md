# Render Deployment Guide

## Issues Fixed:
1. ✅ Updated `package.json` to use `index.js` as main entry point
2. ✅ Fixed CORS configuration to allow Render domains
3. ✅ Removed problematic fetch calls that were causing startup issues
4. ✅ Created `render.yaml` for proper configuration
5. ✅ Fixed missing route imports
6. ✅ Added proper error handling and health check endpoint

## Steps to Deploy on Render:

### 1. Environment Variables
Set these in your Render dashboard:
- `MONGODB_URI`: Your MongoDB connection string (REQUIRED)
- `JWT_SECRET`: A secure JWT secret key (REQUIRED)
- `NODE_ENV`: Set to `production`
- `PORT`: Render will set this automatically (don't set manually)

### 2. Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: Set to `server` (if deploying from root repository)

### 3. Health Check
The server has a health check endpoint at `/health` that Render will use.

### 4. Common Issues & Solutions:

#### Issue: "Server blocked" or "CORS error"
**Solution**: 
- ✅ CORS configuration already fixed to allow Render domains
- Ensure your frontend URL is in the allowed origins list
- Check that `NODE_ENV` is set to `production`

#### Issue: "Module not found" or "Cannot find module"
**Solution**: 
- Ensure `package.json` has all dependencies listed
- Check that `npm install` runs successfully in build logs
- Verify all route files exist (authRoutes.js, admin.js, contactRoutes.js)

#### Issue: "MongoDB connection error"
**Solution**: 
- Verify `MONGODB_URI` is correctly set in environment variables
- Ensure MongoDB Atlas network access allows connections from anywhere (0.0.0.0/0)
- Check if MongoDB cluster is active and accessible

#### Issue: "Port already in use"
**Solution**: 
- Render automatically sets the PORT environment variable
- The server is configured to use `process.env.PORT || 5002`
- Don't manually set PORT in environment variables

#### Issue: "JWT_SECRET not set"
**Solution**:
- Set a secure JWT_SECRET in environment variables
- The server will use a default if not set, but this is not recommended for production

### 5. Testing Your Deployment:
Once deployed, test these endpoints:
- `https://your-app.onrender.com/health` - Health check
- `https://your-app.onrender.com/api/auth/login` - Auth routes
- `https://your-app.onrender.com/api/admin` - Admin routes
- `https://your-app.onrender.com/api/contact` - Contact routes

### 6. Frontend Configuration:
Update your frontend API base URL to point to your Render deployment:
```javascript
const API_BASE_URL = "https://your-app.onrender.com/api";
```

### 7. Database Setup:
Before deploying, ensure:
- MongoDB Atlas cluster is created and active
- Database user has proper permissions
- Network access allows connections from anywhere (0.0.0.0/0)
- Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database`

## Troubleshooting:
If you still have issues:
1. **Check Render logs** for specific error messages in the dashboard
2. **Test MongoDB connection** locally with the same connection string
3. **Verify all environment variables** are correctly set in Render dashboard
4. **Test the health endpoint** manually: `curl https://your-app.onrender.com/health`
5. **Check build logs** to ensure `npm install` completed successfully
6. **Verify route files exist** and are properly exported

## Quick Debug Commands:
```bash
# Test health endpoint
curl https://your-app.onrender.com/health

# Test auth endpoint
curl -X POST https://your-app.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'

# Check if server is responding
curl -I https://your-app.onrender.com/
```

## Important Notes:
- The server uses `index.js` as the main entry point (not `server.js`)
- CORS is configured to allow Render and Netlify domains
- Health check endpoint is at `/health`
- All API routes are prefixed with `/api`
- Static file serving is disabled in production (frontend is deployed separately) 