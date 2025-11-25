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

  ... code long



