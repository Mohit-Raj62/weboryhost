import React from 'react';
import AdminDashboard from './admin/AdminDashboard';
import ModeratorDashboard from './moderator/ModeratorDashboard';
import EditorDashboard from './editor/EditorDashboard';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  if (role === 'admin') return <AdminDashboard />;
  if (role === 'moderator') return <ModeratorDashboard />;
  if (role === 'editor') return <EditorDashboard />;
  return <div>Unauthorized</div>;
};

export default Dashboard; 