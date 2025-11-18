import React, { useState, useEffect } from 'react';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="dashboard">
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
      
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome to Recipe Hub</h1>
          <p>Hello {user?.name}! Ready to discover amazing recipes?</p>
        </div>
        
        <div className="dashboard-content">
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ marginBottom: '16px', color: '#1a202c', fontSize: '20px', fontWeight: '600' }}>
              Welcome to your dashboard
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
              Manage your recipes and discover new dishes.
            </p>
            <div style={{ 
              padding: '16px', 
              background: '#f8fafc', 
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ color: '#374151', marginBottom: '12px', fontSize: '16px', fontWeight: '500' }}>Account</h3>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                <p style={{ marginBottom: '4px' }}><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;