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

// Storage keys
const AUTH_STORAGE_KEY = 'auth_user'
const USER_DATA_STORAGE_KEY = 'auth_user_data'
const USER_ROLE_STORAGE_KEY = 'auth_user_role'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'patient' | 'caregiver' | null>(null)
  const [selectedRole, setSelectedRole] = useState<'patient' | 'caregiver' | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const router = useRouter()
  const segments = useSegments()

  // Restore auth state from AsyncStorage on mount
  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        const [storedUser, storedUserData, storedUserRole, storedSelectedRole] = await Promise.all([
          AsyncStorage.getItem(AUTH_STORAGE_KEY),
          AsyncStorage.getItem(USER_DATA_STORAGE_KEY),
          AsyncStorage.getItem(USER_ROLE_STORAGE_KEY),
          AsyncStorage.getItem(ROLE_STORAGE_KEY),
        ])

        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            // Set user data immediately for faster UI
            if (storedUserData) {
              setUserData(JSON.parse(storedUserData))
            }
            if (storedUserRole && (storedUserRole === 'patient' || storedUserRole === 'caregiver')) {
              setUserRole(storedUserRole as 'patient' | 'caregiver')
            }
            if (storedSelectedRole && (storedSelectedRole === 'patient' || storedSelectedRole === 'caregiver')) {
              setSelectedRole(storedSelectedRole as 'patient' | 'caregiver')
            }
          } catch (error) {
            console.error('Error parsing stored auth data:', error)
          }
        }
      } catch (error) {
        console.error('Error restoring auth state:', error)
      }
    }
    restoreAuthState()
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

          // Persist auth state to AsyncStorage
          const userToStore = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
          await Promise.all([
            AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore)),
            AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(profile)),
            role && AsyncStorage.setItem(USER_ROLE_STORAGE_KEY, role),
          ])

          // Set selectedRole if not already set
          if (!selectedRole && role) {
            setSelectedRole(role)
            await AsyncStorage.setItem(ROLE_STORAGE_KEY, role)
          }
        } catch (error) {
          console.error('Error loading user profile:', error)
          setCurrentUser(user)
          // Still store basic user info even if profile fails
          const userToStore = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
          await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore))
        }
      } else {
        setCurrentUser(null)
        setUserRole(null)
        setUserData(null)
        setSelectedRole(null)
        // Clear all auth-related storage
        await Promise.all([
          AsyncStorage.removeItem(AUTH_STORAGE_KEY),
          AsyncStorage.removeItem(USER_DATA_STORAGE_KEY),
          AsyncStorage.removeItem(USER_ROLE_STORAGE_KEY),
          AsyncStorage.removeItem(ROLE_STORAGE_KEY),
        ])
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
      // Also update user role storage if user is logged in
      if (currentUser) {
        await AsyncStorage.setItem(USER_ROLE_STORAGE_KEY, role)
      }
    } catch (error) {
      console.error('Error saving selected role:', error)
    }
  }, [currentUser])

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

        // Persist auth state
        const userToStore = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        }
        await Promise.all([
          AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore)),
          AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(profile)),
          AsyncStorage.setItem(USER_ROLE_STORAGE_KEY, role),
          AsyncStorage.setItem(ROLE_STORAGE_KEY, role),
        ])
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      if (user) {
        const profile = await getUserProfile(user.uid)
        const role = (profile?.role as UserRole) || null
        setUserRole(role)
        setSelectedRole(role)
        setUserData(profile)

        // Persist auth state
        const userToStore = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
        await Promise.all([
          AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore)),
          AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(profile)),
          role && AsyncStorage.setItem(USER_ROLE_STORAGE_KEY, role),
          role && AsyncStorage.setItem(ROLE_STORAGE_KEY, role),
        ])
      }
    } catch (error) {
      // Re-throw error so form can handle it
      throw error
    }
  }, [])

  const logOut = useCallback(async () => {
    try {
      const { signOut } = await import('firebase/auth')
      await signOut(auth)
      setCurrentUser(null)
      setUserRole(null)
      setUserData(null)
      setSelectedRole(null)
      
      // Clear all auth-related storage
      await Promise.all([
        AsyncStorage.removeItem(AUTH_STORAGE_KEY),
        AsyncStorage.removeItem(USER_DATA_STORAGE_KEY),
        AsyncStorage.removeItem(USER_ROLE_STORAGE_KEY),
        AsyncStorage.removeItem(ROLE_STORAGE_KEY),
      ])
    } catch (error) {
      console.error('Error during logout:', error)
      // Still clear local state even if storage clear fails
      setCurrentUser(null)
      setUserRole(null)
      setUserData(null)
      setSelectedRole(null)
    }
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

