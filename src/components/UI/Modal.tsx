import React from 'react';
import { Modal as RNModal, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';
import Button from './Button';

interface Props {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  confirmLabel?: string;
}

const Modal: React.FC<Props> = ({
  visible,
  title,
  description,
  onClose,
  confirmLabel = 'Close',
}) => {
  return (
    <RNModal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button title={confirmLabel} onPress={onClose} />
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginBottom: 12,
  },
  description: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    marginBottom: 16,
  },
});

export default Modal;

