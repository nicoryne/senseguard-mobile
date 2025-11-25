# GabAI Sense Guard - React Native Development Guide

## Project Overview
GabAI Sense Guard is a comprehensive mobile health platform for managing diabetic neuropathy through AI-powered plantar pressure analysis, gait monitoring, and caregiver integration. The app uses React Native for cross-platform mobile development (iOS & Android) with Firebase backend services.

## 1. Branding & Design System

### Color Palette
\`\`\`
Primary Blue: #4982BB (Sophisticated, trustworthy, medical)
Accent Terracotta: #e7a38d (Warm, approachable, energy)
Neutral Light: #F8F9FA (Clean backgrounds)
Neutral Dark: #2A2D34 (Text, headers)
Success: #10B981 (Positive metrics)
Warning: #F59E0B (Alerts, pressure zones)
Error: #EF4444 (Critical alerts)
Surface: #FFFFFF (Cards, modals)
\`\`\`

### Typography System
\`\`\`
Heading Font: Inter (Clean, modern, professional)
  - H1: 32px, Bold (700), Line Height 1.2
  - H2: 24px, Bold (700), Line Height 1.3
  - H3: 18px, SemiBold (600), Line Height 1.4

Body Font: Roboto (Highly readable, accessible)
  - Regular Text: 16px, Regular (400), Line Height 1.5
  - Small Text: 14px, Regular (400), Line Height 1.4
  - Caption: 12px, Regular (400), Line Height 1.3

Button Text: 16px, SemiBold (600), Roboto
Label Text: 14px, SemiBold (600), Roboto
\`\`\`

### Logo Usage
\`\`\`
Logo: Untitled design(2).png
- Left half (Terracotta #e7a38d): Represents caregiver/support
- Right half (Blue #4982BB): Represents patient/data
- Use in header navigation, splash screen, onboarding
- Minimum size: 40x40 for app icon, 120x120 for splash
\`\`\`

## 2. Project Setup

### Prerequisites
\`\`\`bash
# Node.js 16+ and npm/yarn
# Xcode 14+ (for iOS)
# Android Studio with Android SDK 31+ (for Android)
# Firebase account with Firestore, Auth, and Storage enabled
\`\`\`

### Initial Setup
\`\`\`bash
# Create React Native project with Expo (recommended for faster development)
npx create-expo-app GabAISenseGuard
cd GabAISenseGuard

# Or use React Native CLI
npx react-native init GabAISenseGuard --template react-native-template-typescript

# Install core dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install firebase @react-native-async-storage/async-storage
npm install react-native-gesture-handler react-native-reanimated
npm install expo-gl expo-three three react-native-three
npm install react-native-chart-kit
npm install @react-native-community/slider
npm install react-native-svg
npm install lottie-react-native
\`\`\`

### Project Structure
\`\`\`
GabAISenseGuard/
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── PatientNavigator.tsx
│   │   ├── CaregiverNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignupScreen.tsx
│   │   │   ├── RoleSelectionScreen.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── patient/
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── PressureDetailsScreen.tsx
│   │   │   ├── GaitAnalyticsScreen.tsx
│   │   │   ├── RehabilitationScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── caregiver/
│   │   │   ├── CaregiverDashboardScreen.tsx
│   │   │   ├── PatientListScreen.tsx
│   │   │   ├── PatientDetailScreen.tsx
│   │   │   ├── AlertsScreen.tsx
│   │   │   ├── ReportsScreen.tsx
│   │   │   └── CaregiverSettingsScreen.tsx
│   │   └── shared/
│   │       ├── ConnectionRequestsScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── components/
│   │   ├── ThreeD/
│   │   │   ├── FootVisualization.tsx
│   │   │   ├── PressureHeatmap.tsx
│   │   │   └── GaitVisualization.tsx
│   │   ├── Cards/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── AlertCard.tsx
│   │   │   ├── PatientCard.tsx
│   │   │   └── SessionCard.tsx
│   │   ├── Charts/
│   │   │   ├── GaitQualityChart.tsx
│   │   │   ├── PressureDistributionChart.tsx
│   │   │   ├── ActivityChart.tsx
│   │   │   └── ThermalChart.tsx
│   │   ├── Forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── ConnectionForm.tsx
│   │   │   └── RehabSessionForm.tsx
│   │   ├── Headers/
│   │   │   ├── TopHeader.tsx
│   │   │   ├── TabBar.tsx
│   │   │   └── BackHeader.tsx
│   │   └── UI/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Loader.tsx
│   ├── services/
│   │   ├── firebase/
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   ├── storage.ts
│   │   │   └── realtime.ts
│   │   ├── sensorData.ts
│   │   ├── analytics.ts
│   │   └── notifications.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── usePressureData.ts
│   │   ├── useGaitData.ts
│   │   └── useCaregiver.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── UserContext.tsx
│   │   └── SensorContext.tsx
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── colors.ts
│   │   ├── fonts.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── sensor.ts
│   │   ├── session.ts
│   │   └── caregiver.ts
│   └── App.tsx
├── android/
├── ios/
├── app.json
├── package.json
├── tsconfig.json
└── .env.example
\`\`\`

## 3. Core Design System (TypeScript)

### constants/colors.ts
\`\`\`typescript
export const COLORS = {
  primary: '#4982BB',
  accent: '#e7a38d',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: {
    light: '#F8F9FA',
    lighter: '#FFFFFF',
    dark: '#2A2D34',
    medium: '#6B7280',
  },
  surface: {
    background: '#FFFFFF',
    secondary: '#F3F4F6',
    tertiary: '#E5E7EB',
  },
  pressure: {
    low: '#0EA5E9',
    moderate: '#84CC16',
    high: '#FBBF24',
    critical: '#EF4444',
  },
};
\`\`\`

### utils/fonts.ts
\`\`\`typescript
import { useFonts } from 'expo-font';

export const loadFonts = async () => {
  await useFonts({
    'inter-bold': require('../assets/fonts/Inter-Bold.ttf'),
    'inter-semibold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'inter-regular': require('../assets/fonts/Inter-Regular.ttf'),
    'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });
};

export const FONTS = {
  h1: { fontFamily: 'inter-bold', fontSize: 32, lineHeight: 38 },
  h2: { fontFamily: 'inter-bold', fontSize: 24, lineHeight: 31 },
  h3: { fontFamily: 'inter-semibold', fontSize: 18, lineHeight: 25 },
  body: { fontFamily: 'roboto-regular', fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: 'roboto-regular', fontSize: 14, lineHeight: 21 },
  button: { fontFamily: 'roboto-semibold', fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: 'roboto-regular', fontSize: 12, lineHeight: 18 },
};
\`\`\`

## 4. Firebase Integration

### services/firebase/auth.ts
\`\`\`typescript
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signup = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const login = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};
\`\`\`

### services/firebase/firestore.ts
\`\`\`typescript
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { app } from './auth';

const db = getFirestore(app);

// User Profile
export const createUserProfile = async (userId: string, data: any) => {
  await setDoc(doc(db, 'users', userId), data);
};

export const getUserProfile = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'users', userId));
  return docSnap.data();
};

// Sensor Data
export const savePressureData = async (userId: string, data: any) => {
  await addDoc(collection(db, 'users', userId, 'pressureReadings'), {
    ...data,
    timestamp: new Date(),
  });
};

export const getPressureHistory = async (userId: string, daysBack: number = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBack);
  
  const q = query(
    collection(db, 'users', userId, 'pressureReadings'),
    where('timestamp', '>=', startDate)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Real-time Listener for Live Data
export const listenToLiveData = (userId: string, callback: Function) => {
  const q = query(collection(db, 'users', userId, 'liveData'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => doc.data());
    callback(data);
  });
  
  return unsubscribe;
};

// Caregiver Connections
export const requestCaregiverConnection = async (patientId: string, caregiverId: string) => {
  await addDoc(collection(db, 'connectionRequests'), {
    patientId,
    caregiverId,
    status: 'pending',
    createdAt: new Date(),
  });
};

export const approveCaregiverConnection = async (requestId: string, patientId: string, caregiverId: string) => {
  await addDoc(collection(db, 'users', patientId, 'caregivers'), {
    caregiverId,
    connectedAt: new Date(),
    permissions: ['view_data', 'view_alerts'],
  });
};

export const getCaregiverConnections = async (patientId: string) => {
  const snapshot = await getDocs(collection(db, 'users', patientId, 'caregivers'));
  return snapshot.docs.map(doc => doc.data());
};
\`\`\`

## 5. Authentication Flow

### context/AuthContext.tsx
\`\`\`typescript
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { auth, login, signup, signOut } from '../services/firebase/auth';
import { getUserProfile, createUserProfile } from '../services/firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export interface AuthContextType {
  currentUser: any | null;
  loading: boolean;
  userRole: 'patient' | 'caregiver' | 'both' | null;
  signUp: (email: string, password: string, role: string, userData: any) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'patient' | 'caregiver' | 'both' | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setCurrentUser(user);
        setUserRole(profile?.role || null);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = useCallback(async (email: string, password: string, role: string, userData: any) => {
    const user = await signup(email, password);
    await createUserProfile(user.uid, { email, role, ...userData, createdAt: new Date() });
    setUserRole(role as any);
  }, []);

  const logIn = useCallback(async (email: string, password: string) => {
    const user = await login(email, password);
    const profile = await getUserProfile(user.uid);
    setUserRole(profile?.role || null);
  }, []);

  const logOut = useCallback(async () => {
    await signOut();
    setCurrentUser(null);
    setUserRole(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, userRole, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
\`\`\`

## 6. Navigation Architecture

### navigation/RootNavigator.tsx
\`\`\`typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../utils/colors';

import AuthNavigator from './AuthNavigator';
import PatientNavigator from './PatientNavigator';
import CaregiverNavigator from './CaregiverNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.neutral.lighter }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!currentUser ? (
        <AuthNavigator />
      ) : userRole === 'patient' ? (
        <PatientNavigator />
      ) : userRole === 'caregiver' ? (
        <CaregiverNavigator />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.neutral.lighter }}>
          <Text>Select your role</Text>
        </View>
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
\`\`\`

### navigation/PatientNavigator.tsx
\`\`\`typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

// Patient Screens
import DashboardScreen from '../screens/patient/DashboardScreen';
import GaitAnalyticsScreen from '../screens/patient/GaitAnalyticsScreen';
import RehabilitationScreen from '../screens/patient/RehabilitationScreen';
import SettingsScreen from '../screens/patient/SettingsScreen';
import PressureDetailsScreen from '../screens/patient/PressureDetailsScreen';
import ConnectionRequestsScreen from '../screens/shared/ConnectionRequestsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardMain" component={DashboardScreen} />
    <Stack.Screen name="PressureDetails" component={PressureDetailsScreen} />
  </Stack.Navigator>
);

const PatientTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = 
          route.name === 'Dashboard' ? 'home' :
          route.name === 'Analytics' ? 'stats-chart' :
          route.name === 'Rehab' ? 'fitness' :
          route.name === 'Connections' ? 'people' :
          'settings';
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.neutral.medium,
      tabBarStyle: { backgroundColor: COLORS.neutral.lighter, borderTopColor: COLORS.surface.tertiary },
    })}
  >
    <Tab.Screen 
      name="Dashboard" 
      component={DashboardStack}
      options={{ title: 'Home' }}
    />
    <Tab.Screen 
      name="Analytics" 
      component={GaitAnalyticsScreen}
      options={{ title: 'Analytics' }}
    />
    <Tab.Screen 
      name="Rehab" 
      component={RehabilitationScreen}
      options={{ title: 'Rehab' }}
    />
    <Tab.Screen 
      name="Connections" 
      component={ConnectionRequestsScreen}
      options={{ title: 'Caregivers' }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
  </Tab.Navigator>
);

export default PatientTabNavigator;
\`\`\`

### navigation/CaregiverNavigator.tsx
\`\`\`typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

// Caregiver Screens
import CaregiverDashboardScreen from '../screens/caregiver/CaregiverDashboardScreen';
import PatientListScreen from '../screens/caregiver/PatientListScreen';
import PatientDetailScreen from '../screens/caregiver/PatientDetailScreen';
import AlertsScreen from '../screens/caregiver/AlertsScreen';
import ReportsScreen from '../screens/caregiver/ReportsScreen';
import CaregiverSettingsScreen from '../screens/caregiver/CaregiverSettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const PatientsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PatientList" component={PatientListScreen} />
    <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
  </Stack.Navigator>
);

const CaregiverTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = 
          route.name === 'Dashboard' ? 'home' :
          route.name === 'Patients' ? 'people' :
          route.name === 'Alerts' ? 'warning' :
          route.name === 'Reports' ? 'document' :
          'settings';
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.neutral.medium,
      tabBarStyle: { backgroundColor: COLORS.neutral.lighter, borderTopColor: COLORS.surface.tertiary },
    })}
  >
    <Tab.Screen 
      name="Dashboard" 
      component={CaregiverDashboardScreen}
      options={{ title: 'Dashboard' }}
    />
    <Tab.Screen 
      name="Patients" 
      component={PatientsStack}
      options={{ title: 'My Patients' }}
    />
    <Tab.Screen 
      name="Alerts" 
      component={AlertsScreen}
      options={{ title: 'Alerts' }}
    />
    <Tab.Screen 
      name="Reports" 
      component={ReportsScreen}
      options={{ title: 'Reports' }}
    />
    <Tab.Screen 
      name="Settings" 
      component={CaregiverSettingsScreen}
      options={{ title: 'Settings' }}
    />
  </Tab.Navigator>
);

export default CaregiverTabNavigator;
\`\`\`

## 7. Patient Screen Flows

### screens/patient/DashboardScreen.tsx
\`\`\`typescript
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getPressureHistory } from '../../services/firebase/firestore';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';
import FootVisualization from '../../components/ThreeD/FootVisualization';
import MetricCard from '../../components/Cards/MetricCard';
import GaitQualityChart from '../../components/Charts/GaitQualityChart';

const DashboardScreen = ({ navigation }: any) => {
  const { currentUser } = useAuth();
  const [pressureData, setPressureData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFoot, setSelectedFoot] = useState<'left' | 'right'>('left');

  useEffect(() => {
    loadPressureData();
  }, []);

  const loadPressureData = async () => {
    if (currentUser) {
      const data = await getPressureHistory(currentUser.uid, 1);
      if (data.length > 0) {
        setPressureData(data[data.length - 1]);
      }
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadPressureData().then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>

      {/* 3D Foot Visualization */}
      <View style={styles.visualizationSection}>
        <View style={styles.footHeader}>
          <Text style={styles.sectionTitle}>Plantar Pressure</Text>
          <View style={styles.footToggle}>
            <Text 
              style={[styles.footButton, selectedFoot === 'left' && styles.footButtonActive]}
              onPress={() => setSelectedFoot('left')}
            >
              Left
            </Text>
            <Text 
              style={[styles.footButton, selectedFoot === 'right' && styles.footButtonActive]}
              onPress={() => setSelectedFoot('right')}
            >
              Right
            </Text>
          </View>
        </View>
        <FootVisualization foot={selectedFoot} data={pressureData} />
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <MetricCard 
          title="Max Pressure" 
          value="487" 
          unit="kPa" 
          color={COLORS.primary}
          icon="barbell"
        />
        <MetricCard 
          title="Avg Pressure" 
          value="285" 
          unit="kPa" 
          color={COLORS.accent}
          icon="stats-chart"
        />
      </View>

      {/* Gait Quality Trend */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Gait Quality</Text>
        <GaitQualityChart />
      </View>

      {/* Recent Alerts */}
      <View style={styles.section}>
        <View style={styles.alertHeader}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <Text style={styles.viewAll} onPress={() => navigation.navigate('Alerts')}>View All</Text>
        </View>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>No critical alerts in the last 24 hours</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral.lighter },
  header: { paddingHorizontal: 16, paddingVertical: 20, backgroundColor: COLORS.primary },
  greeting: { ...FONTS.h2, color: COLORS.neutral.lighter, marginBottom: 4 },
  date: { ...FONTS.bodySmall, color: 'rgba(255,255,255,0.7)' },
  visualizationSection: { marginVertical: 20, paddingHorizontal: 16 },
  footHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { ...FONTS.h3, color: COLORS.neutral.dark },
  footToggle: { flexDirection: 'row', gap: 8 },
  footButton: { ...FONTS.bodySmall, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, backgroundColor: COLORS.surface.secondary, color: COLORS.neutral.medium },
  footButtonActive: { backgroundColor: COLORS.primary, color: COLORS.neutral.lighter },
  statsGrid: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginBottom: 20 },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  viewAll: { ...FONTS.bodySmall, color: COLORS.primary },
  alertBox: { backgroundColor: COLORS.surface.secondary, borderRadius: 8, padding: 12 },
  alertText: { ...FONTS.bodySmall, color: COLORS.neutral.medium },
});

export default DashboardScreen;
\`\`\`

## 8. Caregiver Screen Flows

### screens/caregiver/CaregiverDashboardScreen.tsx
\`\`\`typescript
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';
import PatientCard from '../../components/Cards/PatientCard';
import AlertCard from '../../components/Cards/AlertCard';

const CaregiverDashboardScreen = ({ navigation }: any) => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Load connected patients and their alerts
    loadPatients();
  }, []);

  const loadPatients = async () => {
    // Fetch from Firebase
    // For now, mock data
    setPatients([
      { id: '1', name: 'John Doe', status: 'active', maxPressure: 487, riskLevel: 'low' },
      { id: '2', name: 'Jane Smith', status: 'active', maxPressure: 520, riskLevel: 'medium' },
      { id: '3', name: 'Bob Johnson', status: 'inactive', maxPressure: 350, riskLevel: 'low' },
    ]);

    setActiveAlerts([
      { id: '1', patientName: 'Jane Smith', message: 'High pressure detected at heel', severity: 'warning', time: '2 hours ago' },
      { id: '2', patientName: 'John Doe', message: 'Missed rehabilitation session', severity: 'info', time: '4 hours ago' },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Care Dashboard</Text>
        <Text style={styles.subtitle}>Monitor your patients' progress</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{patients.length}</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{activeAlerts.length}</Text>
          <Text style={styles.statLabel}>Active Alerts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>92%</Text>
          <Text style={styles.statLabel}>Compliance</Text>
        </View>
      </View>

      {/* My Patients */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Patients</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Patients')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {patients.slice(0, 3).map(patient => (
          <PatientCard 
            key={patient.id}
            patient={patient}
            onPress={() => navigation.navigate('PatientDetail', { patientId: patient.id })}
          />
        ))}
      </View>

      {/* Recent Alerts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {activeAlerts.slice(0, 3).map(alert => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral.lighter },
  header: { paddingHorizontal: 16, paddingVertical: 20, backgroundColor: COLORS.primary },
  title: { ...FONTS.h2, color: COLORS.neutral.lighter, marginBottom: 4 },
  subtitle: { ...FONTS.bodySmall, color: 'rgba(255,255,255,0.7)' },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 20, gap: 12 },
  statBox: { flex: 1, backgroundColor: COLORS.surface.background, paddingVertical: 16, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center' },
  statNumber: { ...FONTS.h3, color: COLORS.primary, marginBottom: 4 },
  statLabel: { ...FONTS.caption, color: COLORS.neutral.medium },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { ...FONTS.h3, color: COLORS.neutral.dark },
  seeAll: { ...FONTS.bodySmall, color: COLORS.primary },
});

export default CaregiverDashboardScreen;
\`\`\`

## 9. 3D Visualization Components

### components/ThreeD/FootVisualization.tsx
\`\`\`typescript
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';
import { COLORS } from '../../utils/colors';

const FootModel = ({ pressureData, foot }: { pressureData: any; foot: 'left' | 'right' }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Create procedural foot geometry
  const createFootGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    
    // Foot outline vertices (simplified)
    const vertices = new Float32Array([
      // Heel
      -0.2, -1.0, 0,
      0.2, -1.0, 0,
      // Mid-foot
      -0.3, -0.3, 0,
      0.3, -0.3, 0,
      // Ball of foot
      -0.25, 0.5, 0,
      0.25, 0.5, 0,
      // Toes
      0, 0.9, 0,
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    return geometry;
  };

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  const getPressureColor = (pressure: number) => {
    if (pressure < 250) return COLORS.pressure.low;
    if (pressure < 350) return COLORS.pressure.moderate;
    if (pressure < 450) return COLORS.pressure.high;
    return COLORS.pressure.critical;
  };

  return (
    <group ref={groupRef}>
      {/* Foot base */}
      <mesh castShadow>
        <bufferGeometry args={[createFootGeometry()]} />
        <meshStandardMaterial color={COLORS.primary} opacity={0.6} transparent />
      </mesh>

      {/* Pressure zones visualization */}
      {pressureData && pressureData.sensorReadings?.map((reading: any, idx: number) => (
        <sphere key={idx} position={[reading.x, reading.y, reading.z + 0.1]} scale={0.05}>
          <meshStandardMaterial 
            color={getPressureColor(reading.pressure)} 
            emissive={getPressureColor(reading.pressure)}
            emissiveIntensity={0.5}
          />
        </sphere>
      ))}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
    </group>
  );
};

const FootVisualization = ({ foot, data }: { foot: 'left' | 'right'; data: any }) => {
  const canvasRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <Canvas
        ref={canvasRef}
        style={styles.canvas}
        gl={{ transparent: true }}
        camera={{ position: [0, 0, 2], fov: 50 }}
      >
        <FootModel pressureData={data} foot={foot} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').width * 0.6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  canvas: { flex: 1 },
});

export default FootVisualization;
\`\`\`

## 10. Key Components Library

### components/Cards/MetricCard.tsx
\`\`\`typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  color: string;
  icon: string;
}

const MetricCard = ({ title, value, unit, color, icon }: MetricCardProps) => (
  <View style={[styles.card, { borderLeftColor: color }]}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon as any} size={24} color={color} />
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface.background,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: { marginRight: 12 },
  content: { flex: 1 },
  title: { ...FONTS.caption, color: COLORS.neutral.medium, marginBottom: 4 },
  valueContainer: { flexDirection: 'row', alignItems: 'baseline' },
  value: { ...FONTS.h3, color: COLORS.neutral.dark },
  unit: { ...FONTS.bodySmall, color: COLORS.neutral.medium, marginLeft: 4 },
});

export default MetricCard;
\`\`\`

### components/Cards/PatientCard.tsx
\`\`\`typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface PatientCardProps {
  patient: { id: string; name: string; status: string; maxPressure: number; riskLevel: string };
  onPress: () => void;
}

const PatientCard = ({ patient, onPress }: PatientCardProps) => {
  const riskColor = 
    patient.riskLevel === 'high' ? COLORS.error :
    patient.riskLevel === 'medium' ? COLORS.warning :
    COLORS.success;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{patient.name}</Text>
        <View style={[styles.riskBadge, { backgroundColor: riskColor }]}>
          <Text style={styles.riskText}>{patient.riskLevel}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Max Pressure</Text>
          <Text style={styles.statValue}>{patient.maxPressure} kPa</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Status</Text>
          <Text style={[styles.statValue, { color: patient.status === 'active' ? COLORS.success : COLORS.neutral.medium }]}>
            {patient.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  name: { ...FONTS.h3, color: COLORS.neutral.dark },
  riskBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  riskText: { ...FONTS.caption, color: COLORS.neutral.lighter, textTransform: 'capitalize' },
  stats: { flexDirection: 'row', gap: 16 },
  stat: { flex: 1 },
  statLabel: { ...FONTS.caption, color: COLORS.neutral.medium, marginBottom: 4 },
  statValue: { ...FONTS.body, color: COLORS.neutral.dark },
});

export default PatientCard;
\`\`\`

## 11. Firebase Data Schemas

### User Collection
\`\`\`
users/
  ├── {userId}/
  │   ├── email: string
  │   ├── role: 'patient' | 'caregiver' | 'both'
  │   ├── firstName: string
  │   ├── lastName: string
  │   ├── phone: string
  │   ├── createdAt: timestamp
  │   ├── profileComplete: boolean
  │   ├── neuropathyGrade: number (0-3)
  │   └── caregivers/
  │       └── {caregiverId}/
  │           ├── connectedAt: timestamp
  │           ├── permissions: ['view_data', 'view_alerts']
  │           └── role: 'family' | 'healthcare_provider'
\`\`\`

### Sensor Data Collection
\`\`\`
users/
  ├── {userId}/
  │   ├── pressureReadings/
  │   │   ├── {readingId}/
  │   │   │   ├── timestamp: timestamp
  │   │   │   ├── leftFoot: { maxPressure, avgPressure, sensorReadings: [] }
  │   │   │   ├── rightFoot: { maxPressure, avgPressure, sensorReadings: [] }
  │   │   │   ├── gaitQuality: number (0-100)
  │   │   │   ├── symmetry: number (0-100)
  │   │   │   └── alerts: []
  │   ├── gaitSessions/
  │   │   ├── {sessionId}/
  │   │   │   ├── date: timestamp
  │   │   │   ├── duration: number (seconds)
  │   │   │   ├── distance: number (meters)
  │   │   │   ├── steps: number
  │   │   │   ├── quality: number (0-100)
  │   │   │   ├── cadence: number
  │   │   │   └── notes: string
  │   └── thermalReadings/
  │       ├── {readingId}/
  │       │   ├── timestamp: timestamp
  │       │   ├── leftFoot: { temp: number, hotspots: [] }
  │       │   ├── rightFoot: { temp: number, hotspots: [] }
  │       │   └── alerts: []
\`\`\`

### Connection Requests Collection
\`\`\`
connectionRequests/
  ├── {requestId}/
  │   ├── patientId: string
  │   ├── caregiverId: string
  │   ├── status: 'pending' | 'approved' | 'declined'
  │   ├── createdAt: timestamp
  │   ├── respondedAt: timestamp
  │   └── relationship: 'family' | 'provider' | 'other'
\`\`\`

## 12. Integrated Patient + Caregiver Flow

The recommendation is to **integrate all roles into one unified app** with role-based navigation. This approach:

**Advantages:**
- Single authentication system
- Easier maintenance and updates
- Users can switch roles if needed (e.g., caregiver who is also a patient)
- Streamlined deployment

**Flow:**
\`\`\`
1. Login Screen
   ↓
2. Role Selection (Patient/Caregiver/Both)
   ↓
3. Role-based Navigation
   ├── Patient Role → Patient Navigator (Dashboard, Analytics, Rehab, Connections, Settings)
   └── Caregiver Role → Caregiver Navigator (Care Dashboard, My Patients, Alerts, Reports, Settings)

4. Switching Roles
   - Settings page allows role switching
   - Same user authentication maintained
   - Data seamlessly switches based on selected role
\`\`\`

## 13. Deployment Strategy

### iOS Build
\`\`\`bash
# Prepare for production
eas build --platform ios --auto-submit

# Requires:
# - Apple Developer Account
# - Provisioning profiles
# - Distribution certificate
\`\`\`

### Android Build
\`\`\`bash
# Prepare for production
eas build --platform android --auto-submit

# Requires:
# - Google Play Developer Account
# - Signing key configuration
# - App signing setup in Play Console
\`\`\`

### App Store Submission Checklist
- [ ] Privacy Policy page
- [ ] Terms of Service
- [ ] HIPAA compliance documentation
- [ ] Medical device classification confirmation
- [ ] Screenshot assets in required dimensions
- [ ] App description and keywords
- [ ] Contact information
- [ ] Support website

## 14. Environment Variables (.env.example)
\`\`\`
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# App Configuration
APP_NAME=GabAI Sense Guard
APP_VERSION=1.0.0

# Feature Flags
ENABLE_3D_VISUALIZATION=true
ENABLE_CAREGIVER_FEATURES=true
ENABLE_PUSH_NOTIFICATIONS=true
\`\`\`

## 15. Performance Optimization

### Image Optimization
- Use PNG for UI assets
- WebP for complex graphics
- Lazy load images in lists

### Data Fetching
- Implement pagination for large datasets
- Cache frequently accessed data
- Use Firebase Realtime listeners for live updates

### 3D Optimization
- Simplify foot geometry
- Use LOD (Level of Detail) models
- Implement culling for off-screen objects

## 16. Testing Strategy

### Unit Tests
\`\`\`bash
npm install --save-dev @testing-library/react-native jest
\`\`\`

### E2E Tests
\`\`\`bash
npm install --save-dev detox detox-cli
\`\`\`

---

## Summary

This comprehensive guide provides everything needed to build GabAI Sense Guard as a React Native app with:
- Unified authentication for both patients and caregivers
- Role-based navigation and features
- Real-time pressure visualization with React Three Fiber
- Firebase backend integration
- Professional branding with the logo and color palette
- HIPAA-compliant data handling

The integrated approach allows both users to access the app seamlessly while maintaining role-specific functionality.
