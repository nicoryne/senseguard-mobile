import { ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

import AlertCard from '../../../components/cards/AlertCard';
import PatientCard from '../../../components/cards/PatientCard';
import TopHeader from '../../../components/headers/TopHeader';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function CaregiverDashboardScreen() {
  const router = useRouter();
  const { patients, alerts } = useCaregiverData();

  return (
    <ScrollView style={styles.container}>
      <TopHeader
        title="Caregiver hub"
        subtitle="Overview of patient insights"
        actionLabel="Patients"
        onActionPress={() => router.push('/(caregiver)/(tabs)/patients')}
      />
      <Text style={styles.sectionTitle}>Active patients</Text>
      {patients.slice(0, 2).map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
      <Text style={styles.sectionTitle}>Alerts</Text>
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 12,
    marginTop: 16,
  },
});



