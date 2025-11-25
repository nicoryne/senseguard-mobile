import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface Props {
  title: string;
  onBack: () => void;
}

const BackHeader: React.FC<Props> = ({ title, onBack }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} style={styles.button}>
      <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
  },
});

export default BackHeader;

