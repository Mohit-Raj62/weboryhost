import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModeratorDashboard = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [flaggedComments, setFlaggedComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace with your API endpoints
        const postsRes = await axios.get('/api/moderator/pending-posts');
        const commentsRes = await axios.get('/api/moderator/flagged-comments');
        setPendingPosts(postsRes.data || []);
        setFlaggedComments(commentsRes.data || []);
        setError('');
      } catch (err) {
        setError('Failed to fetch moderation data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApprovePost = (id) => {/* Implement approve logic */};
  const handleRejectPost = (id) => {/* Implement reject logic */};
  const handleApproveComment = (id) => {/* Implement approve logic */};
  const handleRejectComment = (id) => {/* Implement reject logic */};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Pending Posts</h2>
      {pendingPosts.length === 0 ? <p>No pending posts.</p> : pendingPosts.map(post => (
        <div key={post.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleApprovePost(post.id)}>Approve</button>
          <button onClick={() => handleRejectPost(post.id)}>Reject</button>
        </div>
      ))}
      <h2>Flagged Comments</h2>
      {flaggedComments.length === 0 ? <p>No flagged comments.</p> : flaggedComments.map(comment => (
        <div key={comment.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <p>{comment.text}</p>
          <button onClick={() => handleApproveComment(comment.id)}>Approve</button>
          <button onClick={() => handleRejectComment(comment.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default ModeratorDashboard; 