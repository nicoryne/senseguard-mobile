import { Stack } from 'expo-router';

export default function CaregiverStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="patient-detail" />
    </Stack>
  );
}



