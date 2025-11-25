import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BackHeader from '../../components/headers/BackHeader';
import MetricCard from '../../components/cards/MetricCard';
import PressureHeatmap from '../../components/threed/PressureHeatmap';
import { useCaregiverData } from '../../hooks/useCaregiver';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { patients } = useCaregiverData();
  const patient = patients.find((p) => p.id === id) ?? patients[0];

  return (
    <ScrollView style={styles.container}>
      <BackHeader title={patient.name} onBack={() => router.back()} />
      <View style={styles.row}>
        <MetricCard title="Max pressure" value={patient.maxPressure} unit="kPa" />
        <MetricCard title="Avg pressure" value={patient.avgPressure} unit="kPa" color={COLORS.accent} />
      </View>
      <Text style={styles.sectionTitle}>Latest zones</Text>
      <PressureHeatmap
        zones={[
          { label: 'Heel', value: 72 },
          { label: 'Midfoot', value: 44 },
          { label: 'Forefoot', value: 58 },
          { label: 'Toe box', value: 38 },
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
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 12,
  },
});



