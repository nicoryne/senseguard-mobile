import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../../lib/colors';

export default function PatientTabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.neutral.medium,
        tabBarStyle: { backgroundColor: COLORS.neutral.lightest },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
            dashboard: 'home',
            analytics: 'stats-chart',
            rehab: 'fitness',
            connections: 'people',
            settings: 'settings',
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Home' }} />
      <Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
      <Tabs.Screen name="rehab" options={{ title: 'Rehab' }} />
      <Tabs.Screen name="connections" options={{ title: 'Caregivers' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}



