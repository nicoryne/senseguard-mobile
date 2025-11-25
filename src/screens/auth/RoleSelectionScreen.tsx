import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const RoleSelectionScreen = ({ navigation }: any) => {
  const { selectRole } = useAuth();

  const handleSelect = (role: 'patient' | 'caregiver') => {
    selectRole(role);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose your role</Text>
      <View style={styles.cardGrid}>
        <TouchableOpacity style={styles.card} onPress={() => handleSelect('patient')}>
          <Ionicons name="walk" size={32} color={COLORS.primary} />
          <Text style={styles.cardTitle}>Patient</Text>
          <Text style={styles.cardBody}>
            Monitor plantar pressure, follow rehab plans, and stay on top of alerts.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => handleSelect('caregiver')}>
          <Ionicons name="medkit" size={32} color={COLORS.accent} />
          <Text style={styles.cardTitle}>Caregiver</Text>
          <Text style={styles.cardBody}>
            Track your patients, review reports, and respond to risk alerts.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.neutral.dark,
    marginBottom: 24,
  },
  cardGrid: {
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
  },
  cardTitle: {
    ...FONTS.h3,
    color: COLORS.neutral.dark,
    marginTop: 12,
    marginBottom: 8,
  },
  cardBody: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
  },
});

export default RoleSelectionScreen;

