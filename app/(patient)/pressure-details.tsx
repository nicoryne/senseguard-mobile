import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import BackHeader from '../../components/headers/BackHeader';
import MetricCard from '../../components/cards/MetricCard';
import PressureDistributionChart from '../../components/charts/PressureDistributionChart';
import PressureHeatmap from '../../components/3d/PressureHeatmap';
import { usePressureData } from '../../hooks/usePressureData';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

export default function PressureDetailsScreen() {
  const router = useRouter();
  const { latest } = usePressureData();

  return (
    <ScrollView style={styles.container}>
      <BackHeader title="Pressure details" onBack={() => router.back()} />
      <View style={styles.cardRow}>
        <MetricCard title="Max pressure" value={latest?.summary.max ?? 0} unit="kPa" />
        <MetricCard
          title="Avg pressure"
          value={latest?.summary.avg ?? 0}
          unit="kPa"
          color={COLORS.accent}
        />
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
}

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



