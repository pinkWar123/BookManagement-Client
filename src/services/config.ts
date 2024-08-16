import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:5226/api/", // Replace with your base URL
  timeout: 10000, // Optional timeout setting
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // Add any other default headers you need
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the config before the request is sent
    // For example, attach an authorization token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error.status === 201) {
    }
    console.log(error);

    return Promise.reject(error);
  }
);

/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
// const axios = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);

// export default axios;

export default axiosInstance;
