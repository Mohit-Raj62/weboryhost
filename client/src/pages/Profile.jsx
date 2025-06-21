import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Profile update states
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setProfileData({
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccessMessage('');
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setSuccessMessage('Profile updated successfully!');
        // Refresh user data
        await fetchUserData();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      if (response.ok) {
        setSuccessMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <style>{`
        .profile-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          color: white;
        }

        .profile-header {
          text-align: center;
          padding: 2rem 0;
        }

        .profile-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .user-info-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .user-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 2.5rem;
          color: white;
        }

        .user-name {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .user-email {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        .user-role {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .profile-container {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 2rem;
        }

        .profile-sidebar {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .profile-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .profile-nav li {
          margin-bottom: 0.5rem;
        }

        .profile-nav button {
          width: 100%;
          padding: 1rem;
          text-align: left;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .profile-nav button:hover,
        .profile-nav button.active {
          background: rgba(255, 255, 255, 0.1);
        }

        .profile-content {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
        }

        .profile-section {
          display: none;
        }

        .profile-section.active {
          display: block;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1rem;
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .save-button {
          display: inline-block;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .save-button:hover {
          transform: translateY(-2px);
        }

        .error-message {
          color: #ff4444;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          padding: 0.5rem;
          background: rgba(255, 68, 68, 0.1);
          border-radius: 4px;
        }

        .success-message {
          color: #00C851;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          padding: 0.5rem;
          background: rgba(0, 200, 81, 0.1);
          border-radius: 4px;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: white;
          font-size: 1.2rem;
        }

        .logout-button {
          display: inline-block;
          padding: 1rem 2rem;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
          margin-top: 1rem;
        }

        .logout-button:hover {
          transform: translateY(-2px);
          background: #ff0000;
        }

        @media (max-width: 768px) {
          .profile-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="user-info-card">
        <div className="user-avatar">
          {userData?.fullName?.charAt(0) || 'U'}
        </div>
        <h2 className="user-name">{userData?.fullName || 'User'}</h2>
        <p className="user-email">{userData?.email || 'user@example.com'}</p>
        <span className="user-role">Member</span>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <ul className="profile-nav">
            <li>
              <button 
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
              >
                Profile Information
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'security' ? 'active' : ''}
                onClick={() => setActiveTab('security')}
              >
                Security Settings
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'notifications' ? 'active' : ''}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
            </li>
          </ul>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="profile-content">
          <div className={`profile-section ${activeTab === 'profile' ? 'active' : ''}`}>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                  placeholder="John Doe" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  placeholder="john@example.com" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  placeholder="+1 234 567 890" 
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea 
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </div>

          <div className={`profile-section ${activeTab === 'security' ? 'active' : ''}`}>
            <h2>Security Settings</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
              <button type="submit" className="save-button">Update Password</button>
            </form>
          </div>

          <div className={`profile-section ${activeTab === 'notifications' ? 'active' : ''}`}>
            <h2>Notification Preferences</h2>
            <form>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> Email Notifications
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> SMS Notifications
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> Project Updates
                </label>
              </div>
              <button type="submit" className="save-button">Save Preferences</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 