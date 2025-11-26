import { useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import AlertCard from '../../../components/cards/AlertCard';
import MetricCard from '../../../components/cards/MetricCard';
import FootVisualization from '../../../components/3d/FootVisualization';
import GaitQualityChart from '../../../components/charts/GaitQualityChart';
import GaitAsymmetryWidget from '../../../components/widgets/GaitAsymmetryWidget';
import ThermalHotspotCard from '../../../components/widgets/ThermalHotspotCard';
import VPTTestingPanel from '../../../components/widgets/VPTTestingPanel';
import FadeInView from '../../../components/animations/FadeInView';
import Logo from '../../../components/ui/Logo';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { usePressureData } from '../../../hooks/usePressureData';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';
import { DESIGN_TOKENS } from '../../../lib/design-tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { latest } = usePressureData();
  const { alerts } = useCaregiverData();
  const [selectedFoot, setSelectedFoot] = useState<'left' | 'right'>('left');
  const [refreshing, setRefreshing] = useState(false);

  const stats = useMemo(
    () => [
      {
        title: 'Max Pressure',
        value: latest?.summary.max ?? 0,
        unit: 'kPa',
        color: 'primary' as const,
        icon: 'speedometer' as const,
        trend: 'stable' as const,
      },
      {
        title: 'Avg Pressure',
        value: latest?.summary.avg ?? 0,
        unit: 'kPa',
        color: 'accent' as const,
        icon: 'bar-chart' as const,
        trend: 'down' as const,
        trendValue: '2%',
      },
    ],
    [latest]
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Modern Hero Header with Gradient */}
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
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>{getGreeting()}, Jordan</Text>
                <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => router.push('/(patient)/(tabs)/settings')}
              style={styles.settingsButton}
            >
              <Ionicons name="settings-outline" size={24} color={COLORS.neutral.lightest} />
            </Pressable>
          </View>

          {/* Quick Stats in Header */}
          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>87%</Text>
              <Text style={styles.quickStatLabel}>Health Score</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>12</Text>
              <Text style={styles.quickStatLabel}>Days Active</Text>
            </View>
            <View style={styles.quickStatDivider} />
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatValue}>3</Text>
              <Text style={styles.quickStatLabel}>Alerts</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Stream One: Gait Asymmetry Widget - Enhanced */}
        <FadeInView direction="up" delay={100} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Gait Analysis</Text>
              <Text style={styles.sectionSubtitle}>Real-time walking pattern monitoring</Text>
            </View>
            <Pressable
              style={styles.viewAllButton}
              onPress={() => router.push('/(patient)/(tabs)/analytics')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </Pressable>
          </View>
          <GaitAsymmetryWidget
            leftFootLoad={45}
            rightFootLoad={62}
            asymmetryPercent={17}
            fallRisk="medium"
            symmetryScore={83}
          />
        </FadeInView>

        {/* Stream Two: Thermal & Hotspot Card - Enhanced */}
        <FadeInView direction="up" delay={200} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Thermal Monitoring</Text>
              <Text style={styles.sectionSubtitle}>Heat and pressure detection</Text>
            </View>
          </View>
          <ThermalHotspotCard
            leftFootTemp={32.5}
            rightFootTemp={33.2}
            baselineTemp={32.5}
            hotspots={[
              {
                location: 'Ball of foot',
                temperature: 34.8,
                baseline: 32.5,
                severity: 'high',
              },
            ]}
          />
        </FadeInView>

        {/* Pressure Visualization Section - Enhanced */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Plantar Pressure</Text>
              <Text style={styles.sectionSubtitle}>3D pressure distribution</Text>
            </View>
            <View style={styles.toggle}>
              {(['left', 'right'] as const).map((foot) => (
                <Pressable
                  key={foot}
                  onPress={() => setSelectedFoot(foot)}
                  style={[
                    styles.toggleItem,
                    selectedFoot === foot && styles.toggleItemActive,
                  ]}
                >
                  <Ionicons
                    name={foot === 'left' ? 'footsteps-outline' : 'footsteps'}
                    size={16}
                    color={selectedFoot === foot ? COLORS.neutral.lightest : COLORS.neutral.medium}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      selectedFoot === foot && styles.toggleTextActive,
                    ]}
                  >
                    {foot.charAt(0).toUpperCase() + foot.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          
          <View style={styles.visualizationContainer}>
            <FootVisualization foot={selectedFoot} />
          </View>
          
          <Pressable
            style={styles.detailsLink}
            onPress={() => router.push('/(patient)/pressure-details')}
          >
            <Text style={styles.linkText}>View detailed analysis</Text>
            <Ionicons name="arrow-forward-circle" size={20} color={COLORS.primary} />
          </Pressable>
        </View>

        {/* Pressure Metrics - Enhanced Grid */}
        <FadeInView direction="up" delay={400} style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <MetricCard
                key={idx}
                title={stat.title}
                value={String(stat.value)}
                unit={stat.unit}
                color={stat.color}
                icon={stat.icon}
                trend={stat.trend}
                trendValue={stat.trendValue}
              />
            ))}
          </View>
        </FadeInView>

        {/* Stream Three: VPT Testing Panel - Enhanced */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Nerve Health</Text>
              <Text style={styles.sectionSubtitle}>Vibration Perception Threshold testing</Text>
            </View>
          </View>
          <VPTTestingPanel
            currentVPT={12.5}
            lastTestDate={new Date()}
            nerveHealthScore={75}
            onTestPress={() => {
              // Handle VPT test
            }}
          />
        </View>

        {/* Weekly Gait Quality Chart - Enhanced */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Weekly Trends</Text>
              <Text style={styles.sectionSubtitle}>7-day gait quality overview</Text>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <GaitQualityChart />
          </View>
        </View>

        {/* Recent Alerts - Enhanced */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recent Alerts</Text>
              <Text style={styles.sectionSubtitle}>Health notifications</Text>
            </View>
            {alerts.length > 0 && (
              <Pressable
                style={styles.viewAllButton}
                onPress={() => router.push('/(patient)/(tabs)/connections')}
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
              <Text style={styles.emptyText}>
                No critical alerts in the last 24 hours
              </Text>
            </View>
          )}
        </View>

        {/* Bottom padding for tab bar */}
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
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    ...DESIGN_TOKENS.typography.h2,
    color: COLORS.neutral.lightest,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  date: {
    ...DESIGN_TOKENS.typography.body,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: DESIGN_TOKENS.radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  quickStatValue: {
    ...DESIGN_TOKENS.typography.h3,
    color: COLORS.neutral.lightest,
    fontWeight: '700',
    marginBottom: DESIGN_TOKENS.spacing.xs,
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
  toggle: {
    flexDirection: 'row',
    gap: DESIGN_TOKENS.spacing.sm,
    backgroundColor: COLORS.surface.secondary,
    padding: 4,
    borderRadius: DESIGN_TOKENS.radius.md,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    borderRadius: DESIGN_TOKENS.radius.sm,
    backgroundColor: 'transparent',
  },
  toggleItemActive: {
    backgroundColor: COLORS.primary,
    ...DESIGN_TOKENS.shadows.sm,
  },
  toggleText: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: COLORS.neutral.medium,
  },
  toggleTextActive: {
    color: COLORS.neutral.lightest,
  },
  visualizationContainer: {
    borderRadius: DESIGN_TOKENS.radius['2xl'],
    overflow: 'hidden',
    backgroundColor: COLORS.surface.background,
    ...DESIGN_TOKENS.shadows.md,
    marginBottom: DESIGN_TOKENS.spacing.md,
  },
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.sm,
    alignSelf: 'flex-start',
  },
  linkText: {
    ...DESIGN_TOKENS.typography.bodyBold,
    color: COLORS.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: DESIGN_TOKENS.spacing.md,
  },
  chartContainer: {
    borderRadius: DESIGN_TOKENS.radius.xl,
    backgroundColor: COLORS.surface.background,
    padding: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.md,
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
