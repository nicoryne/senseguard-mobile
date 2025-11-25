import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import { caregiverProfile } from '../../data/mockData';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const CaregiverSettingsScreen = () => {
  const { currentUser, logOut } = useAuth();
  const profile = currentUser ?? caregiverProfile;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{profile.name}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{profile.email}</Text>
        <Text style={styles.label}>Specialization</Text>
        <Text style={styles.value}>
          {caregiverProfile.specialization ?? 'Diabetic Foot Care'}
        </Text>
      </View>
      <Button title="Log out" onPress={logOut} />
    </ScrollView>
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.surface.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 8,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  value: {
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
});

export default CaregiverSettingsScreen;

