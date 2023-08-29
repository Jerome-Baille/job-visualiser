// Description: This file contains the functions that are used to register, login, and logout users.
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../config/apiConfig";
import useAxiosInstance from '../utils/axiosInstance';

export function useAuthService() {
  const axiosInstance = useAxiosInstance();

  /**
   * Register a new user
   * 
   * @param {Object} newUser 
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   * 
   */
  async function register(newUser) {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/register`, newUser);

      if (response.status >= 200 && response.status < 300) {
          return { status: response.status, body: response.data };
      } else {
          throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to register user');
    }
  }

  /**
   *  Login user
   * 
   * @param {Object} user
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   * 
   */
  async function login(user) {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/login`, user);

      if (response.status >= 200 && response.status < 300) {
        return { status: response.status, body: response.data };
      } else {
          throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to login user');
    }
  }

  /**
   * Get one user
   * 
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   * 
   */
  async function getProfile() {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/auth/profile`);

      if (response.status >= 200 && response.status < 300) {
        return { status: response.status, body: response.data };
      } else {
          throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get user');
    }
  }

  /**
   * Update user
   * 
   * @param {Object} user
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   * 
   */
  async function updateUser(user) {
    try {
      const response = await axiosInstance.put(`${API_BASE_URL}/auth/update/${user._id}`, user);

      if (response.status >= 200 && response.status < 300) {
        return { status: response.status, body: response.data };
      } else {
          throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update user');
    }
  }

  /**
   * Delete user
   * 
   * @param {Object} user
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   * 
   */
  async function deleteUser(user) {
    try {
      const response = await axiosInstance.delete(`${API_BASE_URL}/auth/delete/${user.username}`, {
        data: user
      });

      if (response.status >= 200 && response.status < 300) {
        return { status: response.status, body: response.data };
      } else {
          throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete user');
    }
  }

  // clear cookie and local storage
  async function logout() {
    // Remove all cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('userId');

    // Remove 'jobs' from local storage
    localStorage.removeItem('jobs');
  }

  return { register, login, getProfile, updateUser, deleteUser, logout };
}