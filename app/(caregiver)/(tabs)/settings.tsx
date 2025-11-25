import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../../components/ui/Button';
import TopHeader from '../../../components/headers/TopHeader';
import { useAuth } from '../../../context/AuthContext';
import { caregiverProfile } from '../../../lib/mock-data';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function CaregiverSettingsScreen() {
  const { currentUser, logOut } = useAuth();
  const profile = currentUser ?? caregiverProfile;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="Settings"
        subtitle="Manage your account"
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
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{profile.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{profile.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Specialization</Text>
              <Text style={styles.value}>
                {caregiverProfile.specialization ?? 'Diabetic Foot Care'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Button title="Log out" onPress={logOut} variant="danger" />
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
  infoRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface.tertiary,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginBottom: 4,
  },
  value: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});



