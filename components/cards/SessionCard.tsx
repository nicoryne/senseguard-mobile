import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { RehabSession } from '../../types/sensor';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

interface Props {
  session: RehabSession;
  onPress?: () => void;
}

const SessionCard: React.FC<Props> = ({ session, onPress }) => {
  const statusColor = session.completed ? COLORS.success : COLORS.warning;
  const statusBg = session.completed
    ? 'rgba(16, 185, 129, 0.1)'
    : 'rgba(245, 158, 11, 0.1)';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        session.completed && styles.cardCompleted,
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, { backgroundColor: statusBg }]}>
            <Ionicons
              name={session.completed ? 'checkmark-circle' : 'play-circle'}
              size={24}
              color={statusColor}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{session.title}</Text>
            <Text style={styles.subtitle}>{session.focusArea}</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={16} color={COLORS.neutral.medium} />
            <Text style={styles.duration}>{session.duration} min</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.status, { color: statusColor }]}>
              {session.completed ? 'Completed' : 'Upcoming'}
            </Text>
          </View>
        </View>
      </View>
      {!session.completed && (
        <View style={styles.actionButton}>
          <Ionicons name="play" size={20} color={COLORS.neutral.lightest} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: DESIGN_TOKENS.radius.xl,
    padding: DESIGN_TOKENS.spacing.base,
    marginBottom: DESIGN_TOKENS.spacing.md,
    ...DESIGN_TOKENS.shadows.md,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardCompleted: {
    opacity: 0.9,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.md,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: DESIGN_TOKENS.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...DESIGN_TOKENS.typography.bodyBold,
    color: COLORS.neutral.dark,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  subtitle: {
    ...DESIGN_TOKENS.typography.small,
    color: COLORS.neutral.medium,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: DESIGN_TOKENS.spacing.sm,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
  },
  duration: {
    ...DESIGN_TOKENS.typography.bodyBold,
    color: COLORS.neutral.dark,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
    paddingHorizontal: DESIGN_TOKENS.spacing.sm,
    paddingVertical: DESIGN_TOKENS.spacing.xs,
    borderRadius: DESIGN_TOKENS.radius.md,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  status: {
    ...DESIGN_TOKENS.typography.captionBold,
  },
  actionButton: {
    marginTop: DESIGN_TOKENS.spacing.md,
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...DESIGN_TOKENS.shadows.sm,
  },
});

export default SessionCard;



