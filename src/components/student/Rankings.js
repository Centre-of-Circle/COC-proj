import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rankings');
        setRankings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRankings();
  }, []);

  if (loading) {
    return <div>Loading rankings...</div>;
  }

  return (
    <div>
      <h2>Rankings</h2>
      <ol>
        {rankings.map((user, index) => (
          <li key={user._id}>
            {index + 1}. {user.name} - {user.score} points
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Rankings;
