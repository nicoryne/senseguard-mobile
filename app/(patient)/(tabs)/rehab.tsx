import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import SessionCard from '../../../components/cards/SessionCard';
import RehabSessionForm from '../../../components/forms/RehabSessionForm';
import VPTTestingPanel from '../../../components/widgets/VPTTestingPanel';
import RehabVibrationControl from '../../../components/widgets/RehabVibrationControl';
import MetricCard from '../../../components/cards/MetricCard';
import Logo from '../../../components/ui/Logo';
import { mockRehabSessions } from '../../../lib/mock-data';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';
import { DESIGN_TOKENS } from '../../../lib/design-tokens';
import { RehabSession } from '../../../types/sensor';

export default function RehabilitationScreen() {
  const [sessions, setSessions] = useState<RehabSession[]>(mockRehabSessions);
  const [vibrationActive, setVibrationActive] = useState(false);
  const [vibrationIntensity, setVibrationIntensity] = useState(50);
  const [vibrationFrequency, setVibrationFrequency] = useState(50);

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
    ]);
  };

  const handleVPTTest = () => {
    console.log('VPT test initiated');
  };

  const handleStartSession = () => {
    setVibrationActive(!vibrationActive);
  };

  const completedSessions = sessions.filter((s) => s.completed).length;
  const totalSessions = sessions.length;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
  const totalMinutes = sessions.reduce((sum, s) => sum + (s.completed ? s.duration : 0), 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={DESIGN_TOKENS.colors.accent.gradient}
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
                <Text style={styles.headerTitle}>Rehabilitation</Text>
                <Text style={styles.headerSubtitle}>Nerve health & recovery</Text>
              </View>
            </View>
          </View>

          {/* Progress Overview */}
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>{completionRate}%</Text>
              <Text style={styles.progressLabel}>Completion</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>{totalMinutes}</Text>
              <Text style={styles.progressLabel}>Minutes</Text>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressItem}>
              <Text style={styles.progressValue}>{completedSessions}</Text>
              <Text style={styles.progressLabel}>Completed</Text>
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
        {/* VPT Testing Panel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Nerve Health Testing</Text>
              <Text style={styles.sectionSubtitle}>Vibration Perception Threshold</Text>
            </View>
            <Ionicons name="pulse" size={24} color={COLORS.primary} />
          </View>
          <VPTTestingPanel
            currentVPT={12.5}
            lastTestDate={new Date()}
            nerveHealthScore={75}
            onTestPress={handleVPTTest}
          />
        </View>

        {/* Rehabilitative Vibration Control */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Active Rehabilitation</Text>
              <Text style={styles.sectionSubtitle}>Personalized microvibration therapy</Text>
            </View>
            {vibrationActive && (
              <View style={styles.activeIndicator}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>Active</Text>
              </View>
            )}
          </View>
          <RehabVibrationControl
            intensity={vibrationIntensity}
            frequency={vibrationFrequency}
            onIntensityChange={setVibrationIntensity}
            onFrequencyChange={setVibrationFrequency}
            onStartSession={handleStartSession}
            isActive={vibrationActive}
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <MetricCard
              title="This Week"
              value={String(completedSessions)}
              unit="sessions"
              color="success"
              icon="calendar"
              trend="up"
              trendValue="+2"
            />
            <MetricCard
              title="Total Time"
              value={String(totalMinutes)}
              unit="min"
              color="primary"
              icon="time"
            />
          </View>
        </View>

        {/* Rehabilitation Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Rehabilitation Plan</Text>
              <Text style={styles.sectionSubtitle}>
                Guided exercises curated by your care team
              </Text>
            </View>
            <Pressable style={styles.filterButton}>
              <Ionicons name="options" size={20} color={COLORS.primary} />
            </Pressable>
          </View>
          <View style={styles.sessionsContainer}>
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onPress={() => {
                  // Handle session start
                }}
              />
            ))}
          </View>
        </View>

        {/* Add Quick Session */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Quick Session</Text>
              <Text style={styles.sectionSubtitle}>Add a custom rehabilitation session</Text>
            </View>
            <Ionicons name="add-circle" size={24} color={COLORS.accent} />
          </View>
          <View style={styles.formCard}>
            <RehabSessionForm onSchedule={addSession} />
          </View>
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
  progressContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.md,
    gap: DESIGN_TOKENS.spacing.md,
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressValue: {
    ...DESIGN_TOKENS.typography.h3,
    color: COLORS.neutral.lightest,
    fontWeight: '700',
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  progressLabel: {
    ...DESIGN_TOKENS.typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressDivider: {
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
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
    backgroundColor: `${COLORS.success}15`,
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: DESIGN_TOKENS.radius.md,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  activeText: {
    ...DESIGN_TOKENS.typography.captionBold,
    color: COLORS.success,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: DESIGN_TOKENS.spacing.md,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: DESIGN_TOKENS.radius.md,
    backgroundColor: COLORS.surface.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionsContainer: {
    gap: DESIGN_TOKENS.spacing.md,
  },
  formCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.md,
  },
  bottomPadding: {
    height: DESIGN_TOKENS.spacing['2xl'],
  },
});
