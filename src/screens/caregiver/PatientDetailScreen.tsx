import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import MetricCard from '../../components/Cards/MetricCard';
import PressureHeatmap from '../../components/ThreeD/PressureHeatmap';
import TopHeader from '../../components/Headers/TopHeader';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const PatientDetailScreen = ({ route, navigation }: any) => {
  const { patient } = route.params;

  return (
    <ScrollView style={styles.container}>
      <TopHeader
        title={patient.name}
        subtitle={`Status: ${patient.status}`}
        actionLabel="Close"
        onActionPress={() => navigation.goBack()}
      />
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
};

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

export default PatientDetailScreen;

