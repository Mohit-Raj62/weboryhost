# Quick Deployment Guide - Render (Windows)

## 🚀 Stop Local Server & Deploy to Render

### Current Issue
You're getting "Unable to connect to server. Please check if the server is running on port 5002" because the local server isn't running.

### Solution: Deploy to Render

## Step 1: Prepare Your Code

1. **Commit your changes to Git:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

## Step 2: Deploy Backend to Render

1. **Go to Render Dashboard:**
   - Visit: https://render.com
   - Sign up/Login with GitHub

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Backend Service:**
   - **Name**: `webory-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

4. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory
   JWT_SECRET=webory_admin_secret_key_2024_very_secure_and_long
   PORT=10000
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

## Step 3: Deploy Frontend to Netlify

1. **Go to Netlify:**
   - Visit: https://netlify.com
   - Sign up/Login with GitHub

2. **Create New Site:**
   - Click "New site from Git"
   - Connect your GitHub repository

3. **Configure Build Settings:**
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Add Environment Variable:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL=https://your-backend-service-name.onrender.com`
   - Replace `your-backend-service-name` with your actual Render service name

5. **Deploy:**
   - Click "Deploy site"
   - Wait for deployment

## Step 4: Test Your Deployment

1. **Test Backend:**
   - Visit: `https://your-backend-service-name.onrender.com/api/health`
   - Should show: `{"status":"ok","message":"Server is running"}`

2. **Test Frontend:**
   - Visit your Netlify URL
   - Try logging into admin dashboard
   - Check if API calls work

## Troubleshooting

### If Backend Deployment Fails:
1. Check Render logs for errors
2. Verify MongoDB connection string
3. Ensure all environment variables are set

### If Frontend Can't Connect to Backend:
1. Check if backend URL is correct in environment variables
2. Verify CORS settings (should be fine as configured)
3. Test backend health endpoint directly

### Common Issues:
- **Build failures**: Check if all dependencies are in package.json
- **Database connection**: Ensure MongoDB Atlas allows Render IPs
- **CORS errors**: Backend is already configured to allow all origins

## Quick Commands

```bash
# Stop local server (if running)
# Press Ctrl+C in the terminal where server is running

# Check if server is running
netstat -an | findstr :5002

# Test backend locally (if needed)
cd server
npm start

# Test frontend locally (if needed)
cd client
npm run dev
```

## Environment Variables Summary

### Backend (Render):
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory
JWT_SECRET=webory_admin_secret_key_2024_very_secure_and_long
PORT=10000
```

### Frontend (Netlify):
```
VITE_API_URL=https://your-backend-service-name.onrender.com
```

## Benefits of Render Deployment

✅ **No more local server issues**  
✅ **Always available online**  
✅ **Automatic SSL certificates**  
✅ **Free tier available**  
✅ **Easy scaling**  
✅ **Built-in monitoring**

## Next Steps

After successful deployment:
1. Set up custom domains (optional)
2. Configure monitoring alerts
3. Set up CI/CD for automatic deployments
4. Monitor performance and logs

## Support

If you encounter issues:
1. Check Render logs in dashboard
2. Test endpoints with Postman
3. Verify environment variables
4. Check browser console for frontend errors

---

**🎉 Your Webory application will be live and accessible from anywhere!** 