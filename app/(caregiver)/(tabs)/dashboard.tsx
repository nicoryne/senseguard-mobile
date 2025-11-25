import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import AlertCard from '../../../components/cards/AlertCard';
import PatientCard from '../../../components/cards/PatientCard';
import TopHeader from '../../../components/headers/TopHeader';
import MetricCard from '../../../components/cards/MetricCard';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function CaregiverDashboardScreen() {
  const router = useRouter();
  const { patients, alerts } = useCaregiverData();

  // Aggregate metrics across all patients
  const totalPatients = patients.length;
  const activeAlerts = alerts.length;
  const highRiskPatients = patients.filter((p: any) => p.riskLevel === 'high').length;
  const avgCompliance = 92; // Mock data

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="Caregiver Hub"
        subtitle="Overview of patient insights"
        actionLabel="Patients"
        onActionPress={() => router.push('/(caregiver)/(tabs)/patients')}
        showLogo={true}
        backgroundType="dark"
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <MetricCard
              title="Total Patients"
              value={String(totalPatients)}
              unit=""
              color="primary"
              icon="people"
            />
            <MetricCard
              title="Active Alerts"
              value={String(activeAlerts)}
              unit=""
              color="primary"
              icon="warning"
            />
            <MetricCard
              title="High Risk"
              value={String(highRiskPatients)}
              unit=""
              color="primary"
              icon="alert-circle"
            />
            <MetricCard
              title="Compliance"
              value={String(avgCompliance)}
              unit="%"
              color="primary"
              icon="checkmark-circle"
            />
          </View>
        </View>

        {/* Sensor Streams Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sensor Streams Overview</Text>
          <View style={styles.streamsContainer}>
            <View style={styles.streamCard}>
              <View style={styles.streamHeader}>
                <Ionicons name="walk" size={20} color={COLORS.primary} />
                <Text style={styles.streamTitle}>Gait Asymmetry</Text>
              </View>
              <Text style={styles.streamValue}>
                {patients.filter((p: any) => p.gaitAsymmetry > 15).length} patients flagged
              </Text>
            </View>
            <View style={styles.streamCard}>
              <View style={styles.streamHeader}>
                <Ionicons name="thermometer" size={20} color={COLORS.error} />
                <Text style={styles.streamTitle}>Hotspots</Text>
              </View>
              <Text style={styles.streamValue}>
                {alerts.filter((a: any) => a.type === 'hotspot').length} detected
              </Text>
            </View>
            <View style={styles.streamCard}>
              <View style={styles.streamHeader}>
                <Ionicons name="pulse" size={20} color={COLORS.primary} />
                <Text style={styles.streamTitle}>VPT Testing</Text>
              </View>
              <Text style={styles.streamValue}>
                {patients.filter((p: any) => p.vptScore).length} tracked
              </Text>
            </View>
          </View>
        </View>

        {/* Active Patients */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Patients</Text>
            <Text
              style={styles.seeAllLink}
              onPress={() => router.push('/(caregiver)/(tabs)/patients')}
            >
              See All →
            </Text>
          </View>
          {patients.slice(0, 3).map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </View>

        {/* Recent Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <Text
              style={styles.seeAllLink}
              onPress={() => router.push('/(caregiver)/(tabs)/alerts')}
            >
              View All →
            </Text>
          </View>
          {alerts.length > 0 ? (
            alerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No alerts at this time</Text>
            </View>
          )}
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 16,
  },
  seeAllLink: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  streamsContainer: {
    gap: 12,
  },
  streamCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  streamTitle: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
  },
  streamValue: {
    ...FONTS.h3,
    color: COLORS.primary,
    fontWeight: '700',
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
  bottomPadding: {
    height: 20,
  },
});



