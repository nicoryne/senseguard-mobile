import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import PatientCard from '../../components/Cards/PatientCard';
import AlertCard from '../../components/Cards/AlertCard';
import TopHeader from '../../components/Headers/TopHeader';
import { useCaregiverData } from '../../hooks/useCaregiver';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const CaregiverDashboardScreen = ({ navigation }: any) => {
  const { patients, alerts } = useCaregiverData();

  return (
    <ScrollView style={styles.container}>
      <TopHeader
        title="Caregiver hub"
        subtitle="Overview of patient insights"
        actionLabel="Patients"
        onActionPress={() => navigation.navigate('Patients')}
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
};

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

export default CaregiverDashboardScreen;

