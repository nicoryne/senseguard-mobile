import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../../lib/colors';

export default function CaregiverTabsLayout() {
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
            patients: 'people',
            alerts: 'warning',
            reports: 'document-text',
            settings: 'settings',
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="patients" options={{ title: 'Patients' }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alerts' }} />
      <Tabs.Screen name="reports" options={{ title: 'Reports' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}



