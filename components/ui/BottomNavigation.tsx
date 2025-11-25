import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { name: 'dashboard', label: 'Home', icon: 'home' },
    { name: 'analytics', label: 'Analytics', icon: 'stats-chart' },
    { name: 'rehabilitation', label: 'Rehab', icon: 'fitness' },
    { name: 'connections', label: 'Connections', icon: 'people' },
    { name: 'alerts', label: 'Alerts', icon: 'notifications' },
    { name: 'settings', label: 'Settings', icon: 'settings' },
  ]

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const route = `/(app)/${tab.name}`
        const isActive = pathname === route || pathname?.startsWith(`${route}/`)

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(route)}
            style={styles.tab}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive ? COLORS.primary : COLORS.neutral.medium}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface.tertiary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingBottom: 20,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginTop: 4,
    fontSize: 10,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
})

