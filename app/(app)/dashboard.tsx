import React, { useState, useEffect, useMemo } from 'react'
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth-context'
import { usePressureData } from '@/hooks/usePressureData'
import { useCaregiverData } from '@/hooks/useCaregiver'
import FootVisualization from '@/components/3d/FootVisualization'
import MetricCard from '@/components/cards/MetricCard'
import AlertCard from '@/components/cards/AlertCard'
import PatientCard from '@/components/cards/PatientCard'
import { COLORS } from '@/lib/colors'
import { FONTS } from '@/lib/fonts'

export default function DashboardScreen() {
  const { selectedRole } = useAuth()
  const router = useRouter()
  const { latest } = usePressureData()
  const { patients, alerts } = useCaregiverData()
  const [selectedFoot, setSelectedFoot] = useState<'left' | 'right'>('left')
  const [refreshing, setRefreshing] = useState(false)

  const stats = useMemo(
    () => [
      {
        title: 'Max Pressure',
        value: latest?.summary.max ?? 0,
        unit: 'kPa',
        color: COLORS.primary,
      },
      {
        title: 'Avg Pressure',
        value: latest?.summary.avg ?? 0,
        unit: 'kPa',
        color: COLORS.accent,
      },
    ],
    [latest]
  )

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 600)
  }

  // Patient View
  if (selectedRole === 'patient') {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.hero}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Plantar Pressure</Text>
            <View style={styles.toggle}>
              {(['left', 'right'] as const).map((foot) => (
                <TouchableOpacity
                  key={foot}
                  onPress={() => setSelectedFoot(foot)}
                  style={[
                    styles.toggleItem,
                    selectedFoot === foot && styles.toggleItemActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      selectedFoot === foot && styles.toggleTextActive,
                    ]}
                  >
                    {foot.charAt(0).toUpperCase() + foot.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <FootVisualization foot={selectedFoot} />
        </View>

        <View style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <MetricCard
              key={idx}
              title={stat.title}
              value={String(stat.value)}
              unit={stat.unit}
              color="primary"
              icon="barbell"
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          {alerts.length > 0 ? (
            alerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No critical alerts in the last 24 hours
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    )
  }

  // Caregiver View
  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.hero}>
        <View>
          <Text style={styles.greeting}>Care Dashboard</Text>
          <Text style={styles.date}>Monitor your patients' progress</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{patients.length}</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{alerts.length}</Text>
          <Text style={styles.statLabel}>Active Alerts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>92%</Text>
          <Text style={styles.statLabel}>Compliance</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Patients</Text>
          <TouchableOpacity onPress={() => router.push('/(app)/connections')}>
            <Text style={styles.link}>See All</Text>
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

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <TouchableOpacity onPress={() => router.push('/(app)/alerts')}>
            <Text style={styles.link}>View All</Text>
          </TouchableOpacity>
        </View>
        {alerts.slice(0, 3).map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  hero: {
    padding: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...FONTS.h2,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  date: {
    ...FONTS.bodySmall,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
  },
  toggle: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: COLORS.surface.secondary,
  },
  toggleItemActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  link: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
  },
  emptyCard: {
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 12,
    padding: 16,
  },
  emptyText: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
})

