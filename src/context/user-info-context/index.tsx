"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { getAuthToken, removeAuthToken } from "@/utils/index";
import { AuthUser } from "@/types/auth";
import { getUserInfo } from "@/services/auth";

interface UserContextType {
  isLoggedIn: boolean;
  userInfo: AuthUser | null;
  setUserInfo: (user: AuthUser | null) => void;
  logout: () => void;
  updateAuthStatus: () => Promise<void>;
  activeFriend: string;
  setActiveFriend: (friend: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// JWT decoder function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

// Check if JWT is expired
function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<AuthUser | null>(null);
  const [activeFriend, setActiveFriend] = useState("");
  const updateAuthStatus = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setIsLoggedIn(false);
      setUserInfo(null);
      setActiveFriend("");
      return;
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      removeAuthToken();
      setIsLoggedIn(false);
      setUserInfo(null);
      setActiveFriend("");
      return;
    }

    try {
      // Fetch user info from API
      const userInfoResponse = await getUserInfo();
      setIsLoggedIn(true);
      setUserInfo({
        userId: userInfoResponse.userId,
        username: userInfoResponse.username,
        createdAt: Date.now(), // Since UserInfo doesn't have createdAt, use current time
      });
    } catch (error) {
      // API call failed, token might be invalid
      console.error("Failed to fetch user info:", error);
      removeAuthToken();
      setIsLoggedIn(false);
      setUserInfo(null);
      setActiveFriend("");
    }
  }, []);

  const logout = useCallback(() => {
    removeAuthToken();
    setIsLoggedIn(false);
    setUserInfo(null);
  }, []);

  const handleSetUserInfo = useCallback((user: AuthUser | null) => {
    setUserInfo(user);
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    updateAuthStatus();
  }, [updateAuthStatus]);

  const value: UserContextType = useMemo(
    () => ({
      isLoggedIn,
      userInfo,
      setUserInfo: handleSetUserInfo,
      logout,
      updateAuthStatus,
      activeFriend,
      setActiveFriend,
    }),
    [
      isLoggedIn,
      userInfo,
      handleSetUserInfo,
      logout,
      updateAuthStatus,
      activeFriend,
      setActiveFriend,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
