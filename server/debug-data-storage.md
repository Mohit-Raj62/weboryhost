# Debugging Data Storage Issues

## Problem: Data is submitted but not stored in database

### Step 1: Test Basic Database Connection

Run this command to test if the database connection is working:

```bash
node simple-db-test.js
```

**Expected Output:**
```
✅ Connected to MongoDB
✅ Data saved successfully!
✅ Data read successfully!
```

**If this fails:** Database connection issue

### Step 2: Test SupportTicket Model

Run this command to test the specific model:

```bash
node test-support-ticket-model.js
```

**Expected Output:**
```
✅ Ticket saved successfully!
✅ Ticket found successfully!
```

**If this fails:** Model or schema issue

### Step 3: Check Server Database Connection

When you start the server with `node server.js`, you should see:

```
Connected to MongoDB
Database: webory
Host: cluster0.em7qp.mongodb.net
🚀 Server is running on port 5002
```

**If you don't see this:** Server database connection issue

### Step 4: Test API Endpoints

Run this command to test the API:

```bash
node test-ticket-creation.js
```

**Expected Output:**
```
✅ Ticket created via API!
✅ Ticket found in database!
```

### Step 5: Check Server Logs

When you submit data, check the server console for:

1. **Request logs:**
```
[2024-01-01T10:00:00.000Z] POST /api/support-tickets/create-public
```

2. **Database logs:**
```
Connected to MongoDB
```

3. **Error logs:**
```
Error creating ticket: [error details]
```

### Step 6: Manual API Testing

Test the API directly in browser or Postman:

**URL:** `http://localhost:5002/api/support-tickets/create-public`
**Method:** POST
**Body:**
```json
{
  "subject": "Test Ticket",
  "email": "test@example.com",
  "message": "Test message",
  "priority": "high"
}
```

**Expected Response:**
```json
{
  "message": "Support ticket created successfully",
  "ticket": {
    "_id": "...",
    "subject": "Test Ticket",
    "email": "test@example.com",
    "status": "open"
  }
}
```

### Step 7: Check Database Directly

You can check MongoDB Atlas dashboard:

1. Go to MongoDB Atlas
2. Navigate to your cluster
3. Click "Browse Collections"
4. Look for "webory" database
5. Check "supporttickets" collection

### Common Issues and Solutions

#### Issue 1: Database Connection Failed
**Symptoms:** Server shows "MongoDB connection error"
**Solution:** Check MongoDB connection string

#### Issue 2: Model Not Working
**Symptoms:** API returns 500 error
**Solution:** Check SupportTicket model schema

#### Issue 3: Data Not Saving
**Symptoms:** API returns success but no data in database
**Solution:** Check if server is using correct database

#### Issue 4: API Not Reaching Server
**Symptoms:** Network errors in browser
**Solution:** Check if server is running on port 5002

#### Issue 5: CORS Issues
**Symptoms:** Browser console shows CORS errors
**Solution:** Check server CORS configuration

### Debug Commands

```bash
# Test basic database
node simple-db-test.js

# Test SupportTicket model
node test-support-ticket-model.js

# Test API endpoints
node test-ticket-creation.js

# Start server
node server.js
```

### Quick Fix Steps

1. **Run database test:**
   ```bash
   node simple-db-test.js
   ```

2. **If database test passes, run model test:**
   ```bash
   node test-support-ticket-model.js
   ```

3. **If model test passes, start server:**
   ```bash
   node server.js
   ```

4. **Test API:**
   ```bash
   node test-ticket-creation.js
   ```

5. **Check browser console for errors**

### Expected Results

After running all tests successfully:

- ✅ Database connection working
- ✅ SupportTicket model working
- ✅ API endpoints working
- ✅ Data being stored in database
- ✅ Dashboard showing tickets

### If Still Not Working

1. Check MongoDB Atlas dashboard
2. Verify connection string
3. Check server logs for errors
4. Test API manually with Postman
5. Check browser network tab for failed requests 