import React, { useState } from 'react';

const FetchData = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (emailRegex.test(e.target.value)) {
      setError('');
    } else {
      setError('Invalid email address');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && email) {
      alert('Email is valid');
    } else {
      alert('Please enter a valid email');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Validate Email</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FetchData;


