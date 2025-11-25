import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import PatientCard from '../../components/Cards/PatientCard';
import { useCaregiverData } from '../../hooks/useCaregiver';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const PatientListScreen = ({ navigation }: any) => {
  const { patients } = useCaregiverData();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Patients</Text>
      {patients.map((patient) => (
        <TouchableOpacity
          key={patient.id}
          onPress={() => navigation.navigate('PatientDetail', { patient })}
        >
          <PatientCard patient={patient} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

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

export default PatientListScreen;

