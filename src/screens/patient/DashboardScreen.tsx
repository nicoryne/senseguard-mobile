import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';

import FootVisualization from '../../components/ThreeD/FootVisualization';
import MetricCard from '../../components/Cards/MetricCard';
import GaitQualityChart from '../../components/Charts/GaitQualityChart';
import AlertCard from '../../components/Cards/AlertCard';
import { usePressureData } from '../../hooks/usePressureData';
import { useCaregiverData } from '../../hooks/useCaregiver';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const DashboardScreen = ({ navigation }: any) => {
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
    setTimeout(() => setRefreshing(false), 800);
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
        <Text style={styles.link} onPress={() => navigation.navigate('Settings')}>
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
      </View>

      <View style={[styles.section, { flexDirection: 'row', gap: 12 }]}>
        {stats.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            color={metric.color}
          />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly gait quality</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Analytics')}
          >
            See all
          </Text>
        </View>
        <GaitQualityChart />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent alerts</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Connections')}
          >
            View all
          </Text>
        </View>
        {alerts.map((alert) => (
          <AlertCard alert={alert} key={alert.id} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral.lighter },
  hero: {
    padding: 24,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  greeting: { ...FONTS.h2, color: COLORS.neutral.lightest },
  date: { ...FONTS.bodySmall, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  link: { ...FONTS.bodySmall, color: COLORS.primary },
  section: { paddingHorizontal: 24, paddingVertical: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { ...FONTS.h3, color: COLORS.neutral.dark },
  toggle: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: COLORS.surface.secondary,
    padding: 4,
    borderRadius: 14,
  },
  toggleItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    ...FONTS.caption,
    color: COLORS.neutral.medium,
  },
  toggleItemActive: {
    backgroundColor: COLORS.primary,
    color: COLORS.neutral.lightest,
  },
});

export default DashboardScreen;

