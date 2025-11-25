import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth-context'
import ConnectionForm from '@/components/forms/ConnectionForm'
import PatientCard from '@/components/cards/PatientCard'
import { useCaregiverData } from '@/hooks/useCaregiver'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function ConnectionsScreen() {
  const { selectedRole } = useAuth()
  const router = useRouter()
  const { requests, patients } = useCaregiverData()

  // Patient View - Caregiver Connections
  if (selectedRole === 'patient') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Caregiver Connections</Text>
        <View style={styles.card}>
          {requests.map((request) => (
            <View key={request.id} style={styles.requestRow}>
              <View>
                <Text style={styles.name}>{request.caregiverName}</Text>
                <Text style={styles.meta}>
                  Status: {request.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.meta}>{request.patientName}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Invite Caregiver</Text>
        <ConnectionForm onSubmit={() => {}} />
      </ScrollView>
    )
  }

  // Caregiver View - Patient List
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Patients</Text>
      <Text style={styles.subtitle}>Manage your connected patients</Text>
      <View style={styles.patientList}>
        {patients.map((patient) => (
          <TouchableOpacity
            key={patient.id}
            onPress={() => router.push(`/(app)/patient/${patient.id}`)}
          >
            <PatientCard patient={patient} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 16,
  },
  requestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    marginBottom: 4,
  },
  meta: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 12,
  },
  patientList: {
    gap: 12,
  },
})

