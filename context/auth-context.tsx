import React, { createContext, useState, useEffect, useCallback } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { getUserProfile, createUserProfile } from '@/utils/firestore'
import { useRouter, useSegments } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface AuthContextType {
  currentUser: User | null
  loading: boolean
  userData: any | null
  signUp: (
    email: string,
    password: string,
    userData: any
  ) => Promise<void>
  logIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage keys
const AUTH_STORAGE_KEY = 'auth_user'
const USER_DATA_STORAGE_KEY = 'auth_user_data'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any | null>(null)
  const router = useRouter()
  const segments = useSegments()

  // Restore auth state from AsyncStorage on mount
  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        const [storedUser, storedUserData] = await Promise.all([
          AsyncStorage.getItem(AUTH_STORAGE_KEY),
          AsyncStorage.getItem(USER_DATA_STORAGE_KEY),
        ])

        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            // Set user data immediately for faster UI
            if (storedUserData) {
              setUserData(JSON.parse(storedUserData))
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
        // Set user immediately for faster UI
        setCurrentUser(user)
        
        // Store basic user info immediately (non-blocking)
        const userToStore = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
        AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore)).catch(console.error)
        
        // Fetch profile in background (non-blocking)
        getUserProfile(user.uid)
          .then((profile) => {
            setUserData(profile)
            // Store profile data in background
            AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(profile)).catch(console.error)
          })
          .catch((error) => {
            console.error('Error loading user profile:', error)
            // Try to use cached profile if available
            AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
              .then((cached) => {
                if (cached) {
                  try {
                    setUserData(JSON.parse(cached))
                  } catch (e) {
                    console.error('Error parsing cached profile:', e)
                  }
                }
              })
              .catch(console.error)
          })
      } else {
        setCurrentUser(null)
        setUserData(null)
        // Clear all auth-related storage (non-blocking)
        Promise.all([
          AsyncStorage.removeItem(AUTH_STORAGE_KEY),
          AsyncStorage.removeItem(USER_DATA_STORAGE_KEY),
        ]).catch(console.error)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Handle navigation based on auth state
  useEffect(() => {
    if (loading) return

    const inAuthGroup = segments[0] === '(auth)'
    const inTabsGroup = segments[0] === '(tabs)'

    if (!currentUser && !inAuthGroup) {
      router.replace('/(auth)/sign-in')
    } else if (currentUser && inAuthGroup) {
      router.replace('/(tabs)/home')
    }
  }, [currentUser, loading, segments, router])

  const signUp = useCallback(
    async (email: string, password: string, userData: any) => {
      try {
        const { createUserWithEmailAndPassword } = await import('firebase/auth')
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Create profile (must complete for new users)
        await createUserProfile(userCredential.user.uid, {
          email,
          ...userData,
          createdAt: new Date(),
        })
        // Don't wait for profile fetch - let onAuthStateChanged handle it for faster navigation
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
      // Don't wait for profile fetch - let onAuthStateChanged handle it
      // This allows immediate navigation
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
      setUserData(null)
      
      // Clear all auth-related storage
      await Promise.all([
        AsyncStorage.removeItem(AUTH_STORAGE_KEY),
        AsyncStorage.removeItem(USER_DATA_STORAGE_KEY),
      ])
    } catch (error) {
      console.error('Error during logout:', error)
      // Still clear local state even if storage clear fails
      setCurrentUser(null)
      setUserData(null)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        userData,
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

