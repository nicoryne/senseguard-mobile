import { useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import AlertCard from '../../../components/cards/AlertCard';
import MetricCard from '../../../components/cards/MetricCard';
import FootVisualization from '../../../components/3d/FootVisualization';
import GaitQualityChart from '../../../components/charts/GaitQualityChart';
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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.hero}>
        <View>
          <Text style={styles.greeting}>Hi Jordan</Text>
          <Text style={styles.date}>{new Date().toDateString()}</Text>
        </View>
        <Text style={styles.link} onPress={() => router.push('/(patient)/(tabs)/settings')}>
          Settings
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Plantar pressure</Text>
          <View style={styles.toggle}>
            {(['left', 'right'] as const).map((foot) => (
              <Text
                key={foot}
                onPress={() => setSelectedFoot(foot)}
                style={[
                  styles.toggleItem,
                  selectedFoot === foot && styles.toggleItemActive,
                ]}
              >
                {foot.toUpperCase()}
              </Text>
            ))}
          </View>
        </View>
        <FootVisualization foot={selectedFoot} />
        <Text
          style={[styles.link, { marginTop: 12 }]}
          onPress={() => router.push('/(patient)/pressure-details')}
        >
          View details
        </Text>
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
  );
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
  link: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
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
});



