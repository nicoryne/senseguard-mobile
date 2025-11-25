import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@/context/auth-context'
import ActivityChart from '@/components/charts/ActivityChart'
import GaitQualityChart from '@/components/charts/GaitQualityChart'
import GaitVisualization from '@/components/3d/GaitVisualization'
import PatientCard from '@/components/cards/PatientCard'
import Logo from '@/components/ui/Logo'
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
        <View style={styles.header}>
          <Logo size={50} />
          <View style={styles.headerText}>
            <Text style={styles.title}>Gait Analytics</Text>
            <Text style={styles.subtitle}>Live symmetry & stability</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <GaitVisualization symmetry={86} stability={79} />
        </View>
        <Text style={styles.sectionTitle}>Weekly Quality Trend</Text>
        <View style={styles.chartContainer}>
          <GaitQualityChart />
        </View>
        <Text style={styles.sectionTitle}>Activity Adherence</Text>
        <View style={styles.chartContainer}>
          <ActivityChart />
        </View>
      </ScrollView>
    )
  }

  // Caregiver View
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Logo size={50} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Patient Analytics</Text>
          <Text style={styles.subtitle}>Overview of patient gait metrics</Text>
        </View>
      </View>
      <View style={styles.patientList}>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </View>
      <Text style={styles.sectionTitle}>Aggregate Quality Trends</Text>
      <View style={styles.chartContainer}>
        <GaitQualityChart />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    marginBottom: 4,
  },
  subtitle: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginTop: 8,
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  patientList: {
    gap: 12,
    marginBottom: 20,
  },
})

