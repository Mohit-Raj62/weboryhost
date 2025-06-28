import React, { useState, useEffect } from 'react';
import { API_BASE_URL, checkServerConnection } from '../config/api';

const ServerTest = () => {
  const [status, setStatus] = useState('testing');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testServerConnection();
  }, []);

  const testServerConnection = async () => {
    setStatus('testing');
    setError(null);
    setResult(null);

    try {
      console.log('=== Server Test Debug ===');
      console.log('API_BASE_URL:', API_BASE_URL);
      console.log('import.meta.env.DEV:', import.meta.env.DEV);
      console.log('import.meta.env.MODE:', import.meta.env.MODE);
      console.log('import.meta.env.VITE_API_URL:', import.meta.env.VITE_API_URL);
      
      // Test 1: Direct fetch
      const healthUrl = `${API_BASE_URL}/api/health`;
      console.log('Health check URL:', healthUrl);
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Health check data:', data);
      
      setResult(data);
      setStatus('success');
    } catch (err) {
      console.error('Server test error:', err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Server Connection Test</h3>
      
      <div className="mb-4">
        <strong>API Base URL:</strong> {API_BASE_URL}
      </div>
      
      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>
      
      {status === 'testing' && (
        <div className="text-blue-600">Testing server connection...</div>
      )}
      
      {status === 'success' && result && (
        <div className="text-green-600">
          <div>✅ Server is connected!</div>
          <pre className="mt-2 bg-white p-2 rounded text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      {status === 'error' && error && (
        <div className="text-red-600">
          <div>❌ Connection failed: {error}</div>
        </div>
      )}
      
      <button 
        onClick={testServerConnection}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Again
      </button>
    </div>
  );
};

export default ServerTest; 