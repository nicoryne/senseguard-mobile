import { Stack } from 'expo-router';

export default function PatientStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pressure-details" />
    </Stack>
  );
}



