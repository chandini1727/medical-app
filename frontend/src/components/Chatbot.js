import React, { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');

  const remedies = {
    'fever': 'Rest, drink fluids, and take Paracetamol if needed. Consult a doctor if it persists.',
    'headache': 'Take a break, hydrate, and consider Ibuprofen. Seek medical advice if severe.',
    'cough': 'Use honey and warm water, and rest. See a doctor if it worsens.',
    'default': 'Please provide more details or consult a healthcare professional.'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return setError('Please enter a symptom');
    const response = remedies[message.toLowerCase()] || remedies['default'];
    setChatHistory([...chatHistory, { user: message, bot: response }]);
    setMessage('');
    setError('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>AI Chatbot</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'auto', marginBottom: '10px' }}>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p><strong>You:</strong> {chat.user}</p>
            <p><strong>Bot:</strong> {chat.bot}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter symptom (e.g., fever)"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
