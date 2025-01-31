import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = ({ onSuccess }) => {
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/shorten`, {
        longUrl
      });
      onSuccess(response.data.shortUrl);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default UrlForm;
