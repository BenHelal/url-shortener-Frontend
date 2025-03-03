import React from 'react';  // Add this line at the top
import { QRCodeSVG } from 'qrcode.react';

const UrlResult = ({ shortUrl }) => {
  if (!shortUrl) {
    return <p className="text-red-500">No short URL provided.</p>;
  }

  return (
    <div className="mt-4 text-center p-4 bg-white rounded shadow">
      <p className="text-lg text-gray-800">
        Short URL:
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-blue-500 underline"
        >
          {shortUrl}
        </a>
      </p>

      <button
  onClick={async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert('URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  }}
  className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
>
  Copy
</button>

      <div className="mt-4">
        <QRCodeSVG value={shortUrl} size={128} className="mx-auto" />
        <p className="mt-2 text-sm text-gray-500">
          Scan QR code to open on mobile
        </p>
      </div>
    </div>
  );
};
     

    

export default UrlResult;
