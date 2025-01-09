
import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [stem, setStem] = useState('');
  const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [tag, setTag] = useState('');

  const handleAddQuestion = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/questions',
        { stem, options, correctAnswer, tag },
        { headers: { Authorization: token } }
      );
      alert('Question added!');
    } catch (err) {
      console.error(err);
      alert('Failed to add question');
    }
  };

  return (
    <div className='q-section'>
      <h2>Add Question</h2>
      <input type="text" className='qinput' placeholder="Question Stem" value={stem} onChange={(e) => setStem(e.target.value)} />
      <br></br>
      <input type="text" className='qinput' placeholder="Option A" value={options.A} onChange={(e) => setOptions({ ...options, A: e.target.value })} />
      <br></br>
      <input type="text" className='qinput' placeholder="Option B" value={options.B} onChange={(e) => setOptions({ ...options, B: e.target.value })} />
      <br></br>
      <input type="text" className='qinput' placeholder="Option C" value={options.C} onChange={(e) => setOptions({ ...options, C: e.target.value })} />
      <br></br>
      <input type="text" className='qinput' placeholder="Option D" value={options.D} onChange={(e) => setOptions({ ...options, D: e.target.value })} />
      <br></br>
      <input type="text" className='qinput' placeholder="Correct Answer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
      <br></br>
      <input type="text" className='qinput' placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
      <br></br>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default AddQuestion;
