import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import PressureHeatmap from '../../components/ThreeD/PressureHeatmap';
import PressureDistributionChart from '../../components/Charts/PressureDistributionChart';
import MetricCard from '../../components/Cards/MetricCard';
import BackHeader from '../../components/Headers/BackHeader';
import { usePressureData } from '../../hooks/usePressureData';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const PressureDetailsScreen = ({ navigation }: any) => {
  const { latest } = usePressureData();

  return (
    <ScrollView style={styles.container}>
      <BackHeader title="Pressure details" onBack={() => navigation.goBack()} />
      <View style={styles.cardRow}>
        <MetricCard title="Max pressure" value={latest?.summary.max ?? 0} unit="kPa" />
        <MetricCard title="Avg pressure" value={latest?.summary.avg ?? 0} unit="kPa" color={COLORS.accent} />
      </View>
      <Text style={styles.sectionTitle}>Distribution</Text>
      <PressureDistributionChart />
      <Text style={styles.sectionTitle}>Foot zones</Text>
      <PressureHeatmap
        zones={[
          { label: 'Heel', value: 68 },
          { label: 'Midfoot', value: 42 },
          { label: 'Forefoot', value: 54 },
          { label: 'Toe box', value: 31 },
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginTop: 24,
    marginBottom: 12,
  },
});

export default PressureDetailsScreen;

