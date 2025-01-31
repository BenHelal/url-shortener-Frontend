import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const UrlForm = ({ onSuccess }) => {
  const [longUrl, setLongUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://url-shortener-backend-6hyq.onrender.com";


  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    if (!longUrl.trim()) {
      setError("Please enter a valid URL");
      setLoading(false);
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/shorten`, {
        longUrl,
      });

      setShortUrl(response.data.shortUrl);
      onSuccess(response.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">URL Shortener</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter long URL"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Shorten"
              )}
            </button>
          </div>
        </form>

        {/* Show Error Message */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Show Shortened URL */}
        {shortUrl && (
          <div className="alert alert-success mt-3">
            <strong>Shortened URL:</strong>{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlForm;
