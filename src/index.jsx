import { useState } from 'react';
import React from 'react';
import UrlForm from './components/UrlForm';
import UrlResult from './components/UrlResult';

function App() {
  const [shortUrl, setShortUrl] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        URL Shortener
      </h1>
      <UrlForm onSuccess={setShortUrl} />
      {shortUrl && <UrlResult shortUrl={shortUrl} />}
    </div>
  );
}

export default App;
