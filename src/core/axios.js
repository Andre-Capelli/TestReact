// api.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a response interceptor (optional if you want global error handling)
axiosInstance.interceptors.request.use(
  (config) => {
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
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

// Fix the get method to return the data part of the response
const get = async (url, config) => {
  const response = await axiosInstance.get(url, config);
  return response.data;
};

// Similar for post, put, and delete
const post = async (url, data, config) => {
  const response = await axiosInstance.post(url, data, config);
  return response.data;
};

const put = async (url, data, config) => {
  const response = await axiosInstance.put(url, data, config);
  return response.data;
};

const del = async (url, config) => {
  const response = await axiosInstance.delete(url, config);
  return response.data;
};

export { get, post, put, del, axiosInstance };
