const axios = require("axios");
const fs = require("fs");
const path = require("path");

class ServerMonitor {
  constructor() {
    this.serverUrl = process.env.SERVER_URL || "http://localhost:5002";
    this.logFile = path.join(__dirname, "server-monitor.log");
    this.checkInterval = 30000; // 30 seconds
    this.maxRetries = 3;
    this.retryDelay = 5000; // 5 seconds
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(this.logFile, logMessage);
  }

  async checkServerHealth() {
    try {
      const response = await axios.get(`${this.serverUrl}/api/health`, {
        timeout: 10000,
      });

      const data = response.data;
      this.log(`✅ Server Health Check - Status: ${data.status}`);
      this.log(
        `📊 Database: ${data.db}, Uptime: ${Math.round(data.uptime / 1000)}s`
      );
      this.log(`📈 Requests: ${data.requestCount}, Errors: ${data.errorCount}`);
      this.log(`💾 Memory: ${data.memoryUsage.heapUsed}`);

      // Check for potential issues
      if (data.errorCount > 10) {
        this.log(`⚠️ High error count detected: ${data.errorCount}`);
      }

      if (data.db === "disconnected") {
        this.log(`❌ Database disconnected!`);
        return false;
      }

      return true;
    } catch (error) {
      this.log(`❌ Server health check failed: ${error.message}`);
      return false;
    }
  }

  async restartServer() {
    this.log("🔄 Attempting to restart server...");

    try {
      // Kill existing process
      const { exec } = require("child_process");
      exec("taskkill /f /im node.exe", (error) => {
        if (error) {
          this.log(`⚠️ Could not kill existing process: ${error.message}`);
        }
      });

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Start server
      const { spawn } = require("child_process");
      const serverProcess = spawn("npm", ["run", "dev"], {
        cwd: __dirname,
        stdio: "pipe",
      });

      serverProcess.stdout.on("data", (data) => {
        this.log(`📝 Server: ${data.toString().trim()}`);
      });

      serverProcess.stderr.on("data", (data) => {
        this.log(`❌ Server Error: ${data.toString().trim()}`);
      });

      serverProcess.on("close", (code) => {
        this.log(`🔄 Server process exited with code ${code}`);
      });

      this.log("✅ Server restart initiated");
      return true;
    } catch (error) {
      this.log(`❌ Failed to restart server: ${error.message}`);
      return false;
    }
  }

  async monitor() {
    this.log("🚀 Starting server monitor...");
    this.log(`📡 Monitoring server at: ${this.serverUrl}`);
    this.log(`⏰ Check interval: ${this.checkInterval / 1000}s`);

    let consecutiveFailures = 0;

    const checkLoop = async () => {
      const isHealthy = await this.checkServerHealth();

      if (!isHealthy) {
        consecutiveFailures++;
        this.log(
          `⚠️ Health check failed (${consecutiveFailures}/${this.maxRetries})`
        );

        if (consecutiveFailures >= this.maxRetries) {
          this.log("🚨 Server appears to be down, attempting restart...");
          await this.restartServer();
          consecutiveFailures = 0;
        }
      } else {
        if (consecutiveFailures > 0) {
          this.log("✅ Server recovered");
        }
        consecutiveFailures = 0;
      }

      // Schedule next check
      setTimeout(checkLoop, this.checkInterval);
    };

    // Start monitoring
    checkLoop();
  }

  async testEndpoints() {
    this.log("🧪 Testing server endpoints...");

    const endpoints = [
      { path: "/", name: "Root" },
      { path: "/api/health", name: "Health" },
      { path: "/api/test", name: "Test" },
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.serverUrl}${endpoint.path}`, {
          timeout: 5000,
        });
        this.log(`✅ ${endpoint.name} endpoint: ${response.status}`);
      } catch (error) {
        this.log(`❌ ${endpoint.name} endpoint failed: ${error.message}`);
      }
    }
  }
}

// CLI interface
const monitor = new ServerMonitor();

if (process.argv.includes("--test")) {
  monitor.testEndpoints().then(() => {
    process.exit(0);
  });
} else if (process.argv.includes("--health")) {
  monitor.checkServerHealth().then((healthy) => {
    process.exit(healthy ? 0 : 1);
  });
} else {
  monitor.monitor();
}

module.exports = ServerMonitor;
