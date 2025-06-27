import React, { useState } from 'react';
import axios from 'axios';

const Symptom = () => {
  const [symptoms, setSymptoms] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/suggest?symptoms=${symptoms}`);
      setSuggestions(res.data);
    } catch (err) {
      setError('Failed to get suggestions');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Symptom to Medicine Suggestion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter symptoms (e.g., fever, headache)"
          required
        />
        <button type="submit">Suggest</button>
      </form>
      <h3>Suggestions</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {suggestions.map(medicine => (
          <div key={medicine._id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={medicine.image} alt={medicine.name} style={{ width: '100%' }} />
            <h3>{medicine.name}</h3>
            <p>${medicine.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Symptom;