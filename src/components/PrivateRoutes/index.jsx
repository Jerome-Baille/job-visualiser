/**
 * PrivateRoutes component to check if the user is authenticated and if the token is valid
 */
import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxiosInstance from '../../utils/axiosInstance';

// Service to get the token
import { getTokenAndUserId } from '../../utils/authUtils';

// Base API URL
import { API_BASE_URL } from '../../config/apiConfig';

/**
 * PrivateRoutes component
 * @returns {JSX.Element}
 */
const PrivateRoutes = () => {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  /**
   * Effect hook to check token validity and authentication status
   */
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { accessToken, refreshToken, accessTokenExpiresAt } = await getTokenAndUserId();
        if (!accessToken || new Date(accessTokenExpiresAt) < new Date()) {
          // Access token is expired, try to get a new one using the refresh token
          const response = await fetch(`${API_BASE_URL}/auth/refreshToken`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${refreshToken}`
            }
          });
          if (response.status === 200) {
            const { accessToken: newAccessToken, accessTokenExpiresIn: newExpirationDate } = await response.json();
            setIsAuthenticated(true);

            const accessTokenExpiresIn = new Date(new Date().getTime() + newExpirationDate * 1000);

            document.cookie = `accessToken=${newAccessToken}; expires=${accessTokenExpiresIn.toUTCString()}; path=/; sameSite=strict;`;
          } else {
            setIsAuthenticated(false);
          }
        } else {
          const response = await fetch(`${API_BASE_URL}/auth/check`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          setIsAuthenticated(response.status === 200);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  return (
    // <Outlet />
    (isAuthenticated ? <Outlet /> : <Navigate to="/auth" />)
  );
};

export default PrivateRoutes;