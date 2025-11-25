import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@/context/auth-context'
import ActivityChart from '@/components/charts/ActivityChart'
import GaitQualityChart from '@/components/charts/GaitQualityChart'
import GaitVisualization from '@/components/3d/GaitVisualization'
import PatientCard from '@/components/cards/PatientCard'
import { useCaregiverData } from '@/hooks/useCaregiver'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function AnalyticsScreen() {
  const { selectedRole } = useAuth()
  const { patients } = useCaregiverData()

  // Patient View
  if (selectedRole === 'patient') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Gait Analytics</Text>
        <Text style={styles.subtitle}>Live symmetry & stability</Text>
        <GaitVisualization symmetry={86} stability={79} />
        <Text style={styles.sectionTitle}>Weekly Quality Trend</Text>
        <GaitQualityChart />
        <Text style={styles.sectionTitle}>Activity Adherence</Text>
        <ActivityChart />
      </ScrollView>
    )
  }

  // Caregiver View
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Patient Analytics</Text>
      <Text style={styles.subtitle}>Overview of patient gait metrics</Text>
      <View style={styles.patientList}>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </View>
      <Text style={styles.sectionTitle}>Aggregate Quality Trends</Text>
      <GaitQualityChart />
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
    marginVertical: 16,
  },
  patientList: {
    gap: 12,
    marginBottom: 16,
  },
})

