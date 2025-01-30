import { useState } from 'react';
import axios from 'axios';

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/shorten', {
        longUrl
      });
      setShortUrl(response.data.shortUrl);
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
      
      {shortUrl && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-green-600">Short URL: 
            <a href={shortUrl} target="_blank" className="ml-2 underline">
              {shortUrl}
            </a>
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};