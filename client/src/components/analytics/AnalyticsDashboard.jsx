import React from "react";

export default function AnalyticsDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Analytics & Reporting</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Website Visits</div>
          <div className="text-2xl font-bold">12,340</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Active Projects</div>
          <div className="text-2xl font-bold">8</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-gray-500">Completed Tasks</div>
          <div className="text-2xl font-bold">154</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="font-bold mb-2">Website Traffic (Last 7 Days)</div>
          <svg width="100%" height="100" viewBox="0 0 300 100">
            <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="0,80 50,60 100,70 150,30 200,50 250,20 300,40" />
          </svg>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="font-bold mb-2">Project Performance</div>
          <svg width="100%" height="100" viewBox="0 0 300 100">
            <rect x="20" y="40" width="30" height="40" fill="#10b981" />
            <rect x="70" y="20" width="30" height="60" fill="#3b82f6" />
            <rect x="120" y="60" width="30" height="20" fill="#f59e42" />
            <rect x="170" y="10" width="30" height="70" fill="#ef4444" />
          </svg>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="font-bold mb-2">Download Reports</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Download PDF</button>
      </div>
    </div>
  );
} 