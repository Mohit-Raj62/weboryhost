const { exec } = require('child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';

function findProcessUsingPort(port) {
  return new Promise((resolve, reject) => {
    const command = isWindows
      ? `netstat -ano | findstr :${port}`
      : `lsof -i :${port}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        if (error.code === 1) {
          // No process found using the port
          resolve(null);
        } else {
          reject(error);
        }
        return;
      }

      if (stderr) {
        reject(new Error(stderr));
        return;
      }

      // Parse the output to get the PID
      const lines = stdout.trim().split('\n');
      if (lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        const pid = isWindows
          ? lastLine.split(/\s+/).pop()
          : lastLine.split(/\s+/)[1];
        resolve(pid);
      } else {
        resolve(null);
      }
    });
  });
}

function killProcess(pid) {
  return new Promise((resolve, reject) => {
    const command = isWindows
      ? `taskkill /F /PID ${pid}`
      : `kill -9 ${pid}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

async function managePort(port) {
  try {
    console.log(`Checking port ${port}...`);
    const pid = await findProcessUsingPort(port);

    if (pid) {
      console.log(`Process ${pid} is using port ${port}`);
      const shouldKill = process.argv.includes('--kill');
      
      if (shouldKill) {
        console.log(`Attempting to kill process ${pid}...`);
        await killProcess(pid);
        console.log(`Process ${pid} killed successfully`);
      } else {
        console.log(`Port ${port} is in use. Use --kill to terminate the process.`);
      }
    } else {
      console.log(`Port ${port} is available`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Get port from command line arguments or use default
const port = process.argv[2] || 5001;
managePort(port); 