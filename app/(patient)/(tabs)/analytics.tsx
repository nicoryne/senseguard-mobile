import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import ActivityChart from '../../../components/charts/ActivityChart';
import GaitQualityChart from '../../../components/charts/GaitQualityChart';
import GaitVisualization from '../../../components/3d/GaitVisualization';
import GaitAsymmetryWidget from '../../../components/widgets/GaitAsymmetryWidget';
import ThermalHotspotCard from '../../../components/widgets/ThermalHotspotCard';
import MetricCard from '../../../components/cards/MetricCard';
import Logo from '../../../components/ui/Logo';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';
import { DESIGN_TOKENS } from '../../../lib/design-tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type TimeRange = '7d' | '30d' | '90d' | 'all';

export default function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const timeRanges: { key: TimeRange; label: string }[] = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
    { key: 'all', label: 'All Time' },
  ];

  const analyticsMetrics = [
    {
      title: 'Avg Symmetry',
      value: '86',
      unit: '%',
      color: 'primary' as const,
      icon: 'git-merge' as const,
      trend: 'up' as const,
      trendValue: '3%',
    },
    {
      title: 'Stability Score',
      value: '79',
      unit: '%',
      color: 'success' as const,
      icon: 'shield-checkmark' as const,
      trend: 'up' as const,
      trendValue: '5%',
    },
    {
      title: 'Steps Today',
      value: '8,432',
      unit: '',
      color: 'accent' as const,
      icon: 'footsteps' as const,
      trend: 'stable' as const,
    },
    {
      title: 'Activity Time',
      value: '2.5',
      unit: 'hrs',
      color: 'warning' as const,
      icon: 'time' as const,
      trend: 'up' as const,
      trendValue: '12%',
    },
  ];

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
                <Text style={styles.headerTitle}>Analytics</Text>
                <Text style={styles.headerSubtitle}>Deep insights & trends</Text>
              </View>
            </View>
          </View>

          {/* Time Range Selector */}
          <View style={styles.timeRangeContainer}>
            {timeRanges.map((range) => (
              <Pressable
                key={range.key}
                onPress={() => setTimeRange(range.key)}
                style={[
                  styles.timeRangeButton,
                  timeRange === range.key && styles.timeRangeButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    timeRange === range.key && styles.timeRangeTextActive,
                  ]}
                >
                  {range.label}
                </Text>
              </Pressable>
            ))}
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
              <Text style={styles.sectionTitle}>Performance Overview</Text>
              <Text style={styles.sectionSubtitle}>Key metrics at a glance</Text>
            </View>
          </View>
          <View style={styles.metricsGrid}>
            {analyticsMetrics.map((metric, idx) => (
              <MetricCard
                key={idx}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                color={metric.color}
                icon={metric.icon}
                trend={metric.trend}
                trendValue={metric.trendValue}
              />
            ))}
          </View>
        </View>

        {/* Gait Asymmetry Deep Dive */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Gait Asymmetry Analysis</Text>
              <Text style={styles.sectionSubtitle}>Left-right balance tracking</Text>
            </View>
            <Ionicons name="analytics" size={24} color={COLORS.primary} />
          </View>
          <GaitAsymmetryWidget
            leftFootLoad={45}
            rightFootLoad={62}
            asymmetryPercent={17}
            fallRisk="medium"
            symmetryScore={83}
          />
        </View>

        {/* Live Gait Visualization */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Live Gait Metrics</Text>
              <Text style={styles.sectionSubtitle}>Real-time symmetry & stability</Text>
            </View>
          </View>
          <View style={styles.visualizationCard}>
            <GaitVisualization symmetry={86} stability={79} />
          </View>
        </View>

        {/* Thermal Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Thermal Analysis</Text>
              <Text style={styles.sectionSubtitle}>Heat pattern detection</Text>
            </View>
            <Ionicons name="thermometer" size={24} color={COLORS.error} />
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
        </View>

        {/* Weekly Quality Trend */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Quality Trends</Text>
              <Text style={styles.sectionSubtitle}>Weekly gait quality progression</Text>
            </View>
            <Ionicons name="trending-up" size={24} color={COLORS.success} />
          </View>
          <View style={styles.chartCard}>
            <GaitQualityChart />
          </View>
        </View>

        {/* Activity Adherence */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Activity Adherence</Text>
              <Text style={styles.sectionSubtitle}>Rehabilitation session tracking</Text>
            </View>
            <Ionicons name="calendar" size={24} color={COLORS.accent} />
          </View>
          <View style={styles.chartCard}>
            <ActivityChart />
          </View>
        </View>

        {/* Insights Section */}
        <View style={styles.section}>
          <View style={styles.insightsCard}>
            <View style={styles.insightsHeader}>
              <Ionicons name="bulb" size={24} color={COLORS.warning} />
              <Text style={styles.insightsTitle}>AI Insights</Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.insightText}>
                Your gait symmetry has improved by 3% this week
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="information-circle" size={20} color={COLORS.primary} />
              <Text style={styles.insightText}>
                Consistent walking patterns detected - keep it up!
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Ionicons name="warning" size={20} color={COLORS.warning} />
              <Text style={styles.insightText}>
                Consider increasing rehabilitation sessions to improve stability
              </Text>
            </View>
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
    paddingBottom: DESIGN_TOKENS.spacing.xl,
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.lg,
  },
  headerContent: {
    gap: DESIGN_TOKENS.spacing.base,
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
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: 4,
    gap: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: DESIGN_TOKENS.spacing.sm,
    paddingHorizontal: DESIGN_TOKENS.spacing.md,
    borderRadius: DESIGN_TOKENS.radius.md,
    alignItems: 'center',
  },
  timeRangeButtonActive: {
    backgroundColor: COLORS.neutral.lightest,
  },
  timeRangeText: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  timeRangeTextActive: {
    color: COLORS.primary,
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DESIGN_TOKENS.spacing.md,
  },
  visualizationCard: {
    borderRadius: DESIGN_TOKENS.radius['2xl'],
    backgroundColor: COLORS.surface.background,
    padding: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.md,
    overflow: 'hidden',
  },
  chartCard: {
    borderRadius: DESIGN_TOKENS.radius.xl,
    backgroundColor: COLORS.surface.background,
    padding: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.md,
  },
  insightsCard: {
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.md,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.sm,
    marginBottom: DESIGN_TOKENS.spacing.base,
  },
  insightsTitle: {
    ...DESIGN_TOKENS.typography.h4,
    color: COLORS.neutral.dark,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: DESIGN_TOKENS.spacing.sm,
    marginBottom: DESIGN_TOKENS.spacing.md,
  },
  insightText: {
    ...DESIGN_TOKENS.typography.body,
    color: COLORS.neutral.dark,
    flex: 1,
    lineHeight: 22,
  },
  bottomPadding: {
    height: DESIGN_TOKENS.spacing['2xl'],
  },
});
