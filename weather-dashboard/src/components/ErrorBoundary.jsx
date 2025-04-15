import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
      setHasError(true);
      setError(error);
    };

    // This simulates componentDidCatch in class components
    const errorHandler = (event) => {
      if (event.error) {
        handleError(event.error, {
          componentStack: event.filename
        });
      }
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="bg-red-900/20 p-6 rounded-lg max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
        <p className="text-red-300 mb-4">{error?.message || 'Unknown error'}</p>
        <button
          onClick={() => {
            setHasError(false);
            setError(null);
          }}
          className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Return children directly without cloning
  return children;
};

export default ErrorBoundary;