"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner"; // Import toast from sonner

interface ErrorContextType {
  error: string | null;
  setError: (error: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  // Use Sonner to show error toasts
  useEffect(() => {
    if (error) {
      console.log({ error });
      toast.error(error);
      // Clear error after 5 seconds
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      // Clear timeout if the error is cleared before 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};
