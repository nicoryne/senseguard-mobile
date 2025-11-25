import { caregiverUser, patientUser } from '../../data/mockData';
import { UserProfile, UserRole } from '../../types/user';

type AuthListener = (user: UserProfile | null) => void;

let currentUser: UserProfile | null = null;
const listeners = new Set<AuthListener>();

const notify = () => {
  listeners.forEach((listener) => listener(currentUser));
};

const mockUsers: UserProfile[] = [patientUser, caregiverUser];

const createUser = (email: string, role: UserRole, name: string) => ({
  id: `${role}-${Date.now()}`,
  email,
  role,
  name,
});

export const onMockAuthStateChanged = (listener: AuthListener) => {
  listeners.add(listener);
  listener(currentUser);
  return () => listeners.delete(listener);
};

export const signup = async (
  email: string,
  _password: string,
  role: UserRole,
  userData: Partial<UserProfile>
) => {
  const newUser: UserProfile = {
    ...createUser(email, role, userData.name ?? 'SenseGuard User'),
    ...userData,
  };
  mockUsers.push(newUser);
  currentUser = newUser;
  notify();
  return newUser;
};

export const login = async (email: string, _password: string) => {
  const user =
    mockUsers.find((candidate) => candidate.email === email) ?? patientUser;
  currentUser = user;
  notify();
  return user;
};

export const signOut = async () => {
  currentUser = null;
  notify();
};

