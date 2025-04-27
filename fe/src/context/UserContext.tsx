"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  user: { name: string; username: string; accessToken: string } | null;
  setUser: (user: {
    name: string;
    username: string;
    accessToken: string;
  }) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    name: string;
    username: string;
    accessToken: string;
  } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
