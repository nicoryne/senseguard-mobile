import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AlertCard from '../../../components/cards/AlertCard';
import TopHeader from '../../../components/headers/TopHeader';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function AlertsScreen() {
  const { alerts } = useCaregiverData();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="Alerts"
        subtitle="Patient health notifications"
        showLogo={true}
        backgroundType="light"
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No alerts at this time</Text>
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



