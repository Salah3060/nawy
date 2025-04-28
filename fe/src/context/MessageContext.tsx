"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

// Define the possible types for the message
type MessageType = "normal" | "success" | "error";

interface MessageContextType {
  message: string | null;
  messageType: MessageType;
  setMessage: (message: string, type: MessageType) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [message, setMessageState] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>("normal");

  // Use Sonner to show the message toast
  useEffect(() => {
    if (message) {
      const toastStyle = {
        normal: {
          backgroundColor: "#f0f0f0",
          color: "#000",
        },
        success: {
          backgroundColor: "#4caf50",
          color: "#ffffff",
        },
        error: {
          backgroundColor: "#ff0000",
          color: "#ffffff",
        },
      };

      toast(message, {
        style: toastStyle[messageType],
      });

      // Clear message after 5 seconds
      const timer = setTimeout(() => {
        setMessageState(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, messageType]);

  const setMessage = (msg: string, type: MessageType) => {
    setMessageState(msg);
    setMessageType(type);
  };

  const clearMessage = () => setMessageState(null);

  return (
    <MessageContext.Provider
      value={{ message, messageType, setMessage, clearMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};
