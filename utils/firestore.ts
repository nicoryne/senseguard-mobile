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

