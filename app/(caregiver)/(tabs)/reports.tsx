import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopHeader from '../../../components/headers/TopHeader';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function ReportsScreen() {
  const { reports } = useCaregiverData();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="Reports"
        subtitle="Patient health summaries"
        showLogo={true}
        backgroundType="light"
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {reports.length > 0 ? (
            reports.map((report) => (
              <View key={report.id} style={styles.card}>
                <Text style={styles.cardTitle}>{report.title}</Text>
                <Text style={styles.cardMeta}>{report.createdAt}</Text>
                <Text style={styles.cardBody}>{report.summary}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No reports available</Text>
            </View>
          )}
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
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 4,
  },
  cardMeta: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    marginBottom: 8,
  },
  cardBody: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    lineHeight: 22,
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



