import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { caregiverUser, patientUser } from '../data/mockData';
import { login, signOut, signup } from '../services/firebase/auth';
import { UserProfile, UserRole } from '../types/user';

interface AuthContextValue {
  currentUser: UserProfile | null;
  loading: boolean;
  userRole: UserRole | null;
  signUp: (
    email: string,
    password: string,
    role: UserRole,
    userData: Partial<UserProfile>
  ) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  selectRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const selectRole = useCallback((role: UserRole) => {
    setUserRole(role);
  }, []);

  const logIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await login(email, password);
      setCurrentUser(user);
      setUserRole(user.role);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      role: UserRole,
      userData: Partial<UserProfile>
    ) => {
      setLoading(true);
      try {
        const newUser = await signup(email, password, role, userData);
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
      await signOut();
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
      signUp,
      logIn,
      logOut,
      selectRole,
    }),
    [currentUser, loading, userRole, signUp, logIn, logOut, selectRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

