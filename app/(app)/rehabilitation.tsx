import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@/context/auth-context'
import SessionCard from '@/components/cards/SessionCard'
import RehabSessionForm from '@/components/forms/RehabSessionForm'
import PatientCard from '@/components/cards/PatientCard'
import { useCaregiverData } from '@/hooks/useCaregiver'
import { mockRehabSessions } from '@/lib/mock-data'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'
import { RehabSession } from '@/types/sensor'

export default function RehabilitationScreen() {
  const { selectedRole } = useAuth()
  const { patients } = useCaregiverData()
  const [sessions, setSessions] = useState<RehabSession[]>(mockRehabSessions)

  const addSession = (title: string, duration: number) => {
    setSessions((prev) => [
      ...prev,
      {
        id: `rehab-${prev.length + 1}`,
        title,
        duration,
        completed: false,
        focusArea: 'Custom',
      },
    ])
  }

  // Patient View - Rehab Sessions
  if (selectedRole === 'patient') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Rehabilitation Plan</Text>
        <Text style={styles.subtitle}>
          Guided exercises curated by your care team
        </Text>
        <View style={styles.sessionsList}>
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </View>
        <Text style={styles.sectionTitle}>Add Quick Session</Text>
        <RehabSessionForm onSchedule={addSession} />
      </ScrollView>
    )
  }

  // Caregiver View - Reports
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Patient Reports</Text>
      <Text style={styles.subtitle}>Compliance and progress tracking</Text>
      <View style={styles.patientList}>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </View>
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Overall Compliance</Text>
        <Text style={styles.reportValue}>92%</Text>
        <Text style={styles.reportSubtext}>Across all patients</Text>
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
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginTop: 24,
    marginBottom: 12,
  },
  sessionsList: {
    gap: 12,
    marginVertical: 16,
  },
  patientList: {
    gap: 12,
    marginBottom: 16,
  },
  reportCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  reportTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 8,
  },
  reportValue: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginBottom: 4,
  },
  reportSubtext: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
})

