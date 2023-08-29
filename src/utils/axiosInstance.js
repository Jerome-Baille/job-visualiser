import axios from 'axios';
import { useLoadingSpinner } from '../contexts/LoadingSpinnerContext';
import { getAccessTokenFromStorage } from './authUtils';
import { API_BASE_URL } from "../config/apiConfig";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromStorage();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function useAxiosInstance() {
  const { show, hide } = useLoadingSpinner();

  axiosInstance.interceptors.request.use(
    (config) => {
      show(); // Show loading spinner before the request is made
      return config;
    },
    (error) => {
      hide(); // Hide loading spinner on error
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      setTimeout(() => {
        hide(); // Hide loading spinner after the response is received
      }, 500);
      // hide(); // Hide loading spinner after the response is received
      return response;
    },
    (error) => {
      hide(); // Hide loading spinner on error
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default useAxiosInstance;