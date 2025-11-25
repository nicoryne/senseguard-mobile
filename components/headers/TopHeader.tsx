import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface Props {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  showLogo?: boolean;
}

const TopHeader: React.FC<Props> = ({
  title,
  subtitle,
  actionLabel,
  onActionPress,
  showLogo = false,
}) => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      {showLogo && (
        <View style={styles.logoContainer}>
          <Logo size={40} />
        </View>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
    {actionLabel && onActionPress ? (
      <Button title={actionLabel} onPress={onActionPress} variant="outline" />
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
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logoContainer: {
    marginRight: 4,
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



