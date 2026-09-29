'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ADMIN_USERNAME = 'linux';
const ADMIN_PASSWORD = 'linux';
const ADMIN_SESSION_KEY = 'unique_admin_session';

interface AdminUser {
  username: string;
  displayName: string;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (username: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<void> => {
    setError(null);

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      const message = 'Invalid username or password';
      setError(message);
      throw new Error(message);
    }

    const adminUser = { username: ADMIN_USERNAME, displayName: 'Admin' };
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
    setUser(adminUser);
  }, []);

  const register = useCallback(async (): Promise<void> => {
    throw new Error('Local admin registration is disabled');
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setError(null);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setUser(null);
  }, []);

  const resetPassword = useCallback(async (): Promise<void> => {
    throw new Error('Local admin password reset is disabled');
  }, []);

  const updateUserProfile = useCallback(async (displayName: string): Promise<void> => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;
      const updatedUser = { ...currentUser, displayName };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        resetPassword,
        updateUserProfile,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
