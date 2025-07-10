"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  [key: string]: any;
}

interface UserContextType {
  userData: UserData | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  updateUser: (updates: Partial<UserData>) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch user from API
  const fetchUser = async () => {
    if (!token || !API_BASE_URL) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      console.log("Fetched user data:", data);
      setUserData(data.data);
    } catch (error) {
      console.error("Failed to load user data:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Update user in the backend
  const updateUser = async (updates: Partial<UserData>): Promise<boolean> => {
    if (!token || !API_BASE_URL) return false;

    try {
      const res = await fetch(`${API_BASE_URL}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        console.error("Failed to update user");
        return false;
      }

      await fetchUser(); // Refresh local state after update
      return true;
    } catch (err) {
      console.error("User update error:", err);
      return false;
    }
  };

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchUser();
    } else {
      setUserData(null);
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        refreshUser: fetchUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
