import { Redirect } from 'expo-router';
import { useAuth } from '@/context/auth-context';

export default function Index() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (currentUser) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}

