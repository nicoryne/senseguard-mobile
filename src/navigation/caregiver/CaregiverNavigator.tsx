import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import CaregiverDashboardScreen from '../../screens/caregiver/CaregiverDashboardScreen';
import PatientListScreen from '../../screens/caregiver/PatientListScreen';
import PatientDetailScreen from '../../screens/caregiver/PatientDetailScreen';
import AlertsScreen from '../../screens/caregiver/AlertsScreen';
import ReportsScreen from '../../screens/caregiver/ReportsScreen';
import CaregiverSettingsScreen from '../../screens/caregiver/CaregiverSettingsScreen';
import { COLORS } from '../../utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PatientStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PatientList" component={PatientListScreen} />
    <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
  </Stack.Navigator>
);

const CaregiverNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.neutral.medium,
      tabBarStyle: { backgroundColor: COLORS.neutral.lightest },
      tabBarIcon: ({ color, size }) => {
        const iconMap: Record<string, React.ComponentProps<typeof Ionicons>['name']> =
          {
            Dashboard: 'home',
            Patients: 'people',
            Alerts: 'warning',
            Reports: 'document-text',
            CaregiverSettings: 'settings',
          };
        return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={CaregiverDashboardScreen} />
    <Tab.Screen name="Patients" component={PatientStack} />
    <Tab.Screen name="Alerts" component={AlertsScreen} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
    <Tab.Screen
      name="CaregiverSettings"
      component={CaregiverSettingsScreen}
      options={{ title: 'Settings' }}
    />
  </Tab.Navigator>
);

export default CaregiverNavigator;

