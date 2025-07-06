# Troubleshooting: "No Support Tickets Found" Issue

## Step 1: Check Database Connection

Run this command to verify database connection and add sample data:

```bash
node debug-tickets.js
```

This will:
- Connect to MongoDB
- Check if tickets exist
- Create sample tickets if none exist
- Create admin account if needed

## Step 2: Start the Server

Make sure your server is running:

```bash
node server.js
```

You should see:
```
Connected to MongoDB
Database: webory
Host: cluster0.em7qp.mongodb.net
🚀 Server is running on port 5002
```

## Step 3: Test API Endpoints

Run this to test if the API is working:

```bash
node test-dashboard.js
```

This will test:
- Server health
- Admin login
- Ticket fetching
- Statistics

## Step 4: Check Admin Authentication

The dashboard requires admin login. Make sure you're logged in:

1. Go to: `http://localhost:5173/admin/login`
2. Login with:
   - Email: `admin@webory.com`
   - Password: `admin123`

## Step 5: Check Browser Console

Open browser developer tools (F12) and check:

1. **Console tab** for error messages
2. **Network tab** for API calls
3. **Application tab** for localStorage

Look for:
- API call failures
- Authentication errors
- Network errors

## Step 6: Manual API Testing

Test the API directly in browser:

1. **Health check**: `http://localhost:5002/api/health`
2. **Admin login**: `http://localhost:5002/api/admin/login`
3. **Tickets**: `http://localhost:5002/api/support-tickets/admin/all`

## Common Issues and Solutions

### Issue 1: Server not running
**Solution**: Start server with `node server.js`

### Issue 2: No admin token
**Solution**: Login as admin at `/admin/login`

### Issue 3: Database connection failed
**Solution**: Check MongoDB connection string

### Issue 4: API returning 404
**Solution**: Check if routes are properly configured

### Issue 5: CORS errors
**Solution**: Check server CORS configuration

## Debug Commands

```bash
# Check database
node debug-tickets.js

# Test API
node test-dashboard.js

# Setup complete system
node setup-support-system.js

# Start server
node server.js
```

## Expected Results

After running the setup:

1. **Database**: Should have tickets stored
2. **API**: Should return ticket data
3. **Dashboard**: Should show tickets with status
4. **Statistics**: Should show ticket counts

## If Still Not Working

1. Check server logs for errors
2. Verify MongoDB connection
3. Test API endpoints manually
4. Check browser console for errors
5. Ensure admin authentication is working 