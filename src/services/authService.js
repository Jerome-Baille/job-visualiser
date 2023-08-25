// Description: This file contains the functions that are used to register, login, and logout users.
import Cookies from 'js-cookie';
import { API_BASE_URL } from "../config/apiConfig";

/**
 * Register a new user
 * 
 * @param {Object} newUser 
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 * 
 */
export async function register(newUser) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
        return { status: response.status, body };
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
export async function login(user) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return { status: response.status, body };
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
 * @param {Object} user
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 * 
 */
export async function getProfile(accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true,
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return { status: response.status, body };
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
export async function updateUser(user, accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/update/${user._id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true,
      body: JSON.stringify(user)
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return { status: response.status, body };
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
export async function deleteUser(user, accessToken) {
  console.log(user);
  console.log(accessToken);
  try {
    const response = await fetch(`${API_BASE_URL}/auth/delete/${user.username}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true,
      body: JSON.stringify(user)
    });

    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return { status: response.status, body };
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete user');
  }
}

/**
 * Set token and userId in cookie 
 * 
 * @returns {Object} An object with the token and userId
 * 
 */
export async function getTokenAndUserId() {
  const { accessToken, refreshToken } = Cookies.get();
  const accessTokenCookie = Cookies.get('accessToken');
  const expirationDate = accessTokenCookie ? accessTokenCookie.expires : null;
  return { accessToken, refreshToken, expirationDate };
}


// clear cookie and local storage
export async function logout() {
  // Remove all cookies
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('userId');

  // Remove 'jobs' from local storage
  localStorage.removeItem('jobs');
}