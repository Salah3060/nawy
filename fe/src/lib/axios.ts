import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor for handling API errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message || "Something went wrong!";
    console.error(errorMessage);
    return Promise.reject(error);
  }
);

export default instance;
