import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { useAuth } from '@/context/auth-context'
import AlertCard from '@/components/cards/AlertCard'
import { useCaregiverData } from '@/hooks/useCaregiver'
import { usePressureData } from '@/hooks/usePressureData'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function AlertsScreen() {
  const { selectedRole } = useAuth()
  const { alerts } = useCaregiverData()
  const { latest } = usePressureData()

  // Patient View - Personal Alerts
  if (selectedRole === 'patient') {
    const personalAlerts = alerts.filter((alert) => alert.patientName === 'You')
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My Alerts</Text>
        {personalAlerts.length > 0 ? (
          personalAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No alerts at this time</Text>
          </View>
        )}
      </ScrollView>
    )
  }

  // Caregiver View - Patient Alerts
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Patient Alerts</Text>
      {alerts.length > 0 ? (
        alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No active alerts</Text>
        </View>
      )}
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
    marginBottom: 16,
  },
  emptyCard: {
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
  },
})

