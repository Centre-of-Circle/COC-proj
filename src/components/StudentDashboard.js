import React, { useState } from 'react';
import QuestionBank from './student/QuestionBank';
import ModelTest from './student/ModelTest';
import Rankings from './student/Rankings';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('questionBank');

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('questionBank')}>Question Bank</button>
        <button onClick={() => setActiveTab('modelTest')}>Model Test</button>
        <button onClick={() => setActiveTab('rankings')}>Rankings</button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'questionBank' && <QuestionBank />}
        {activeTab === 'modelTest' && <ModelTest />}
        {activeTab === 'rankings' && <Rankings />}
      </div>
    </div>
  );
};

export default StudentDashboard;
