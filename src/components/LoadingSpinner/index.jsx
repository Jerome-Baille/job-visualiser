import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useLoadingSpinner } from '../../contexts/LoadingSpinnerContext';

const LoadingSpinner = () => {
  const { isLoading } = useLoadingSpinner();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="spinner-content">
        <Spinner animation="border" variant="primary" />
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingSpinner;
