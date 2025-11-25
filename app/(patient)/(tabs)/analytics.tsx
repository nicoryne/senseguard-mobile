import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActivityChart from '../../../components/charts/ActivityChart';
import GaitQualityChart from '../../../components/charts/GaitQualityChart';
import GaitVisualization from '../../../components/3d/GaitVisualization';
import GaitAsymmetryWidget from '../../../components/widgets/GaitAsymmetryWidget';
import ThermalHotspotCard from '../../../components/widgets/ThermalHotspotCard';
import TopHeader from '../../../components/headers/TopHeader';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="Gait Analytics"
        subtitle="Live symmetry & stability tracking"
        showLogo={true}
        backgroundType="light"
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Gait Asymmetry Deep Dive */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gait Asymmetry Analysis</Text>
          <GaitAsymmetryWidget
            leftFootLoad={45}
            rightFootLoad={62}
            asymmetryPercent={17}
            fallRisk="medium"
            symmetryScore={83}
          />
        </View>

        {/* 3D Gait Visualization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Gait Visualization</Text>
          <GaitVisualization symmetry={86} stability={79} />
        </View>

        {/* Thermal Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thermal Analysis</Text>
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
          <Text style={styles.sectionTitle}>Weekly Quality Trend</Text>
          <GaitQualityChart />
        </View>

        {/* Activity Adherence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Adherence</Text>
          <ActivityChart />
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
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 16,
  },
  bottomPadding: {
    height: 20,
  },
});



