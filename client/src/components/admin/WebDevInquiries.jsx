import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/api';

const WebDevInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/webdev-inquiries`);
        const data = await res.json();
        if (data.success) {
          setInquiries(data.inquiries);
        } else {
          setError('Failed to fetch inquiries');
        }
      } catch (err) {
        setError('Failed to fetch inquiries');
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Web Development Inquiries</h2>
      {inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Selected Plan</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq._id}>
                  <td className="px-4 py-2 border">{inq.name}</td>
                  <td className="px-4 py-2 border">{inq.email}</td>
                  <td className="px-4 py-2 border">{inq.phone}</td>
                  <td className="px-4 py-2 border">{inq.selectedPlan || '-'}</td>
                  <td className="px-4 py-2 border">{inq.message}</td>
                  <td className="px-4 py-2 border">{new Date(inq.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WebDevInquiries; 