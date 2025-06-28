import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import ErrorBoundary from '../../components/ErrorBoundary';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/api/admin/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setComments(response.data || []);
    } catch (err) {
      console.error('Fetch comments error:', err);
      if (err.response?.status === 401) {
        setError('Please log in to access comment management');
      } else if (err.response?.status === 404) {
        setError('Comments endpoint not found. Please check server configuration.');
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to fetch comments');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (commentId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.put(
        `${API_BASE_URL}/api/admin/comments/${commentId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Refresh the list
      fetchComments();
    } catch (err) {
      console.error('Update comment status error:', err);
      setError(err.response?.data?.error || 'Failed to update comment status');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.delete(`${API_BASE_URL}/api/admin/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Refresh the list
      fetchComments();
    } catch (err) {
      console.error('Delete comment error:', err);
      setError(err.response?.data?.error || 'Failed to delete comment');
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="ml-2 text-gray-600">Loading comments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <button
            onClick={fetchComments}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Comment Management</h2>
        <button
          onClick={fetchComments}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Refresh
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No comments found
                </td>
              </tr>
            ) : (
              comments.map((comment) => (
                <tr key={comment._id || comment.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">{comment.content}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {comment.author?.name || comment.author?.email || 'Unknown'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {comment.post?.title || 'Unknown Post'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      comment.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {comment.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleStatusChange(comment._id || comment.id, comment.status === 'approved' ? 'pending' : 'approved')}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      {comment.status === 'approved' ? 'Unapprove' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id || comment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Wrap with Error Boundary
const AdminCommentsWithErrorBoundary = () => (
  <ErrorBoundary>
    <AdminComments />
  </ErrorBoundary>
);

export default AdminCommentsWithErrorBoundary; 