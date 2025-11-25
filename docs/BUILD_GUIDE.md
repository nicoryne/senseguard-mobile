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
# Node.js 18+ and npm
# Xcode 14+ (for iOS)
# Android Studio with Android SDK 33+ (for Android)
# Firebase account with Firestore, Auth, and Storage enabled
\`\`\`

### Initial Setup
\`\`\`bash
# Create Expo project with TypeScript
npx create-expo-app@latest GabAISenseGuard --template
cd GabAISenseGuard

# Install core dependencies
npm install expo-router expo-font expo-splash-screen
npm install firebase @react-native-async-storage/async-storage
npm install react-native-gesture-handler react-native-reanimated
npm install expo-gl expo-three three @react-three/fiber @react-three/drei
npm install react-native-chart-kit react-native-svg
npm install nativewind tailwindcss
npm install react-native-safe-area-context react-native-screens
\`\`\`

### Project Structure (Expo Router)
\`\`\`
GabAISenseGuard/
├── app/
│   ├── _layout.tsx                 # Root layout with AuthProvider
│   ├── index.tsx                   # Entry point (redirects to auth or app)
│   ├── (auth)/                     # Auth group (unprotected)
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── role-selection.tsx
│   └── (app)/                       # App group (protected)
│       ├── _layout.tsx              # App layout with bottom tabs
│       ├── dashboard.tsx           # Patient/Caregiver dashboard
│       ├── analytics.tsx           # Gait analytics
│       ├── rehabilitation.tsx      # Rehab sessions
│       ├── connections.tsx         # Caregiver connections
│       ├── settings.tsx
│       └── settings/
│           ├── profile.tsx
│           ├── notifications.tsx
│           └── about.tsx
├── components/
│   ├── ui/                         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── TextInput.tsx
│   │   ├── Card.tsx
│   │   ├── BottomNavigation.tsx
│   │   └── Header.tsx
│   ├── cards/                      # Card components
│   │   ├── MetricCard.tsx
│   │   ├── AlertCard.tsx
│   │   ├── PatientCard.tsx
│   │   └── SessionCard.tsx
│   ├── charts/                     # Chart components
│   │   ├── GaitQualityChart.tsx
│   │   ├── PressureDistributionChart.tsx
│   │   └── ActivityChart.tsx
│   └── 3d/                         # 3D visualization
│       ├── FootVisualization.tsx
│       ├── PressureHeatmap.tsx
│       └── GaitVisualization.tsx
├── context/
│   ├── auth-context.tsx            # Auth context provider
│   ├── user-context.tsx            # User data context
│   └── sensor-context.tsx          # Sensor data context
├── utils/
│   ├── firebase.ts                  # Firebase initialization
│   ├── firestore.ts                 # Firestore helpers
│   ├── constants.ts                 # App constants
│   ├── formatters.ts                # Data formatters
│   └── validators.ts                # Form validators
├── types/
│   ├── user.ts                      # User types
│   ├── sensor.ts                    # Sensor data types
│   ├── session.ts                   # Session types
│   └── caregiver.ts                 # Caregiver types
├── assets/
│   ├── images/
│   │   └── logo.png
│   └── fonts/
│       ├── Inter-Bold.ttf
│       ├── Inter-Regular.ttf
│       └── Roboto-Regular.ttf
├── android/
├── ios/
├── app.json                        # Expo configuration
├── app.config.js                   # Dynamic Expo config
├── package.json
├── tsconfig.json                   # TypeScript config with path aliases
├── tailwind.config.js              # Tailwind CSS config
├── metro.config.js                 # Metro bundler config
├── babel.config.js                 # Babel config with NativeWind
├── global.css                      # Tailwind CSS imports
└── .env.example
\`\`\`

## 3. Configuration Files

### package.json
\`\`\`json
{
  "name": "gabai-sense-guard",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "dependencies": {
    "expo": "~54.0.20",
    "expo-router": "~6.0.13",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "nativewind": "^4.2.1",
    "tailwindcss": "^3.4.18",
    "firebase": "^12.6.0",
    "@react-three/fiber": "^9.4.0",
    "@react-three/drei": "^10.7.7",
    "three": "^0.166.1"
  }
}
\`\`\`

### app.json
\`\`\`json
{
  "expo": {
    "name": "GabAI Sense Guard",
    "slug": "gabai-sense-guard",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "gabaisenseguard",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": false,
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4982BB"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.gabai.senseguard"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon.png",
        "backgroundColor": "#4982BB"
      },
      "package": "com.gabai.senseguard"
    },
    "web": {
      "bundler": "metro",
      "output": "static"
    },
    "plugins": [
      "expo-router",
      "expo-splash-screen"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
\`\`\`

### tailwind.config.js
\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4982BB',        // Primary Blue
        accent: '#e7a38d',         // Terracotta
        success: '#10B981',        // Success Green
        warning: '#F59E0B',        // Warning Orange
        error: '#EF4444',          // Error Red
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
      },
      fontFamily: {
        heading: ['Inter', 'System'],
        body: ['Roboto', 'System'],
      },
    },
  },
  plugins: [],
}
\`\`\`

### metro.config.js
\`\`\`javascript
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Add custom asset extensions if needed
config.resolver.assetExts = Array.from(
  new Set([...(config.resolver.assetExts || []), 'glb', 'gltf', 'obj'])
)

module.exports = withNativeWind(config, { input: './global.css' })
\`\`\`

### babel.config.js
\`\`\`javascript
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: ['react-native-reanimated/plugin'],
  }
}
\`\`\`

### tsconfig.json
\`\`\`json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ]
}
\`\`\`

### global.css
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Design tokens */
:root {
  --color-primary: #4982BB;
  --color-accent: #e7a38d;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --font-heading: 'Inter', system-ui;
  --font-body: 'Roboto', system-ui;
}
\`\`\`

## 4. Firebase Integration

### utils/firebase.ts
\`\`\`typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
\`\`\`

### utils/firestore.ts
\`\`\`typescript
import { db } from './firebase'
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'

// User Profile
export const createUserProfile = async (userId: string, data: any) => {
  await setDoc(doc(db, 'users', userId), data)
}

export const getUserProfile = async (userId: string) => {
  const docSnap = await getDoc(doc(db, 'users', userId))
  return docSnap.data()
}

// Sensor Data
export const savePressureData = async (userId: string, data: any) => {
  await addDoc(collection(db, 'users', userId, 'pressureReadings'), {
    ...data,
    timestamp: new Date(),
  })
}

export const getPressureHistory = async (userId: string, daysBack: number = 7) => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)

  const q = query(
    collection(db, 'users', userId, 'pressureReadings'),
    where('timestamp', '>=', startDate)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Real-time Listener
export const listenToLiveData = (userId: string, callback: (data: any[]) => void) => {
  const q = query(collection(db, 'users', userId, 'liveData'))

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data())
    callback(data)
  })

  return unsubscribe
}

// Caregiver Connections
export const requestCaregiverConnection = async (
  patientId: string,
  caregiverId: string
) => {
  await addDoc(collection(db, 'connectionRequests'), {
    patientId,
    caregiverId,
    status: 'pending',
    createdAt: new Date(),
  })
}

export const getCaregiverConnections = async (patientId: string) => {
  const snapshot = await getDocs(collection(db, 'users', patientId, 'caregivers'))
  return snapshot.docs.map((doc) => doc.data())
}
\`\`\`

## 5. Authentication Flow

### context/auth-context.tsx
\`\`\`typescript
import React, { createContext, useState, useEffect, useCallback } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { getUserProfile, createUserProfile } from '@/utils/firestore'
import { useRouter, useSegments } from 'expo-router'

export interface AuthContextType {
  currentUser: User | null
  loading: boolean
  userRole: 'patient' | 'caregiver' | null
  userData: any | null
  signUp: (
    email: string,
    password: string,
    role: string,
    userData: any
  ) => Promise<void>
  logIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'patient' | 'caregiver' | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid)
        setCurrentUser(user)
        setUserRole(profile?.role || null)
        setUserData(profile)
      } else {
        setCurrentUser(null)
        setUserRole(null)
        setUserData(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Handle navigation based on auth state
  useEffect(() => {
    if (loading) return

    const inAuthGroup = segments[0] === '(auth)'
    const inAppGroup = segments[0] === '(app)'

    if (!currentUser && !inAuthGroup) {
      router.replace('/(auth)/sign-in')
    } else if (currentUser && inAuthGroup) {
      router.replace('/(app)/dashboard')
    }
  }, [currentUser, loading, segments])

  const signUp = useCallback(
    async (email: string, password: string, role: string, userData: any) => {
      const { createUserWithEmailAndPassword } = await import('firebase/auth')
      const user = await createUserWithEmailAndPassword(auth, email, password)
      await createUserProfile(user.user.uid, { email, role, ...userData, createdAt: new Date() })
      setUserRole(role as any)
    },
    []
  )

  const logIn = useCallback(async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    await signInWithEmailAndPassword(auth, email, password)
    const profile = await getUserProfile(auth.currentUser!.uid)
    setUserRole(profile?.role || null)
  }, [])

  const logOut = useCallback(async () => {
    const { signOut } = await import('firebase/auth')
    await signOut(auth)
    setCurrentUser(null)
    setUserRole(null)
    setUserData(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, userRole, userData, signUp, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
\`\`\`

### app/_layout.tsx
\`\`\`typescript
import AuthProvider from '@/context/auth-context'
import '@/global.css'
import { Stack } from 'expo-router'
import { View } from 'react-native'

export default function RootLayout() {
  return (
    <AuthProvider>
      <View className="flex-1 w-full">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </View>
    </AuthProvider>
  )
}
\`\`\`

### app/index.tsx
\`\`\`typescript
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth-context'
import { View, ActivityIndicator } from 'react-native'

export default function Index() {
  const { currentUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        router.replace('/(app)/dashboard')
      } else {
        router.replace('/(auth)/sign-in')
      }
    }
  }, [currentUser, loading])

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  )
}
\`\`\`

## 6. Navigation Architecture (Expo Router)

### app/(auth)/_layout.tsx
\`\`\`typescript
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="role-selection" />
    </Stack>
  )
}
\`\`\`

### app/(app)/_layout.tsx
\`\`\`typescript
import BottomNavigation from '@/components/ui/BottomNavigation'
import { useAuth } from '@/context/auth-context'
import { Stack, usePathname } from 'expo-router'
import { View } from 'react-native'

export default function AppLayout() {
  const { userRole } = useAuth()
  const pathname = usePathname()

  // Hide bottom nav on certain screens
  const hideBottomNav = pathname?.includes('/settings/') || pathname?.includes('/analytics/')

  return (
    <View className="flex-1 w-full">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="rehabilitation" />
        <Stack.Screen name="connections" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="settings/profile" />
        <Stack.Screen name="settings/notifications" />
      </Stack>
      {!hideBottomNav && <BottomNavigation />}
    </View>
  )
}
\`\`\`

### components/ui/BottomNavigation.tsx
\`\`\`typescript
import { View, TouchableOpacity, Text } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/context/auth-context'

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { userRole } = useAuth()

  const tabs = [
    { name: 'dashboard', label: 'Home', icon: 'home' },
    { name: 'analytics', label: 'Analytics', icon: 'stats-chart' },
    { name: 'rehabilitation', label: 'Rehab', icon: 'fitness' },
    ...(userRole === 'patient'
      ? [{ name: 'connections', label: 'Caregivers', icon: 'people' }]
      : []),
    { name: 'settings', label: 'Settings', icon: 'settings' },
  ]

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around py-2 safe-area-bottom">
      {tabs.map((tab) => {
        const isActive = pathname === `/(app)/${tab.name}`
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(`/(app)/${tab.name}`)}
            className="items-center flex-1"
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={isActive ? '#4982BB' : '#6B7280'}
            />
            <Text
              className={`text-xs mt-1 ${
                isActive ? 'text-primary font-semibold' : 'text-neutral-medium'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
\`\`\`

## 7. Patient Screen Flows

### app/(app)/dashboard.tsx
\`\`\`typescript
import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  Dimensions,
} from 'react-native'
import { useAuth } from '@/context/auth-context'
import { getPressureHistory } from '@/utils/firestore'
import FootVisualization from '@/components/3d/FootVisualization'
import MetricCard from '@/components/cards/MetricCard'

export default function DashboardScreen() {
  const { currentUser } = useAuth()
  const [pressureData, setPressureData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedFoot, setSelectedFoot] = useState<'left' | 'right'>('left')

  useEffect(() => {
    loadPressureData()
  }, [])

  const loadPressureData = async () => {
    if (currentUser) {
      const data = await getPressureHistory(currentUser.uid, 1)
      if (data.length > 0) {
        setPressureData(data[data.length - 1])
      }
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    loadPressureData().then(() => setRefreshing(false))
  }, [])

  return (
    <ScrollView
      className="flex-1 bg-neutral-lighter"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View className="px-4 py-5 bg-primary">
        <Text className="text-2xl font-bold text-white mb-1">Welcome back</Text>
        <Text className="text-sm text-white/70">
          {new Date().toLocaleDateString()}
        </Text>
      </View>

      {/* 3D Foot Visualization */}
      <View className="my-5 px-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-neutral-dark">
            Plantar Pressure
          </Text>
          <View className="flex-row gap-2">
            <Text
              className={`text-sm px-3 py-1.5 rounded ${
                selectedFoot === 'left'
                  ? 'bg-primary text-white'
                  : 'bg-surface-secondary text-neutral-medium'
              }`}
              onPress={() => setSelectedFoot('left')}
            >
              Left
            </Text>
            <Text
              className={`text-sm px-3 py-1.5 rounded ${
                selectedFoot === 'right'
                  ? 'bg-primary text-white'
                  : 'bg-surface-secondary text-neutral-medium'
              }`}
              onPress={() => setSelectedFoot('right')}
            >
              Right
            </Text>
          </View>
        </View>
        <FootVisualization foot={selectedFoot} data={pressureData} />
      </View>

      {/* Quick Stats */}
      <View className="flex-row gap-3 px-4 mb-5">
        <MetricCard
          title="Max Pressure"
          value="487"
          unit="kPa"
          color="primary"
          icon="barbell"
        />
        <MetricCard
          title="Avg Pressure"
          value="285"
          unit="kPa"
          color="accent"
          icon="stats-chart"
        />
      </View>

      {/* Recent Alerts */}
      <View className="px-4 mb-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-neutral-dark">
            Recent Alerts
          </Text>
        </View>
        <View className="bg-surface-secondary rounded-lg p-3">
          <Text className="text-sm text-neutral-medium">
            No critical alerts in the last 24 hours
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
\`\`\`

## 8. Caregiver Screen Flows

### app/(app)/dashboard.tsx (Caregiver View)
\`\`\`typescript
import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth-context'
import PatientCard from '@/components/cards/PatientCard'
import AlertCard from '@/components/cards/AlertCard'

export default function CaregiverDashboardScreen() {
  const { currentUser } = useAuth()
  const router = useRouter()
  const [patients, setPatients] = useState<any[]>([])
  const [activeAlerts, setActiveAlerts] = useState<any[]>([])

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    // Fetch from Firebase
    // Mock data for example
    setPatients([
      {
        id: '1',
        name: 'John Doe',
        status: 'active',
        maxPressure: 487,
        riskLevel: 'low',
      },
      {
        id: '2',
        name: 'Jane Smith',
        status: 'active',
        maxPressure: 520,
        riskLevel: 'medium',
      },
    ])

    setActiveAlerts([
      {
        id: '1',
        patientName: 'Jane Smith',
        message: 'High pressure detected at heel',
        severity: 'warning',
        time: '2 hours ago',
      },
    ])
  }

  return (
    <ScrollView className="flex-1 bg-neutral-lighter">
      {/* Header */}
      <View className="px-4 py-5 bg-primary">
        <Text className="text-2xl font-bold text-white mb-1">Care Dashboard</Text>
        <Text className="text-sm text-white/70">
          Monitor your patients' progress
        </Text>
      </View>

      {/* Quick Stats */}
      <View className="flex-row px-4 my-5 gap-3">
        <View className="flex-1 bg-white py-4 px-3 rounded-lg items-center">
          <Text className="text-lg font-semibold text-primary mb-1">
            {patients.length}
          </Text>
          <Text className="text-xs text-neutral-medium">Patients</Text>
        </View>
        <View className="flex-1 bg-white py-4 px-3 rounded-lg items-center">
          <Text className="text-lg font-semibold text-primary mb-1">
            {activeAlerts.length}
          </Text>
          <Text className="text-xs text-neutral-medium">Active Alerts</Text>
        </View>
        <View className="flex-1 bg-white py-4 px-3 rounded-lg items-center">
          <Text className="text-lg font-semibold text-primary mb-1">92%</Text>
          <Text className="text-xs text-neutral-medium">Compliance</Text>
        </View>
      </View>

      {/* My Patients */}
      <View className="px-4 mb-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-neutral-dark">
            My Patients
          </Text>
          <TouchableOpacity onPress={() => router.push('/(app)/patients')}>
            <Text className="text-sm text-primary">See All</Text>
          </TouchableOpacity>
        </View>
        {patients.slice(0, 3).map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onPress={() => router.push(`/(app)/patient/${patient.id}`)}
          />
        ))}
      </View>

      {/* Recent Alerts */}
      <View className="px-4 mb-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-neutral-dark">
            Recent Alerts
          </Text>
          <TouchableOpacity onPress={() => router.push('/(app)/alerts')}>
            <Text className="text-sm text-primary">View All</Text>
          </TouchableOpacity>
        </View>
        {activeAlerts.slice(0, 3).map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </View>
    </ScrollView>
  )
}
\`\`\`

## 9. 3D Visualization Components

### components/3d/FootVisualization.tsx
\`\`\`typescript
import React, { useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Canvas, useFrame } from '@react-three/fiber/native'
import * as THREE from 'three'

const FootModel = ({
  pressureData,
  foot,
}: {
  pressureData: any
  foot: 'left' | 'right'
}) => {
  const groupRef = useRef<THREE.Group>(null)

  const createFootGeometry = () => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      -0.2, -1.0, 0,
      0.2, -1.0, 0,
      -0.3, -0.3, 0,
      0.3, -0.3, 0,
      -0.25, 0.5, 0,
      0.25, 0.5, 0,
      0, 0.9, 0,
    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    return geometry
  }

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
    }
  })

  const getPressureColor = (pressure: number) => {
    if (pressure < 250) return '#0EA5E9'
    if (pressure < 350) return '#84CC16'
    if (pressure < 450) return '#FBBF24'
    return '#EF4444'
  }

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <bufferGeometry args={[createFootGeometry()]} />
        <meshStandardMaterial color="#4982BB" opacity={0.6} transparent />
      </mesh>

      {pressureData?.sensorReadings?.map((reading: any, idx: number) => (
        <mesh
          key={idx}
          position={[reading.x, reading.y, reading.z + 0.1]}
          scale={0.05}
        >
          <sphereGeometry />
          <meshStandardMaterial
            color={getPressureColor(reading.pressure)}
            emissive={getPressureColor(reading.pressure)}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
    </group>
  )
}

const FootVisualization = ({
  foot,
  data,
}: {
  foot: 'left' | 'right'
  data: any
}) => {
  return (
    <View className="h-64 rounded-xl overflow-hidden bg-transparent">
      <Canvas
        style={{ flex: 1 }}
        gl={{ transparent: true }}
        camera={{ position: [0, 0, 2], fov: 50 }}
      >
        <FootModel pressureData={data} foot={foot} />
      </Canvas>
    </View>
  )
}

export default FootVisualization
\`\`\`

## 10. Key Components Library

### components/cards/MetricCard.tsx
\`\`\`typescript
import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface MetricCardProps {
  title: string
  value: string
  unit: string
  color: 'primary' | 'accent' | 'success' | 'warning' | 'error'
  icon: string
}

const colorMap = {
  primary: '#4982BB',
  accent: '#e7a38d',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
}

export default function MetricCard({
  title,
  value,
  unit,
  color,
  icon,
}: MetricCardProps) {
  return (
    <View
      className="flex-1 bg-white rounded-xl p-4 border-l-4 flex-row items-center"
      style={{ borderLeftColor: colorMap[color] }}
    >
      <View className="mr-3">
        <Ionicons name={icon as any} size={24} color={colorMap[color]} />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-neutral-medium mb-1">{title}</Text>
        <View className="flex-row items-baseline">
          <Text className="text-lg font-semibold text-neutral-dark">{value}</Text>
          <Text className="text-sm text-neutral-medium ml-1">{unit}</Text>
        </View>
      </View>
    </View>
  )
}
\`\`\`

### components/cards/PatientCard.tsx
\`\`\`typescript
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface PatientCardProps {
  patient: {
    id: string
    name: string
    status: string
    maxPressure: number
    riskLevel: string
  }
  onPress: () => void
}

const riskColorMap = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
}

export default function PatientCard({ patient, onPress }: PatientCardProps) {
  const riskColor = riskColorMap[patient.riskLevel as keyof typeof riskColorMap] || '#6B7280'

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 shadow-sm"
      onPress={onPress}
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-neutral-dark">{patient.name}</Text>
        <View
          className="px-2.5 py-1 rounded"
          style={{ backgroundColor: riskColor }}
        >
          <Text className="text-xs text-white capitalize">{patient.riskLevel}</Text>
        </View>
      </View>
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="text-xs text-neutral-medium mb-1">Max Pressure</Text>
          <Text className="text-base text-neutral-dark">
            {patient.maxPressure} kPa
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs text-neutral-medium mb-1">Status</Text>
          <Text
            className={`text-base ${
              patient.status === 'active' ? 'text-success' : 'text-neutral-medium'
            }`}
          >
            {patient.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
\`\`\`

### components/ui/Button.tsx
\`\`\`typescript
import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  loading?: boolean
  disabled?: boolean
  className?: string
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-accent',
    outline: 'bg-transparent border-2 border-primary',
  }

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-primary',
  }

  return (
    <TouchableOpacity
      className={`${variantStyles[variant]} px-6 py-3 rounded-lg items-center justify-center ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#4982BB' : '#FFFFFF'} />
      ) : (
        <Text className={`text-base font-semibold ${textStyles[variant]}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
\`\`\`

### components/ui/TextInput.tsx
\`\`\`typescript
import React from 'react'
import { TextInput as RNTextInput, View, Text } from 'react-native'

interface TextInputProps {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  className?: string
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  className = '',
}: TextInputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-sm font-semibold text-neutral-dark mb-2">
          {label}
        </Text>
      )}
      <RNTextInput
        className={`bg-input-bg border border-border rounded-lg px-4 py-3 text-base ${
          error ? 'border-error' : ''
        }`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text className="text-xs text-error mt-1">{error}</Text>}
    </View>
  )
}
\`\`\`

## 11. Firebase Data Schemas

### User Collection
\`\`\`
users/
  ├── {userId}/
  │   ├── email: string
  │   ├── role: 'patient' | 'caregiver'
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
1. Login Screen (app/(auth)/sign-in.tsx)
   ↓
2. Role Selection (app/(auth)/role-selection.tsx)
   ↓
3. Role-based Navigation (app/(app)/_layout.tsx)
   ├── Patient Role → Dashboard, Analytics, Rehab, Connections, Settings
   └── Caregiver Role → Care Dashboard, My Patients, Alerts, Reports, Settings

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
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Configuration
EXPO_PUBLIC_APP_NAME=GabAI Sense Guard
EXPO_PUBLIC_APP_VERSION=1.0.0

# Feature Flags
EXPO_PUBLIC_ENABLE_3D_VISUALIZATION=true
EXPO_PUBLIC_ENABLE_CAREGIVER_FEATURES=true
EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=true
\`\`\`

## 15. Performance Optimization

### Image Optimization
- Use PNG for UI assets
- WebP for complex graphics
- Lazy load images in lists using expo-image

### Data Fetching
- Implement pagination for large datasets
- Cache frequently accessed data using AsyncStorage
- Use Firebase Realtime listeners for live updates

### 3D Optimization
- Simplify foot geometry
- Use LOD (Level of Detail) models
- Implement culling for off-screen objects

### NativeWind Optimization
- Use className prop for styling (compiled at build time)
- Avoid inline styles when possible
- Use Tailwind's utility classes for consistent spacing

## 16. Testing Strategy

### Unit Tests
\`\`\`bash
npm install --save-dev @testing-library/react-native jest
\`\`\`

### E2E Tests
\`\`\`bash
npm install --save-dev detox detox-cli
\`\`\`

## 17. Development Workflow

### Running the App
\`\`\`bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
\`\`\`

### Building Native Projects
\`\`\`bash
# Generate native projects
npx expo prebuild

# Clean and rebuild
npx expo prebuild --clean
\`\`\`

### TypeScript Path Aliases
Use `@/` prefix for imports:
\`\`\`typescript
import { useAuth } from '@/context/auth-context'
import Button from '@/components/ui/Button'
import { getPressureHistory } from '@/utils/firestore'
\`\`\`

---

## Summary

This comprehensive guide provides everything needed to build GabAI Sense Guard as a React Native app with:
- **Expo Router** for file-based navigation
- **NativeWind (Tailwind CSS)** for styling
- **Expo SDK 54** with React Native 0.81.5
- Unified authentication for both patients and caregivers
- Role-based navigation and features
- Real-time pressure visualization with React Three Fiber
- Firebase backend integration
- Professional branding with the logo and color palette
- HIPAA-compliant data handling

The integrated approach allows both users to access the app seamlessly while maintaining role-specific functionality.
