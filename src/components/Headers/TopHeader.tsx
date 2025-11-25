import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../UI/Button';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface Props {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

const TopHeader: React.FC<Props> = ({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    {actionLabel && onActionPress ? (
      <Button title={actionLabel} onPress={onActionPress} variant="ghost" />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
  },
  subtitle: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
    marginTop: 4,
  },
});

export default TopHeader;

