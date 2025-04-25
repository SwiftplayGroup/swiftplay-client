"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import User from "@/api/User";
import getCookie from "@/lib/getCookie";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = getCookie("token");
      const userID = getCookie("userID");

      if (!token || !userID) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await User.getFromToken(token);
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
