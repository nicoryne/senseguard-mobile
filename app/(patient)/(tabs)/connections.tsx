import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ConnectionForm from '../../../components/forms/ConnectionForm';
import TopHeader from '../../../components/headers/TopHeader';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function ConnectionsScreen() {
  const { requests } = useCaregiverData();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="Caregiver Connections"
        subtitle="Manage your care team"
        showLogo={true}
        backgroundType="light"
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.card}>
            {requests.map((request) => (
              <View key={request.id} style={styles.requestRow}>
                <View>
                  <Text style={styles.name}>{request.caregiverName}</Text>
                  <Text style={styles.meta}>
                    Status: {request.status.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.meta}>{request.patientName}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invite Caregiver</Text>
          <ConnectionForm onSubmit={() => {}} />
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
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
  },
  meta: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginTop: 4,
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



