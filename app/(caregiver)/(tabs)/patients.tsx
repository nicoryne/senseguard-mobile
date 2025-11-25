import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import PatientCard from '../../../components/cards/PatientCard';
import TopHeader from '../../../components/headers/TopHeader';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function PatientListScreen() {
  const router = useRouter();
  const { patients } = useCaregiverData();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Non-scrollable Header */}
      <TopHeader
        title="My Patients"
        subtitle="Monitor patient health"
        showLogo={true}
        backgroundType="light"
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {patients.map((patient) => (
            <TouchableOpacity
              key={patient.id}
              onPress={() => router.push({ pathname: '/(caregiver)/patient-detail', params: { id: patient.id } })}
            >
              <PatientCard patient={patient} />
            </TouchableOpacity>
          ))}
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
  bottomPadding: {
    height: 20,
  },
});



