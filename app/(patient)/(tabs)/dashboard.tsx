import { useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import AlertCard from '../../../components/cards/AlertCard';
import MetricCard from '../../../components/cards/MetricCard';
import FootVisualization from '../../../components/3d/FootVisualization';
import GaitQualityChart from '../../../components/charts/GaitQualityChart';
import GaitAsymmetryWidget from '../../../components/widgets/GaitAsymmetryWidget';
import ThermalHotspotCard from '../../../components/widgets/ThermalHotspotCard';
import VPTTestingPanel from '../../../components/widgets/VPTTestingPanel';
import Logo from '../../../components/ui/Logo';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { usePressureData } from '../../../hooks/usePressureData';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

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
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Logo size={40} variant="transparent" />
          <View>
            <Text style={styles.greeting}>Hi Jordan</Text>
            <Text style={styles.date}>{new Date().toDateString()}</Text>
          </View>
        </View>
        <Pressable onPress={() => router.push('/(patient)/(tabs)/settings')}>
          <Text style={styles.settingsLink}>Settings</Text>
        </Pressable>
      </View>

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stream One: Gait Asymmetry Widget */}
        <View style={styles.section}>
          <GaitAsymmetryWidget
            leftFootLoad={45}
            rightFootLoad={62}
            asymmetryPercent={17}
            fallRisk="medium"
            symmetryScore={83}
          />
        </View>

        {/* Stream Two: Thermal & Hotspot Card */}
        <View style={styles.section}>
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

        {/* Pressure Visualization Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Plantar Pressure</Text>
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
                  <Text
                    style={[
                      styles.toggleText,
                      selectedFoot === foot && styles.toggleTextActive,
                    ]}
                  >
                    {foot.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <FootVisualization foot={selectedFoot} />
          <Pressable
            style={styles.detailsLink}
            onPress={() => router.push('/(patient)/pressure-details')}
          >
            <Text style={styles.linkText}>View details →</Text>
          </Pressable>
        </View>

        {/* Pressure Metrics */}
        <View style={styles.section}>
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
        </View>

        {/* Stream Three: VPT Testing Panel */}
        <View style={styles.section}>
          <VPTTestingPanel
            currentVPT={12.5}
            lastTestDate={new Date()}
            nerveHealthScore={75}
            onTestPress={() => {
              // Handle VPT test
            }}
          />
        </View>

        {/* Weekly Gait Quality Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Gait Quality</Text>
          <GaitQualityChart />
        </View>

        {/* Recent Alerts */}
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
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greeting: {
    ...FONTS.h2,
    color: COLORS.neutral.lightest,
    marginBottom: 4,
  },
  date: {
    ...FONTS.bodySmall,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  settingsLink: {
    ...FONTS.body,
    color: COLORS.neutral.lightest,
    fontWeight: '600',
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
  toggle: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.surface.secondary,
  },
  toggleItemActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.dark,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: COLORS.neutral.lightest,
  },
  detailsLink: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  linkText: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
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



