import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../../screens/patient/DashboardScreen';
import PressureDetailsScreen from '../../screens/patient/PressureDetailsScreen';
import GaitAnalyticsScreen from '../../screens/patient/GaitAnalyticsScreen';
import RehabilitationScreen from '../../screens/patient/RehabilitationScreen';
import SettingsScreen from '../../screens/patient/SettingsScreen';
import ConnectionRequestsScreen from '../../screens/shared/ConnectionRequestsScreen';
import { COLORS } from '../../utils/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardMain" component={DashboardScreen} />
    <Stack.Screen name="PressureDetails" component={PressureDetailsScreen} />
  </Stack.Navigator>
);

const PatientNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.neutral.medium,
      tabBarStyle: { backgroundColor: COLORS.neutral.lightest },
      tabBarIcon: ({ color, size }) => {
        const iconMap: Record<string, React.ComponentProps<typeof Ionicons>['name']> =
          {
            DashboardStack: 'home',
            Analytics: 'stats-chart',
            Rehab: 'fitness',
            Connections: 'people',
            Settings: 'settings',
          };
        return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen
      name="DashboardStack"
      component={DashboardStack}
      options={{ title: 'Home' }}
    />
    <Tab.Screen name="Analytics" component={GaitAnalyticsScreen} />
    <Tab.Screen name="Rehab" component={RehabilitationScreen} />
    <Tab.Screen name="Connections" component={ConnectionRequestsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default PatientNavigator;

