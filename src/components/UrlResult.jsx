import QRCode from 'qrcode.react';

const UrlResult = ({ shortUrl }) => {
  return (
    <div className="mt-4 text-center">
      <QRCode 
        value={shortUrl} 
        size={128}
        className="mx-auto"
      />
      <p className="mt-2 text-sm text-gray-500">
        Scan QR code to open on mobile
      </p>
    </div>
  );
};