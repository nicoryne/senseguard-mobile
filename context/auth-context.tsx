import React, { createContext, useState, useEffect, useCallback } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { getUserProfile, createUserProfile } from '@/utils/firestore'
import { useRouter, useSegments } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRole } from '@/types/user'
import { ROLE_STORAGE_KEY } from '@/utils/constants'

export interface AuthContextType {
  currentUser: User | null
  loading: boolean
  userRole: 'patient' | 'caregiver' | null
  selectedRole: 'patient' | 'caregiver' | null
  userData: any | null
  switchRole: (role: 'patient' | 'caregiver') => Promise<void>
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
  const [selectedRole, setSelectedRole] = useState<'patient' | 'caregiver' | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const router = useRouter()
  const segments = useSegments()

  // Load selected role from storage on mount
  useEffect(() => {
    const loadSelectedRole = async () => {
      try {
        const stored = await AsyncStorage.getItem(ROLE_STORAGE_KEY)
        if (stored && (stored === 'patient' || stored === 'caregiver')) {
          setSelectedRole(stored as 'patient' | 'caregiver')
        }
      } catch (error) {
        console.error('Error loading selected role:', error)
      }
    }
    loadSelectedRole()
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid)
          setCurrentUser(user)
          const role = (profile?.role as UserRole) || null
          setUserRole(role)
          setUserData(profile)

          // Set selectedRole if not already set
          if (!selectedRole && role) {
            setSelectedRole(role)
            await AsyncStorage.setItem(ROLE_STORAGE_KEY, role)
          }
        } catch (error) {
          console.error('Error loading user profile:', error)
          setCurrentUser(user)
        }
      } else {
        setCurrentUser(null)
        setUserRole(null)
        setUserData(null)
        setSelectedRole(null)
        await AsyncStorage.removeItem(ROLE_STORAGE_KEY)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [selectedRole])

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
  }, [currentUser, loading, segments, router])

  const switchRole = useCallback(async (role: 'patient' | 'caregiver') => {
    setSelectedRole(role)
    try {
      await AsyncStorage.setItem(ROLE_STORAGE_KEY, role)
    } catch (error) {
      console.error('Error saving selected role:', error)
    }
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, role: string, userData: any) => {
      try {
        const { createUserWithEmailAndPassword } = await import('firebase/auth')
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await createUserProfile(userCredential.user.uid, {
          email,
          role,
          ...userData,
          createdAt: new Date(),
        })
        const profile = await getUserProfile(userCredential.user.uid)
        setUserRole(role as UserRole)
        setSelectedRole(role as UserRole)
        setUserData(profile)
        await AsyncStorage.setItem(ROLE_STORAGE_KEY, role)
      } catch (error) {
        // Re-throw error so form can handle it
        throw error
      }
    },
    []
  )

  const logIn = useCallback(async (email: string, password: string) => {
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(auth, email, password)
      if (auth.currentUser) {
        const profile = await getUserProfile(auth.currentUser.uid)
        const role = (profile?.role as UserRole) || null
        setUserRole(role)
        setSelectedRole(role)
        setUserData(profile)
        if (role) {
          await AsyncStorage.setItem(ROLE_STORAGE_KEY, role)
        }
      }
    } catch (error) {
      // Re-throw error so form can handle it
      throw error
    }
  }, [])

  const logOut = useCallback(async () => {
    const { signOut } = await import('firebase/auth')
    await signOut(auth)
    setCurrentUser(null)
    setUserRole(null)
    setUserData(null)
    setSelectedRole(null)
    await AsyncStorage.removeItem(ROLE_STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        userRole,
        selectedRole,
        userData,
        switchRole,
        signUp,
        logIn,
        logOut,
      }}
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

