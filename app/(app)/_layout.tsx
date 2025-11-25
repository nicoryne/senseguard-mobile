import BottomNavigation from '@/components/ui/BottomNavigation'
import { usePathname } from 'expo-router'
import { Stack } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { COLORS } from '@/lib/colors'

export default function AppLayout() {
  const pathname = usePathname()

  // Hide bottom nav on certain screens
  const hideBottomNav =
    pathname?.includes('/settings/') || pathname?.includes('/patient/')

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="rehabilitation" />
        <Stack.Screen name="connections" />
        <Stack.Screen name="alerts" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="settings/profile" />
        <Stack.Screen name="settings/notifications" />
        <Stack.Screen name="settings/about" />
      </Stack>
      {!hideBottomNav && <BottomNavigation />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
})

