import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModelTest from './ModelTest';
import Ranking from './Rankings';
import QuestionBank from './QuestionBank';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('mt');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to access the dashboard.');
      navigate('/'); // Redirect to login page
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>

      <nav className="dashboard-nav">
        <button
          className={`nav-button ${activeTab === 'mt' ? 'active' : ''}`}
          onClick={() => setActiveTab('mt')}
        >
          Model Test
        </button>
        <button
          className={`nav-button ${activeTab === 'qb' ? 'active' : ''}`}
          onClick={() => setActiveTab('qb')}
        >
          Question Bank
        </button>
        <button
          className={`nav-button ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => setActiveTab('ranking')}
        >
          Ranking
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'mt' && <ModelTest />}
        {activeTab === 'qb' && <QuestionBank />}
        {activeTab === 'ranking' && <Ranking />}
      </div>
    </div>
  );
};

export default StudentDashboard;
