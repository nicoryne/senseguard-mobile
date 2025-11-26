import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import AuthProvider, { useAuth } from '@/context/auth-context';
import { View, ActivityIndicator } from 'react-native';
import '@/global.css';

function RootLayoutNav() {
  const { currentUser, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!currentUser && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    } else if (currentUser && inAuthGroup) {
      router.replace('/(tabs)/home');
    }
  }, [currentUser, loading, segments, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F8F9FA]">
        <ActivityIndicator size="large" color="#4982BB" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

