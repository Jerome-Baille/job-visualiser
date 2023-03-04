/**
 * PrivateRoutes component to check if the user is authenticated and if the token is valid
 */
import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Service to get the token
import { getTokenAndUserId } from '../../services/authService';

// LoadingSpinner component
import LoadingSpinner from '../LoadingSpinner';

// Base API URL
import { API_BASE_URL } from '../../config/apiConfig';

/**
 * PrivateRoutes component
 * @returns {JSX.Element}
 */
const PrivateRoutes = () => {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to track if component is loading
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Effect hook to check token validity and authentication status
   */
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { token, expires } = await getTokenAndUserId();
        if (!token || new Date(expires) < new Date()) {
          setIsAuthenticated(false);
        } else {
          const response = await fetch(`${API_BASE_URL}/auth/check`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setIsAuthenticated(response.status === 200);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  return (
    isLoading
      ? <LoadingSpinner />
      : (isAuthenticated ? <Outlet /> : <Navigate to="/auth" />)
  );
};

export default PrivateRoutes;