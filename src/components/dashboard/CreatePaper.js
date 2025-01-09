import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePaper = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/questions', {
          headers: { Authorization: token },
          params: { tag },
        });
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, [tag]);

  const handleCreatePaper = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/papers',
        { title, questions: selectedQuestions },
        { headers: { Authorization: token } }
      );
      alert('Paper created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create paper');
    }
  };

  return (
    <div>
      <h2>Create Paper</h2>
      <input type="text" placeholder="Paper Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Filter by Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedQuestions([...selectedQuestions, q._id]);
                } else {
                  setSelectedQuestions(selectedQuestions.filter((id) => id !== q._id));
                }
              }}
            />
            {q.stem}
          </li>
        ))}
      </ul>
      <button onClick={handleCreatePaper}>Create Paper</button>
    </div>
  );
};

export default CreatePaper;
