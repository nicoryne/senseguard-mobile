import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon = 'stats-chart',
  color = COLORS.primary,
}) => (
  <View style={[styles.card, { borderColor: color }]}>
    <View style={styles.header}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={styles.title}>{title}</Text>
    </View>
    <Text style={styles.value}>
      {value}
      {unit ? <Text style={styles.unit}> {unit}</Text> : null}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    fontWeight: '600',
  },
  value: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    fontWeight: '700',
  },
  unit: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
});

export default MetricCard;



