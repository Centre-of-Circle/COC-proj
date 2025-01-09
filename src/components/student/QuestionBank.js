import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/questions', {
          headers: { Authorization: token },
        });
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="skeleton-loader">Loading questions...</div>;
  }

  return (
    <div>
      <h2>Question Bank</h2>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            <strong>{q.stem}</strong>
            <ul>
              <li>A: {q.options.A}</li>
              <li>B: {q.options.B}</li>
              <li>C: {q.options.C}</li>
              <li>D: {q.options.D}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionBank;
