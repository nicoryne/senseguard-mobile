import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import AlertCard from '../../../components/cards/AlertCard';
import PatientCard from '../../../components/cards/PatientCard';
import MetricCard from '../../../components/cards/MetricCard';
import Logo from '../../../components/ui/Logo';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';
import { DESIGN_TOKENS } from '../../../lib/design-tokens';

export default function CaregiverDashboardScreen() {
  const router = useRouter();
  const { patients, alerts } = useCaregiverData();

  // Aggregate metrics across all patients
  const totalPatients = patients.length;
  const activeAlerts = alerts.length;
  const highRiskPatients = patients.filter((p: any) => p.riskLevel === 'high').length;
  const avgCompliance = 92; // Mock data
  const gaitAsymmetryCount = patients.filter((p: any) => p.gaitAsymmetry > 15).length;
  const hotspotCount = alerts.filter((a: any) => a.type === 'hotspot').length;
  const vptTrackedCount = patients.filter((p: any) => p.vptScore).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={DESIGN_TOKENS.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={styles.logoContainer}>
                <Logo size={44} variant="transparent" />
              </View>
              <View>
                <Text style={styles.headerTitle}>Caregiver Hub</Text>
                <Text style={styles.headerSubtitle}>Patient health overview</Text>
              </View>
            </View>
            <Pressable
              style={styles.actionButton}
              onPress={() => router.push('/(caregiver)/(tabs)/patients')}
            >
              <Ionicons name="people" size={20} color={COLORS.neutral.lightest} />
              <Text style={styles.actionButtonText}>All Patients</Text>
            </Pressable>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <Ionicons name="people" size={20} color={COLORS.neutral.lightest} />
              <Text style={styles.quickStatValue}>{totalPatients}</Text>
              <Text style={styles.quickStatLabel}>Patients</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Ionicons name="warning" size={20} color={COLORS.error} />
              <Text style={styles.quickStatValue}>{activeAlerts}</Text>
              <Text style={styles.quickStatLabel}>Alerts</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.quickStatValue}>{avgCompliance}%</Text>
              <Text style={styles.quickStatLabel}>Compliance</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Key Metrics Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Overview Metrics</Text>
              <Text style={styles.sectionSubtitle}>Aggregate patient data</Text>
            </View>
          </View>
          <View style={styles.metricsGrid}>
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
              color="error"
              icon="warning"
            />
            <MetricCard
              title="High Risk"
              value={String(highRiskPatients)}
              unit=""
              color="warning"
              icon="alert-circle"
            />
            <MetricCard
              title="Compliance"
              value={String(avgCompliance)}
              unit="%"
              color="success"
              icon="checkmark-circle"
            />
          </View>
        </View>

        {/* Sensor Streams Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Sensor Streams</Text>
              <Text style={styles.sectionSubtitle}>Multi-patient monitoring status</Text>
            </View>
            <Ionicons name="pulse" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.streamsContainer}>
            <View style={styles.streamCard}>
              <LinearGradient
                colors={[`${COLORS.primary}15`, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.streamGradient}
              >
                <View style={styles.streamHeader}>
                  <View style={[styles.streamIcon, { backgroundColor: `${COLORS.primary}20` }]}>
                    <Ionicons name="walk" size={24} color={COLORS.primary} />
                  </View>
                  <View style={styles.streamContent}>
                    <Text style={styles.streamTitle}>Gait Asymmetry</Text>
                    <Text style={styles.streamValue}>
                      {gaitAsymmetryCount} patient{gaitAsymmetryCount !== 1 ? 's' : ''} flagged
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.streamCard}>
              <LinearGradient
                colors={[`${COLORS.error}15`, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.streamGradient}
              >
                <View style={styles.streamHeader}>
                  <View style={[styles.streamIcon, { backgroundColor: `${COLORS.error}20` }]}>
                    <Ionicons name="thermometer" size={24} color={COLORS.error} />
                  </View>
                  <View style={styles.streamContent}>
                    <Text style={styles.streamTitle}>Hotspots</Text>
                    <Text style={styles.streamValue}>
                      {hotspotCount} detected
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.streamCard}>
              <LinearGradient
                colors={[`${COLORS.primary}15`, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.streamGradient}
              >
                <View style={styles.streamHeader}>
                  <View style={[styles.streamIcon, { backgroundColor: `${COLORS.primary}20` }]}>
                    <Ionicons name="pulse" size={24} color={COLORS.primary} />
                  </View>
                  <View style={styles.streamContent}>
                    <Text style={styles.streamTitle}>VPT Testing</Text>
                    <Text style={styles.streamValue}>
                      {vptTrackedCount} tracked
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Active Patients */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Active Patients</Text>
              <Text style={styles.sectionSubtitle}>Recent patient activity</Text>
            </View>
            <Pressable
              style={styles.viewAllButton}
              onPress={() => router.push('/(caregiver)/(tabs)/patients')}
            >
              <Text style={styles.viewAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </Pressable>
          </View>
          <View style={styles.patientsContainer}>
            {patients.slice(0, 3).map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onPress={() =>
                  router.push({
                    pathname: '/(caregiver)/patient-detail',
                    params: { id: patient.id },
                  })
                }
              />
            ))}
          </View>
        </View>

        {/* Recent Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recent Alerts</Text>
              <Text style={styles.sectionSubtitle}>Health notifications</Text>
            </View>
            {alerts.length > 0 && (
              <Pressable
                style={styles.viewAllButton}
                onPress={() => router.push('/(caregiver)/(tabs)/alerts')}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
              </Pressable>
            )}
          </View>
          {alerts.length > 0 ? (
            <View style={styles.alertsContainer}>
              {alerts.slice(0, 3).map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
              <Text style={styles.emptyTitle}>All Clear!</Text>
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
  header: {
    paddingTop: DESIGN_TOKENS.spacing.xl,
    paddingBottom: DESIGN_TOKENS.spacing['2xl'],
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.lg,
  },
  headerContent: {
    gap: DESIGN_TOKENS.spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.md,
    flex: 1,
  },
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: DESIGN_TOKENS.radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...DESIGN_TOKENS.typography.h2,
    color: COLORS.neutral.lightest,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  headerSubtitle: {
    ...DESIGN_TOKENS.typography.body,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    borderRadius: DESIGN_TOKENS.radius.md,
  },
  actionButtonText: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: COLORS.neutral.lightest,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.md,
    gap: DESIGN_TOKENS.spacing.md,
  },
  quickStatItem: {
    flex: 1,
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
  },
  quickStatValue: {
    ...DESIGN_TOKENS.typography.h3,
    color: COLORS.neutral.lightest,
    fontWeight: '700',
  },
  quickStatLabel: {
    ...DESIGN_TOKENS.typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  scrollContent: {
    paddingBottom: DESIGN_TOKENS.spacing['2xl'],
  },
  section: {
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
    paddingTop: DESIGN_TOKENS.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DESIGN_TOKENS.spacing.base,
  },
  sectionTitle: {
    ...DESIGN_TOKENS.typography.h3,
    color: COLORS.neutral.dark,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  sectionSubtitle: {
    ...DESIGN_TOKENS.typography.small,
    color: COLORS.neutral.medium,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: COLORS.primary,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DESIGN_TOKENS.spacing.md,
  },
  streamsContainer: {
    gap: DESIGN_TOKENS.spacing.md,
  },
  streamCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    overflow: 'hidden',
    ...DESIGN_TOKENS.shadows.md,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
  },
  streamGradient: {
    padding: DESIGN_TOKENS.spacing.base,
  },
  streamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.md,
  },
  streamIcon: {
    width: 48,
    height: 48,
    borderRadius: DESIGN_TOKENS.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streamContent: {
    flex: 1,
  },
  streamTitle: {
    ...DESIGN_TOKENS.typography.bodyBold,
    color: COLORS.neutral.dark,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  streamValue: {
    ...DESIGN_TOKENS.typography.h4,
    color: COLORS.primary,
    fontWeight: '700',
  },
  patientsContainer: {
    gap: DESIGN_TOKENS.spacing.md,
  },
  alertsContainer: {
    gap: DESIGN_TOKENS.spacing.md,
  },
  emptyCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing['2xl'],
    alignItems: 'center',
    ...DESIGN_TOKENS.shadows.sm,
  },
  emptyTitle: {
    ...DESIGN_TOKENS.typography.h4,
    color: COLORS.neutral.dark,
    marginTop: DESIGN_TOKENS.spacing.md,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  emptyText: {
    ...DESIGN_TOKENS.typography.body,
    color: COLORS.neutral.medium,
    textAlign: 'center',
  },
  bottomPadding: {
    height: DESIGN_TOKENS.spacing['2xl'],
  },
});
