import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditorDashboard = () => {
  const [drafts, setDrafts] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const [published, setPublished] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace with your API endpoints
        const draftsRes = await axios.get('/api/editor/drafts');
        const scheduledRes = await axios.get('/api/editor/scheduled');
        const publishedRes = await axios.get('/api/editor/published');
        setDrafts(draftsRes.data || []);
        setScheduled(scheduledRes.data || []);
        setPublished(publishedRes.data || []);
        setError('');
      } catch (err) {
        setError('Failed to fetch editor data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Drafts</h2>
      {drafts.length === 0 ? <p>No drafts.</p> : drafts.map(post => (
        <div key={post.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <h3>{post.title}</h3>
          <button>Edit</button>
          <button>Publish</button>
        </div>
      ))}
      <h2>Scheduled</h2>
      {scheduled.length === 0 ? <p>No scheduled posts.</p> : scheduled.map(post => (
        <div key={post.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <h3>{post.title}</h3>
          <p>Scheduled for: {post.scheduledDate}</p>
          <button>Edit</button>
        </div>
      ))}
      <h2>Published</h2>
      {published.length === 0 ? <p>No published posts.</p> : published.map(post => (
        <div key={post.id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <h3>{post.title}</h3>
          <button>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default EditorDashboard; 