import React, { useState } from 'react';
import AddQuestion from './dashboard/AddQuestion';
import CreatePaper from './dashboard/CreatePaper';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('addQuestion');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('addQuestion')}>Add Question</button>
        <button onClick={() => setActiveTab('createPaper')}>Create Paper</button>
      </nav>

      <div>
        {activeTab === 'addQuestion' && <AddQuestion />}
        {activeTab === 'createPaper' && <CreatePaper />}
      </div>
    </div>
  );
};

export default Dashboard;