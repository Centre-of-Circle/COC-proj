import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/questions', {
          headers: { Authorization: token },
        });
        setQuestions(res.data.slice(0, 10)); // Fetch first 10 questions
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    console.log('Submitted Answers:', answers);
    alert('Test submitted!');
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <h2>Model Test</h2>
      <p>Time Left: {timeLeft} seconds</p>
      {timeLeft === 0 ? (
        <div>Time's up! Please submit your test.</div>
      ) : (
        <div>
          <h3>{questions[currentIndex].stem}</h3>
          <ul>
            {['A', 'B', 'C', 'D'].map((opt) => (
              <li key={opt}>
                <button onClick={() => handleAnswer(questions[currentIndex]._id, opt)}>
                  {opt}: {questions[currentIndex].options[opt]}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}>
            Next
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default ModelTest;
