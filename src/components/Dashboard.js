import React, { useState } from 'react';
import AddQuestion from './dashboard/AddQuestion';
import CreatePaper from './dashboard/CreatePaper';
import Home from './dashboard/Home';
import Profile from './dashboard/Profile';
import './Dashboard.css';
import './dashboard/CreatePaper.css';
import './AddQuestion.css'
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <nav className="dashboard-nav">
        <button
          className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`nav-button ${activeTab === 'addQuestion' ? 'active' : ''}`}
          onClick={() => setActiveTab('addQuestion')}
        >
          Add Question
        </button>
        <button
          className={`nav-button ${activeTab === 'createPaper' ? 'active' : ''}`}
          onClick={() => setActiveTab('createPaper')}
        >
          Create Paper
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'home' && <Home />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'addQuestion' && <AddQuestion />}
        {activeTab === 'createPaper' && <CreatePaper />}
      </div>
    </div>
  );
};

export default Dashboard;
