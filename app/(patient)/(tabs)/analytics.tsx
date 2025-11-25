import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ActivityChart from '../../../components/charts/ActivityChart';
import GaitQualityChart from '../../../components/charts/GaitQualityChart';
import GaitVisualization from '../../../components/threed/GaitVisualization';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function AnalyticsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gait analytics</Text>
      <Text style={styles.subtitle}>Live symmetry & stability</Text>
      <GaitVisualization symmetry={86} stability={79} />
      <Text style={styles.sectionTitle}>Weekly quality trend</Text>
      <GaitQualityChart />
      <Text style={styles.sectionTitle}>Activity adherence</Text>
      <ActivityChart />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    marginBottom: 16,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginVertical: 16,
  },
});



