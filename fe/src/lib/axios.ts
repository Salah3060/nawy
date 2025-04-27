import axios from "axios";
import { useError } from "@/context/ErrorContext";

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
    return Promise.reject(error); // Just reject, no setError() here
  }
);

export default instance;
