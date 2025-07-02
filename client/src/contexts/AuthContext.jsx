import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Try to get admin info from localStorage (or fetch from API if needed)
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  // Stub for updateProfile (should call API and update localStorage)
  const updateProfile = (profile) => {
    setAdmin(profile);
    localStorage.setItem('admin', JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider value={{ admin, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 