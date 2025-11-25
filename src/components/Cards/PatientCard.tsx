import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PatientSummary } from '../../types/user';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface Props {
  patient: PatientSummary;
  onPress?: () => void;
}

const PatientCard: React.FC<Props> = ({ patient }) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{patient.name}</Text>
      <Text style={styles.meta}>{patient.location}</Text>
      <Text style={styles.meta}>Max Pressure: {patient.maxPressure} kPa</Text>
    </View>
    <View style={styles.status}>
      <Ionicons name="pulse" color={COLORS.primary} size={20} />
      <Text style={styles.statusText}>{patient.riskLevel} risk</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    marginBottom: 12,
  },
  name: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
  },
  meta: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  status: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusText: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    marginTop: 4,
    textTransform: 'capitalize',
  },
});

export default PatientCard;

