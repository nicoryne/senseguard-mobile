import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { caregiverUser, patientUser } from '../lib/mock-data';
import { UserProfile, UserRole } from '../types/user';

interface AuthContextValue {
  currentUser: UserProfile | null;
  loading: boolean;
  userRole: UserRole | null;
  selectRole: (role: UserRole) => void;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    role: UserRole,
    userData: Partial<UserProfile>
  ) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mockUsers: UserProfile[] = [patientUser, caregiverUser];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const selectRole = useCallback((role: UserRole) => {
    setUserRole(role);
  }, []);

  const logIn = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    try {
      const found =
        mockUsers.find((candidate) => candidate.email === email) ?? patientUser;
      setCurrentUser(found);
      setUserRole(found.role);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (
      email: string,
      _password: string,
      role: UserRole,
      userData: Partial<UserProfile>
    ) => {
      setLoading(true);
      try {
        const newUser: UserProfile = {
          id: `${role}-${Date.now()}`,
          email,
          role,
          name: userData.name ?? 'SenseGuard User',
        };
        mockUsers.push(newUser);
        setCurrentUser(newUser);
        setUserRole(role);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logOut = useCallback(async () => {
    setLoading(true);
    try {
      setCurrentUser(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      userRole,
      selectRole,
      logIn,
      signUp,
      logOut,
    }),
    [currentUser, loading, userRole, selectRole, logIn, signUp, logOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};



