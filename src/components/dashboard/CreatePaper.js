import React, { useState, useEffect } from 'react';
import './CreatePaper.css';
import axios from 'axios'; // For API requests

const CreatePaper = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPaper, setCurrentPaper] = useState([]);
  const [previousPapers, setPreviousPapers] = useState([]);
  const [tagFilter, setTagFilter] = useState('');
  const [paperName, setPaperName] = useState('');
  const [showPreviousPapers, setShowPreviousPapers] = useState(false);

  // Fetch questions and previous papers from the database
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('/api/questions'); // Fetch questions from the backend
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    };

    const fetchPreviousPapers = async () => {
      const response = await axios.get('/api/papers'); // Fetch previous papers from the backend
      setPreviousPapers(response.data);
    };

    fetchQuestions();
    fetchPreviousPapers();
  }, []);

  // Filter questions by tags
  const handleFilterChange = (e) => {
    const tag = e.target.value;
    setTagFilter(tag);
    if (tag) {
      setFilteredQuestions(questions.filter((q) => q.tags.includes(tag)));
    } else {
      setFilteredQuestions(questions);
    }
  };

  // Add question to the current paper
  const handleAddQuestion = (question) => {
    if (!currentPaper.some((q) => q.id === question.id)) {
      setCurrentPaper([...currentPaper, question]);
    }
  };

  // Remove question from the current paper
  const handleRemoveQuestion = (id) => {
    setCurrentPaper(currentPaper.filter((q) => q.id !== id));
  };

  // Save the current paper
  const handleSavePaper = async () => {
    if (!paperName) {
      alert('Please set a name for the paper.');
      return;
    }

    if (currentPaper.length === 0) {
      alert('Please add at least one question to the paper.');
      return;
    }

    const newPaper = {
      name: paperName,
      questions: currentPaper.map((q) => q.id),
    };

    try {
      await axios.post('/api/papers', newPaper); // Save paper to the backend
      alert('Paper saved successfully!');
      setPaperName('');
      setCurrentPaper([]);
    } catch (error) {
      console.error('Error saving paper:', error);
      alert('Failed to save paper.');
    }
  };

  return (
    <div className="create-paper-container">
      <h2>Create Paper</h2>

      {/* Paper Name Input */}
      <div className="paper-name-section">
        <label htmlFor="paperName">Paper Name:</label>
        <input
          type="text"
          id="paperName"
          value={paperName}
          onChange={(e) => setPaperName(e.target.value)}
          placeholder="Enter paper name"
        />
      </div>
<br></br>
      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="tagFilter">Filter by Tag:</label>
        <input
          type="text"
          id="tagFilter"
          value={tagFilter}
          onChange={handleFilterChange}
          placeholder="Enter tag (e.g., React)"
        />
      </div>

      {/* Question List */}
      <div className="question-list">
        <h3>Available Questions</h3>
        {filteredQuestions.map((question) => (
          <div key={question.id} className="question-item">
            <p>{question.text}</p>
            <button onClick={() => handleAddQuestion(question)}>Add</button>
          </div>
        ))}
      </div>

      {/* Current Paper Section */}
      <div className="current-paper">
        <h3>Current Paper</h3>
        {currentPaper.length > 0 ? (
          currentPaper.map((question) => (
            <div key={question.id} className="question-item">
              <p>{question.text}</p>
              <button onClick={() => handleRemoveQuestion(question.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No questions added yet.</p>
        )}
      </div>

      {/* Save Paper Button */}
      <button onClick={handleSavePaper} className="save-paper-btn">
        Save Paper
      </button>

      {/* Previous Papers Section */}
      <div className="previous-papers">
        <h3 onClick={() => setShowPreviousPapers(!showPreviousPapers)}>
          {showPreviousPapers ? 'Hide' : 'Show'} Previous Papers
        </h3>
        {showPreviousPapers && (
          <ul>
            {previousPapers.map((paper) => (
              <li key={paper.id}>
                <strong>{paper.name}</strong>
                <ul>
                  {paper.questions.map((q, index) => (
                    <li key={index}>{q}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreatePaper;
