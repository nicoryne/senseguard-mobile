import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RehabSession } from '../../types/sensor';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface Props {
  session: RehabSession;
}

const SessionCard: React.FC<Props> = ({ session }) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.subtitle}>{session.focusArea}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={styles.duration}>{session.duration} min</Text>
      <Text
        style={[
          styles.status,
          { color: session.completed ? COLORS.success : COLORS.warning },
        ]}
      >
        {session.completed ? 'Completed' : 'Upcoming'}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: COLORS.surface.secondary,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
    marginBottom: 4,
  },
  subtitle: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  duration: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
  },
  status: {
    ...FONTS.bodySmall,
  },
});

export default SessionCard;

