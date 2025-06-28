import React, { useState } from 'react';
import axios from 'axios';

const TestAdmin = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message, type = 'info') => {
    setTestResults(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    addResult('🔍 Starting Admin Dashboard Tests...', 'info');

    // Test 1: Check if server is running
    try {
      addResult('1. Testing server connection...', 'info');
      const healthResponse = await axios.get('http://localhost:5002/api/health');
      addResult('✅ Server is running!', 'success');
    } catch (error) {
      addResult('❌ Server is not running. Please start server with: npm run dev', 'error');
      setLoading(false);
      return;
    }

    // Test 2: Check admin login endpoint
    try {
      addResult('2. Testing admin login endpoint...', 'info');
      await axios.post('http://localhost:5002/api/admin/login', {});
    } catch (error) {
      if (error.response?.status === 400) {
        addResult('✅ Admin login endpoint is working', 'success');
      } else {
        addResult(`❌ Admin login endpoint error: ${error.response?.status}`, 'error');
      }
    }

    // Test 3: Test with valid credentials
    try {
      addResult('3. Testing with admin credentials...', 'info');
      const loginResponse = await axios.post('http://localhost:5002/api/admin/login', {
        email: 'admin@webory.com',
        password: 'admin123'
      });
      
      if (loginResponse.data.token) {
        addResult('✅ Login successful! Admin account exists.', 'success');
        addResult(`Token received: ${loginResponse.data.token.substring(0, 20)}...`, 'info');
      } else {
        addResult('❌ Login failed - no token received', 'error');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        addResult('❌ Invalid credentials. Admin account may not exist.', 'error');
        addResult('💡 Run: npm run create-admin to create admin account', 'info');
      } else {
        addResult(`❌ Login error: ${error.response?.data?.error || error.message}`, 'error');
      }
    }

    // Test 4: Check dashboard access
    try {
      addResult('4. Testing dashboard access...', 'info');
      const loginResponse = await axios.post('http://localhost:5002/api/admin/login', {
        email: 'admin@webory.com',
        password: 'admin123'
      });
      
      if (loginResponse.data.token) {
        const dashboardResponse = await axios.get('http://localhost:5002/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${loginResponse.data.token}`
          }
        });
        addResult('✅ Dashboard access working!', 'success');
      }
    } catch (error) {
      addResult(`❌ Dashboard access error: ${error.response?.status}`, 'error');
    }

    addResult('🎉 Tests completed!', 'info');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard Test Tool</h1>
          
          <button
            onClick={runTests}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 mb-6"
          >
            {loading ? 'Running Tests...' : 'Run Tests'}
          </button>

          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                  result.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                  'bg-blue-50 border-blue-200 text-blue-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{result.message}</span>
                  <span className="text-sm opacity-75">{result.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {testResults.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Quick Fix Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Start server: <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code></li>
                <li>Create admin: <code className="bg-gray-200 px-2 py-1 rounded">npm run create-admin</code></li>
                <li>Access login: <a href="/admin/login" className="text-blue-600 hover:underline">http://localhost:5173/admin/login</a></li>
                <li>Use credentials: admin@webory.com / admin123</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAdmin; 