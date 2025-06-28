import React from 'react';
import ServerTest from '../components/ServerTest';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Server Connection Test</h1>
        
        <div className="grid gap-6">
          <ServerTest />
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Environment Information</h2>
            <div className="space-y-2">
              <div><strong>NODE_ENV:</strong> {import.meta.env.NODE_ENV}</div>
              <div><strong>DEV:</strong> {import.meta.env.DEV ? 'true' : 'false'}</div>
              <div><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Manual Test</h2>
            <p className="mb-4">Try opening this URL in a new tab:</p>
            <code className="bg-gray-100 p-2 rounded block mb-4">
              https://webory.onrender.com/api/health
            </code>
            <p>If you see a JSON response, the server is working. If you see an error, there's a server issue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 