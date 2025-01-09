import React, { useState } from 'react';
import ModelTest from './ModelTest'
import Ranking from './Rankings'
import QuestionBank from './QuestionBank'
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('mt');

    return (
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>
    
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
