import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { usePathname, useRouter } from 'expo-router'

interface TabItem {
  name: string
  label: string
  icon: string
  route: string
  adminOnly?: boolean
}

const tabs: TabItem[] = [
  { name: 'dashboard', label: 'Dashboard', icon: 'grid', route: '/(app)/dashboard', adminOnly: true },
  { name: 'reports', label: 'Reports', icon: 'file-text', route: '/(app)/reports', adminOnly: true },
  { name: 'scan', label: 'Scan', icon: 'smartphone', route: '/(app)/scan' },
  { name: 'settings', label: 'Settings', icon: 'settings', route: '/(app)/settings' },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  // Show all tabs (no role restrictions)
  const visibleTabs = tabs.filter((tab) => !tab.adminOnly)

  const isActive = (route: string) => {
    if (route === '/(app)/settings') {
      return pathname?.startsWith('/(app)/settings')
    }
    if (route === '/(app)/scan') {
      return pathname === '/(app)/scan' || pathname?.startsWith('/(app)/scan')
    }
    return pathname === route
  }

  return (
    <View className="bg-white border-t border-border flex-row pb-4">
      {visibleTabs.map((tab) => {
        const active = isActive(tab.route)
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.route as any)}
            className="flex-1 py-3 items-center"
          >
            <Feather
              name={tab.icon as any}
              size={24}
              color={active ? '#f9a825' : '#a0aec0'}
            />
            <Text
              className={`text-xs mt-1 font-sans ${
                active ? 'text-accent' : 'text-text-secondary'
              }`}
              style={{ color: active ? '#f9a825' : '#a0aec0' }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

