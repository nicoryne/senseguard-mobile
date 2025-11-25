import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { AlertItem } from '../../types/sensor';

const severityColor = (severity: AlertItem['severity']) => {
  switch (severity) {
    case 'critical':
      return COLORS.error;
    case 'warning':
      return COLORS.warning;
    default:
      return COLORS.primary;
  }
};

interface Props {
  alert: AlertItem;
}

const AlertCard: React.FC<Props> = ({ alert }) => (
  <View style={styles.card}>
    <View style={styles.iconWrapper}>
      <Ionicons
        name="warning"
        size={20}
        color={severityColor(alert.severity)}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{alert.patientName}</Text>
      <Text style={styles.message}>{alert.message}</Text>
      <Text style={styles.time}>{alert.time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.surface.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
  message: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginVertical: 4,
  },
  time: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
  },
});

export default AlertCard;



