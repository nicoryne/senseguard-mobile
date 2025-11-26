import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { PatientSummary } from '../../types/user';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

interface Props {
  patient: PatientSummary;
  rightAccessory?: React.ReactNode;
  onPress?: () => void;
}

const PatientCard: React.FC<Props> = ({ patient, rightAccessory, onPress }) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return COLORS.error;
      case 'medium':
        return COLORS.warning;
      default:
        return COLORS.success;
    }
  };

  const riskColor = getRiskColor(patient.riskLevel);
  const riskBg = `${riskColor}15`;

  const CardContent = (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={[styles.avatarContainer, { backgroundColor: riskBg }]}>
          <Ionicons name="person" size={24} color={riskColor} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{patient.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="location" size={14} color={COLORS.neutral.medium} />
            <Text style={styles.meta}>{patient.location}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="speedometer" size={14} color={COLORS.neutral.medium} />
            <Text style={styles.meta}>Max: {patient.maxPressure} kPa</Text>
          </View>
        </View>
      </View>
      {rightAccessory ?? (
        <View style={styles.rightSection}>
          <View style={[styles.riskBadge, { backgroundColor: riskBg }]}>
            <View style={[styles.riskDot, { backgroundColor: riskColor }]} />
            <Text style={[styles.riskText, { color: riskColor }]}>
              {patient.riskLevel} Risk
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.neutral.medium}
            style={styles.chevron}
          />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.base,
    marginBottom: DESIGN_TOKENS.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    ...DESIGN_TOKENS.shadows.md,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.md,
    flex: 1,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: DESIGN_TOKENS.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    gap: DESIGN_TOKENS.spacing.xs,
  },
  name: {
    ...DESIGN_TOKENS.typography.h4,
    color: COLORS.neutral.dark,
    fontWeight: '700',
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
  },
  meta: {
    ...DESIGN_TOKENS.typography.small,
    color: COLORS.neutral.medium,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: DESIGN_TOKENS.spacing.sm,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: DESIGN_TOKENS.radius.md,
  },
  riskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  riskText: {
    ...DESIGN_TOKENS.typography.captionBold,
    textTransform: 'capitalize',
  },
  chevron: {
    marginTop: DESIGN_TOKENS.spacing.xs,
  },
});

export default PatientCard;



