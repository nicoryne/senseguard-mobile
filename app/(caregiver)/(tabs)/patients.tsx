import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import PatientCard from '../../../components/cards/PatientCard';
import { useCaregiverData } from '../../../hooks/useCaregiver';
import { COLORS } from '../../../lib/colors';
import { FONTS } from '../../../lib/fonts';

export default function PatientListScreen() {
  const router = useRouter();
  const { patients } = useCaregiverData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Patients</Text>
      {patients.map((patient) => (
        <TouchableOpacity
          key={patient.id}
          onPress={() => router.push({ pathname: '/(caregiver)/patient-detail', params: { id: patient.id } })}
        >
          <PatientCard patient={patient} />
        </TouchableOpacity>
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
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    marginBottom: 16,
  },
});



