# Webory Deployment Guide - Render

## Overview
This guide will help you deploy the Webory application to Render, separating the backend and frontend deployments.

## Prerequisites
1. Render account (free tier available)
2. MongoDB Atlas account (for database)
3. GitHub repository with your code

## Backend Deployment (Server)

### Step 1: Prepare Backend for Render

1. **Environment Variables Setup**
   - Go to your Render dashboard
   - Create a new Web Service
   - Connect your GitHub repository
   - Set the following environment variables:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_secure_jwt_secret_key
     PORT=10000
     ```

2. **Build Settings**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server` (if your backend is in a subdirectory)

### Step 2: Deploy Backend

1. Connect your GitHub repository to Render
2. Select the repository
3. Configure the service as above
4. Deploy

Your backend will be available at: `https://your-service-name.onrender.com`

## Frontend Deployment (Client)

### Step 1: Update API Configuration

The frontend is already configured to use Render backend in production. The API configuration in `client/src/config/api.js` will automatically:
- Use `http://localhost:5002` in development
- Use `https://your-backend-service.onrender.com` in production

### Step 2: Deploy Frontend

You can deploy the frontend to:
- **Netlify** (recommended for React apps)
- **Vercel**
- **Render** (Static Site)

#### Option A: Netlify Deployment

1. **Build Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `client`

2. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-service.onrender.com
   ```

#### Option B: Render Static Site

1. Create a new Static Site in Render
2. Connect your GitHub repository
3. **Build Command**: `cd client && npm install && npm run build`
4. **Publish Directory**: `client/dist`

## Environment Variables

### Backend (Render Web Service)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/webory
JWT_SECRET=your_very_secure_jwt_secret_key_here
PORT=10000
```

### Frontend (Netlify/Render)
```
VITE_API_URL=https://your-backend-service.onrender.com
```

## Testing Deployment

1. **Backend Health Check**
   - Visit: `https://your-backend-service.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

2. **Frontend**
   - Visit your frontend URL
   - Try logging in to admin dashboard
   - Check if API calls work

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Backend is already configured to allow all origins
   - Check if your frontend URL is in the allowed origins

2. **Database Connection**
   - Ensure MongoDB Atlas IP whitelist includes Render's IPs
   - Check MONGODB_URI format

3. **Build Failures**
   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility

4. **Environment Variables**
   - Ensure all required variables are set in Render dashboard
   - Check for typos in variable names

### Debug Steps

1. **Check Render Logs**
   - Go to your service in Render dashboard
   - Check the "Logs" tab for errors

2. **Test API Endpoints**
   - Use Postman or curl to test backend endpoints
   - Example: `curl https://your-backend.onrender.com/api/health`

3. **Check Frontend Console**
   - Open browser developer tools
   - Check for network errors in Console tab

## Security Considerations

1. **JWT Secret**
   - Use a strong, random secret
   - Never commit secrets to Git

2. **MongoDB Security**
   - Use MongoDB Atlas with proper authentication
   - Whitelist only necessary IPs

3. **Environment Variables**
   - Keep sensitive data in environment variables
   - Never expose secrets in client-side code

## Cost Optimization

1. **Render Free Tier**
   - Backend: 750 hours/month
   - Static sites: Unlimited
   - Services sleep after 15 minutes of inactivity

2. **MongoDB Atlas**
   - Free tier: 512MB storage
   - Sufficient for development and small projects

## Monitoring

1. **Render Dashboard**
   - Monitor service uptime
   - Check response times
   - Review logs for errors

2. **MongoDB Atlas**
   - Monitor database performance
   - Check connection metrics

## Support

If you encounter issues:
1. Check Render documentation
2. Review application logs
3. Test endpoints individually
4. Verify environment variables

## Quick Commands

```bash
# Test backend locally
cd server && npm start

# Test frontend locally
cd client && npm run dev

# Build frontend for production
cd client && npm run build
```

## Next Steps

After successful deployment:
1. Set up custom domains (optional)
2. Configure SSL certificates (automatic on Render)
3. Set up monitoring and alerts
4. Implement CI/CD pipeline 