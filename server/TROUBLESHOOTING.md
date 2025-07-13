# Server Troubleshooting Guide

## 🚨 Server Keeps Crashing? Here's How to Fix It

### Quick Fixes

1. **Restart the server with monitoring:**
   ```bash
   npm run auto-restart
   ```

2. **Check server health:**
   ```bash
   npm run monitor:health
   ```

3. **Test all endpoints:**
   ```bash
   npm run monitor:test
   ```

### Common Issues and Solutions

#### 1. Database Connection Issues

**Symptoms:**

- Server starts but crashes when making requests
- "MongoDB connection error" in logs
- Database shows as "disconnected" in health check

**Solutions:**

```bash
# Check if MongoDB URI is correct
echo $MONGODB_URI

# Test database connection
node test-db-connection.js

# Restart with retry logic (already implemented)
npm run dev
```

#### 2. Memory Issues

**Symptoms:**

- Server becomes slow over time
- "High memory usage detected" warnings
- Server crashes with memory errors

**Solutions:**

```bash
# Check memory usage
npm run monitor:health

# Restart server to clear memory
npm run restart

# Monitor memory usage
npm run monitor
```

#### 3. Port Conflicts

**Symptoms:**

- "EADDRINUSE" error
- Server won't start
- Port 5002 is already in use

**Solutions:**

```bash
# Kill processes using port 5002
npm run kill-port

# Check what's using the port
npm run check-port

# Restart server
npm run dev
```

#### 4. Environment Variables Missing

**Symptoms:**

- "Missing required environment variables" error
- Server exits immediately

**Solutions:**

```bash
# Check if .env file exists
ls -la .env

# Create .env file if missing
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_jwt_secret" >> .env
echo "NODE_ENV=development" >> .env
```

#### 5. Dependencies Issues

**Symptoms:**

- "Cannot find module" errors
- Server won't start
- Missing packages

**Solutions:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update
```

### Advanced Troubleshooting

#### 1. Check Server Logs

```bash
# View real-time logs
npm run dev

# Check monitor logs
cat server-monitor.log

# Check for errors
grep -i error server-monitor.log
```

#### 2. Database Health Check

```bash
# Test database connection
node test-db-connection.js

# Check database collections
node simple-db-test.js

# Test specific models
node test-support-ticket-model.js
```

#### 3. Network and CORS Issues

**Symptoms:**

- Frontend can't connect to backend
- CORS errors in browser console
- API requests fail

**Solutions:**

```bash
# Check if server is accessible
curl http://localhost:5002/api/health

# Test CORS
curl -H "Origin: http://localhost:3001" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:5002/api/auth/login
```

#### 4. Rate Limiting Issues

**Symptoms:**

- "Too many requests" errors
- API calls failing after multiple requests

**Solutions:**

```bash
# Check rate limit settings in server.js
# Current limits:
# - 120 requests per 10 minutes per IP
# - 5 login attempts per minute per IP

# Reset rate limits by restarting server
npm run restart
```

### Monitoring and Prevention

#### 1. Use Auto-Restart Monitoring

```bash
# Start server with monitoring
npm run auto-restart

# This will:
# - Check server health every 30 seconds
# - Restart server if it's down
# - Log all activities
```

#### 2. Set Up Health Checks

```bash
# Test server health
curl http://localhost:5002/api/health

# Expected response:
{
  "status": "ok",
  "message": "Server is running",
  "db": "connected",
  "uptime": 123456,
  "requestCount": 42,
  "errorCount": 0,
  "memoryUsage": {
    "rss": "45MB",
    "heapUsed": "25MB",
    "heapTotal": "35MB"
  }
}
```

#### 3. Monitor Memory Usage

The server now includes automatic memory monitoring:

- Checks memory every 5 minutes
- Warns if heap usage > 500MB
- Logs memory usage to console

#### 4. Check Error Patterns

```bash
# Look for common error patterns
grep -i "unhandled" server-monitor.log
grep -i "timeout" server-monitor.log
grep -i "connection" server-monitor.log
```

### Emergency Procedures

#### 1. Server Won't Start

```bash
# 1. Kill all Node processes
taskkill /f /im node.exe

# 2. Clear port
npm run kill-port

# 3. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 4. Start fresh
npm run dev
```

#### 2. Database Connection Lost

```bash
# 1. Check MongoDB connection
node test-db-connection.js

# 2. Verify environment variables
echo $MONGODB_URI

# 3. Restart with retry logic
npm run dev
```

#### 3. Memory Leak

```bash
# 1. Check memory usage
npm run monitor:health

# 2. Restart server
npm run restart

# 3. Monitor for leaks
npm run monitor
```

### Prevention Tips

1. **Always use the monitoring script:**
   ```bash
   npm run auto-restart
   ```

2. **Check server health regularly:**
   ```bash
   npm run monitor:health
   ```

3. **Keep dependencies updated:**
   ```bash
   npm update
   ```

4. **Monitor logs for patterns:**

   - High error counts
   - Memory usage spikes
   - Database disconnections

5. **Use the startup script:**
   ```bash
   start-server.bat
   ```

### Getting Help

If the server keeps crashing despite these fixes:

1. **Check the logs:**
   ```bash
   cat server-monitor.log
   ```

2. **Run diagnostics:**
   ```bash
   npm run diagnose
   ```

3. **Test individual components:**
   ```bash
   npm run test-server
   node test-db-connection.js
   ```

4. **Check system resources:**

   - CPU usage
   - Memory usage
   - Disk space
   - Network connectivity

### Quick Commands Reference

```bash
# Start server with monitoring
npm run auto-restart

# Check server health
npm run monitor:health

# Test all endpoints
npm run monitor:test

# Restart server
npm run restart

# Kill processes on port
npm run kill-port

# Run diagnostics
npm run diagnose

# Test database
node test-db-connection.js
```

Remember: The enhanced server now includes automatic retry logic, better error handling, and monitoring. Most crashes should be automatically resolved! 