import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import queryClient from '../main'
import { QueryClient } from '@tanstack/react-query';

const UrlForm = () => {

    // INPUT change
    const [longUrl, setLongUrl] = useState("https://www.google.com")
    const [customSlug, setCustomSlug] = useState("")
    const [shortUrl, setShortUrl] = useState()
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    // Get auth state from Redux
    const { isAuthenticated } = useSelector(state => state.auth);

    // SUBMIT
    const handleSubmit = async() => {
        setLoading(true);
        setError("");
         try {
            // If user is authenticated and has provided a custom slug
            const payload = { longUrl };
            if (isAuthenticated && customSlug) {
                payload.slug = customSlug;
            }
            
              const shortUrl = await createShortUrl(payload);
              setShortUrl(shortUrl);
              queryClient.invalidateQueries({ queryKey: ['userUrls'] });
          } catch (err) {
              setError(err.message || "Failed to shorten URL");
          } finally {
              setLoading(false);
          }
    }

    // COPY
    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

  return (
        <div className="space-y-4"> 
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your URL
            </label>
            <input
              type="url"
              id="url"
              value={longUrl}
              onInput={(event) => setLongUrl(event.target.value)}
              placeholder="https://example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

  
          
          {/* Custom slug input - only shown when authenticated */}
          {isAuthenticated && (
            <div>
              <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
                Custom URL (Optional)
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="customSlug"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="my-custom-URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {shortUrl && ( 
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={shortUrl}
                  className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                    copied 
                      ? "bg-green-500 text-white hover:bg-green-600" 
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
    )
}

export default UrlForm